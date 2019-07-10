<template>
	<div class="main">
		<form class="form" @submit.prevent="sendPayment">
			<section class="form__info">
					<span class="form__info__header">Информация по оплате:</span>
					<div class="form-field">
							<span class="form-field__title">Номер счета:</span>
							<input class="form-field__input" :class="{ 'error': errors.numberAccount }" v-model="numberAccount" :maxlength="25" @keypress="numberOnly($event)"/>
					</div>
					<div class="form-field">
							<span class="form-field__title">Сумма платежа:</span>
							<input class="form-field__input" :class="{ 'error': errors.totalPayment }" v-model="totalPaymentValue" @blur="isInputActive = false" @focus="isInputActive = true" @keypress="isSum($event)"/>
					</div>
			</section>
			<h2>Данные банковской карты</h2>
			<section class="form__card">
				<div class="form__card__preview">
					<div class="form-field-card">
						<span class="card-title">Номер карты</span>
						<div class="card"> 
							<input class="card__number" :class="{ 'error': errors.numberCard && errors.numberCard[0] }" v-model="numberCard[0]" @keypress="numberOnly($event)" :maxlength="4"/>
							<input class="card__number" :class="{ 'error': errors.numberCard && errors.numberCard[1] }" v-model="numberCard[1]" @keypress="numberOnly($event)" :maxlength="4"/>
							<input class="card__number" :class="{ 'error': errors.numberCard && errors.numberCard[2] }" v-model="numberCard[2]" @keypress="numberOnly($event)" :maxlength="4"/>
							<input class="card__number" :class="{ 'error': errors.numberCard && errors.numberCard[3] }" v-model="numberCard[3]" @keypress="numberOnly($event)" :maxlength="4"/>
						</div>
					</div>
					<div class="form-field-card">
						<span class="card-title">Срок действия</span>
								<div class="card"> 
									<select  class="card__number" :class="{ 'error': errors.month }"  v-model="month">
										<option value=""></option>
										<option v-for="month in months" :value="month" :key="month">{{month}}</option>
									</select>
									<select  class="card__number"  :class="{ 'error': errors.year }" v-model="year">
										<option value=""></option>
										<option v-for="year in years" :value="year" :key="year">{{year}}</option>
									</select>
							</div>
					</div>
					<div  class="form-field-card">
						<div class="card"> 
							<input class="card__holder" :class="{ 'error': errors.host }" v-model="host" @keypress="wordsOnly($event)" placeholder="Держатель карты"/>
						</div>
					</div>
				</div>
				<div class="form__card__back">
					<div class="form-field-card form-field-card__strip"></div>
					<div class="form-field-card form-field-card__code">
						<label  class="card-title">Код CVV2/CVC2</label>
						<div class="card-code">
							<span class="card-code__input-image"></span>
							<input class="card-code__input-code" :class="{ 'error': errors.cvv }" v-model="cvv" :maxlength="3" @keypress="numberOnly($event)"/>
						</div>
					</div>
				</div>
			</section>
			<button type="submit" class="button button__pay">Оплатить</button>
			<button  class="button button__history" @click="history">История платежей</button>
		</form>
	</div>
</template>
  
<script>
  export default {
		name: 'pay',
		data() {
			return {
				numberAccount: '',
				totalPayment: '',
				isInputActive: false,
				numberCard: ['','','',''],
				host: '',
				cvv: '',
				months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
				month: '',
				years: [],
				year: '',
				errors: {}
			}
		},
		computed: {
			totalPaymentValue: {
				get(value) {
					if (this.isInputActive) {
						return  this.totalPayment;
					} else {
						return  this.totalPayment ? `${String(this.totalPayment).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.` : " 0 руб.";
					}
				},
				set(value) {
					this.totalPayment = value;
				}
			},
		},
		methods: {
			validate() {
				this.errors = {};
				this.errors.numberCard = [];

				if (this.numberAccount === ''){
					this.errors.numberAccount = true;
				}
				if (this.totalPayment === '') {
					this.errors.totalPayment = true;
				}

				if (this.month === '') {
					this.errors.month = true;
				}
				if (this.year === '') {
					this.errors.year = true;
				}
				if (this.host === '' || this.host.length < 4 ) {
					this.errors.host = true;
				}
				if (this.cvv === '' || this.cvv.length !== 3) {
					this.errors.cvv = true;
				}
				
				this.numberCard.forEach((i, index) => {
					i.length < 4 ? this.errors.numberCard.push(true) : this.errors.numberCard.push(false);
				}); 

				if (!this.errors.numberCard.filter(i => i)[0]) {
					delete this.errors.numberCard;
				}
			},
			sendPayment() {
				this.validate();

				if (Object.values(this.errors).length === 0) {
					let payment = {
						numberAccount: this.numberAccount,
						totalPayment: this.totalPayment,
						numberCard: this.numberCard.join(),
						monthCard: this.month,
						yearCard: this.year,
						host: this.host,
						cvv: this.cvv,
						date: new Date()
					};

						this.$root.$data.payments.push(payment);
						this.clearForm();
						this.$router.push({ name: 'success', params: {
								numberAccount: payment.numberAccount, totalPayment: payment.totalPayment,  host: payment.host, date:payment.date
						}});
					}
				},
			getYears() {
				let currentYear = new Date().getFullYear();  
				for ( let i = currentYear; i<=currentYear+10; i++) {
						this.years.push(i);
				}
			},
			numberOnly() {
				if (event.keyCode < 48 || event.keyCode > 57) {
					event.preventDefault();
				}
			},
			wordsOnly() {
				const char = String.fromCharCode(event.keyCode);
				if (!/^[a-z-A-Z ]+$/.test(char)) {
					event.preventDefault();
				}
			},
			isSum(e) {
				if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 46  && event.keyCode !== 44) {
					event.preventDefault();
				}
			},
			clearForm() {
				this.numberAccount = '';
				this.totalPayment = '';
				this.numberCard = [];
				this.host = '';
				this.cvv = '';
				this.month = '';
				this.year = '';
				this.errors = {};
			},
			history() {
				this.$router.push({ name: 'listPayments'});
			}
		},
    created() {
			this.getYears();
    }
	}
</script>
  
<style lang="scss" scoped>
	.main {
		max-width: 1000px !important;
		margin: 0 10px;
		background-color: rgb(242, 243, 247);
		padding: 20px;

		@media only screen and (min-width : 480px) and (max-width : 730px) {
			padding: 10px;
		}

		@media only screen and (max-width : 480px) {
			padding: 5px;
		}
	}

	.form {
		padding: 10px;
		margin: 0 auto;
		width:100%;

		&__info {
			display:flex;
			flex-direction: column;
			margin:15px 0;

			&__header {
					font-size: 16px;
					margin: 10px 0;
			}
		}

		&__card {
			position: relative;
			display: flex;
			margin: 25px 0;
			width: 100%;

			&__preview {
				position: relative;
				z-index: 100;
				background-color: rgb(242, 243, 247);
				border: 1px solid rgb(153, 149, 173);
				width: 60%;
				border-radius: 5px;

				@media only screen and (max-width : 480px) {
					width: 95%;
				}
			}

			&__back {
				width: 60%;
				border: 1px solid rgb(153, 149, 173);
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
				margin: 20px 10px 0 0;
				border-radius: 5px;
				
				@media only screen and (max-width : 480px) {
					width: 95%;
					top: 75px;
				}

				@media only screen and (max-width : 359px) {
					width: 95%;
					top: 105px;
				}
			}
		}
	}

	.form-field {
		margin: 8px 0 16px;
		display: flex;	

		@media only screen and (max-width : 480px) {
			flex-direction: column;
			margin: 0 0 16px;
		}

		&__title {
			font-size: 16px;
			margin-right: 5px;
			flex: 0 1 150px;

			@media only screen and (max-width : 480px) {
				flex: 1 0 auto;
				}
		}

		&__input {
			align-self: flex-start;
			line-height: 20px;
			border: 0;
			border-radius: 0;
			border-bottom: 1px solid #C8CCD4;
			font-size: 16px;
			background: none;
			max-width: 230px;
			width: 100%;

			@media only screen and (max-width : 480px) {
				margin: 9px 0;
			}

			&:focus {
				border-bottom: 1px solid #3e85cc;
				outline: none;
				background: none;
			}
		}
	}
    
	.form-field-card {
		display: flex;
		flex-direction: column;
		padding: 10px 20px;
			
		&__strip {
			// width: 100%;
			background-color: rgb(194, 188, 188);
			height: 45px;
			margin: 35px 0 8px 0;
		}

		&__code {
			align-items: flex-end;

			@media only screen and (max-width : 480px) {
				margin-top: 20px;
			}

			@media only screen and (max-width : 350px) {
				margin-top: 40px;
			}
		}

		@media only screen and (max-width : 730px) {
			padding: 5px 10px;
		}
	}

	.card {
		display: flex;
		flex-wrap: nowrap;

		&__number {
			background-color: white;
			margin: 10px 10px 0 0;
			max-width: 80px;
			width: 100%;
			height: 40px;
			font-size: 16px;
			padding: 10px;
			text-align: center;
			border: 1px solid rgb(153, 149, 173);
			outline: none;
	
			&:focus {
				border: 1px solid #3e85cc;
				outline: none;
				background: none;
				background-color: white;
			}

			@media only screen and (min-width : 480px) and (max-width : 730px) {
				margin: 5px 5px 0 0;
				max-width: 70px;
				height: 30px;
				font-size: 13px;
				padding: 5px;
			}

			@media only screen and (max-width : 480px) {
				margin: 5px 5px 0 0;
				max-width: 80px;
				height: 30px;
				font-size: 13px;
				padding: 5px;
			}
		}

		&__holder {
			background-color: white;
			margin-right: 10px;
			width: 100%;
			max-width: 350px;
			height: 40px;
			font-size: 16px;
			padding: 10px;
			border: 1px solid rgb(153, 149, 173);

			&:focus {
				border: 1px solid #3e85cc;
				outline: none;
				background: none;
				background-color: white;
			}

			@media only screen and (min-width : 480px) and (max-width : 730px) {
				width: 85%;
				height: 30px;
				font-size: 13px;
				padding: 5px;
			}

			@media only screen and (max-width : 480px) {
				width: 90%;
				height: 30px;
				font-size: 13px;
				padding: 5px;
			}
		}

		@media only screen and (min-width : 480px) and (max-width : 730px) {
			padding: 0;
		}

		@media only screen and (max-width : 350px) {
			flex-wrap: wrap;
		}
	}

	.card-title {
		font-size: 16px;
		margin: 10px 0;
		max-width: 130px;
		width: 100%;

		@media only screen and (max-width : 730px) {
			margin: 5px 0;
			max-width: 110px;
			font-size: 14px;
		}
	}

	.card-code {
		position: relative;
		display: flex;
		align-items: center;
		max-width: 130px;
		width: 100%;

		&__input-image {
			position: absolute;
			background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1024px-Icon-round-Question_mark.svg.png);
			background-repeat:no-repeat;
			background-position:6px;
			height: 25px;
			background-size: 15px 15px;
			width: 25px;
			right: 10px;
			top: 8px;
			padding: 0 5px;

			@media only screen and (max-width : 730px) {
				top: 3px;
        right: 0px;
        	padding: 0 2px 0 0;
			}

			&:hover {
				cursor: pointer;
			}

			&:hover:after {
				content: "Три последние цифры на задней стороне платежной карты";
				display: block;
				font-size: 11px;
				line-height: 1;
				position: relative;
				top: 35px;
				left: -60px;
				width: 120px;
				background: white;

				@media only screen and (min-width : 480px) and (max-width : 730px) {
					max-width: 100px;
				}

				@media only screen and (max-width : 480px) {
					max-width: 90px;
				}
			}
		}

		&__input-code {
      background-color: white;
			max-width: 110px;
			width: 100%;
			height: 40px;
			font-size: 16px;
			text-align: center;
			border: 1px solid rgb(153, 149, 173);
			outline: none;
	
			&:focus {
				border: 1px solid #3e85cc;
				outline: none;
				background: none;
				background-color: white;
			}

			@media only screen and (min-width : 480px) and (max-width : 730px) {
				height: 30px;
				text-align: left;
				padding-left: 7px;
			}

			@media only screen and (max-width : 480px) {
				height: 30px;
			}
		}

		@media only screen and (min-width : 480px) and (max-width : 730px) {
			max-width: 70px;
		}

		@media only screen and (max-width : 480px) {
			max-width: 100px;
		}
	}

	.button {
		display: flex;
		flex: 0 0 100px;
		padding: 15px;
		border-radius: 5px;
		font-size: 16px;
		margin: 25px 0;
		color: white;
		outline: none;
		white-space: nowrap;

		&__pay {
			background-color: #3e85cc;

			@media only screen and (max-width : 480px) {
					margin-top: 110px;
			}

			@media only screen and (max-width : 360px) {
				margin-top: 140px;
			}        

			&:hover {
				background-color: rgb(50, 117, 243);
			}
		}

		&__history {
			background-color: #23b12a;
			
			&:hover {
				background-color: #0b8a11;
			}
		}

		@media only screen and (min-width : 480px) and (max-width : 730px) {
			padding: 10px;
			font-size: 14px;
			margin: 15px 0;
		}

		@media only screen and (max-width : 480px) {
			font-size: 14px;
			padding: 10px;
		}
	}

	.error {
		border: 1px solid red !important;
	}

	select:focus::-ms-value {
		background-color: white;
		color:#000;
	}
</style>