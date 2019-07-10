<template>
  <div class="main">
    <div class="header">
      <h2 class="header__title"> Платеж завершен успешно</h2>
      <span class="header__image"></span>
    </div>
    <div class="field">
      <label class="field__title">Номер счета</label> 
      <label class="field__title">{{numberAccount}}</label> 
    </div>
    <div class="field">
      <label class="field__title">Сумма платежа</label> 
      <label class="field__title">{{ total }}</label> 
    </div>
    <div class="field">
      <label class="field__title">Имя держателя карты</label> 
      <label class="field__title">{{host}}</label> 
    </div>
    <div class="field">
      <label class="field__title">Дата оплаты</label> 
      <label class="field__title"> {{datePayment}}</label> 
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'success',
    props: ['numberAccount', 'totalPayment', 'host', 'date'],
    computed: {
      datePayment() {
        return this.date.toLocaleString();
      },
     total() {
        return `${String(this.totalPayment).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.`;
      }
    }
  }
</script>
  
<style lang="scss" scoped>
  .main {
      margin: 0 10px;
      background-color: rgb(242, 243, 247);
      padding: 20px;
  }

  .field {
    margin: 25px 0 16px;
    display: flex;

    &__title {
      font-size: 16px;
      margin-right: 15px;
      flex: 0 1 250px;

      @media only screen and (max-width : 400px) {
        flex: 1 1 auto;
        margin: 5px 0;
      }
    }

    @media only screen and (max-width : 400px) {
      flex-direction: column;
    }
  }

  .header {
    display: flex;
    margin: 10px 0;
  
    &__image {
      background: url(https://cdn1.iconfinder.com/data/icons/jetflat-multimedia-vol-4/90/0042_089_check_well_ready_okey-512.png);
      background-repeat:no-repeat;
      background-position:6px 0;
      height: 30px;
      background-size: 25px 25px;
      width: 35px;
      padding: 0 10px;
      margin: 0 5px;
      align-self: center;
    }

    @media only screen and (max-width : 400px) {
      h2 {
        font-size: 17px;
      }
    }
  }
</style>