<template>
  <div class="main">
    <h2>История платежей</h2>
    <div v-for="(item,index) in payments" :key="index" class="body">
      <div class="body__field">
        <label class="field-title">Номер счета</label> 
        <label class="field-title">{{item.numberAccount}}</label> 
      </div>
      <div class="body__field">
        <label class="field-title">Сумма платежа</label> 
        <label class="field-title">{{total(item.totalPayment)}}</label> 
      </div>
      <div class="body__field">
        <label class="field-title">Дата оплаты</label> 
        <label class="field-title"> {{datePayment(item.date)}}</label> 
      </div>
    </div> 
  </div>
</template>
  
<script>
  export default {
    name: 'listPayments',
    data() {
      return {
        payments: []
      }
    },
    methods: {
      datePayment(item) {
        return new Date(item).toLocaleString();
      },
      total(item) {
        return `${String(item).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.`;
      }
    },
    mounted() {
      this.payments =  this.$root.$data.payments;
    }
  }
</script>
  
<style lang="scss" scoped>
  .main {
      margin: 0 10px;
      background-color: rgb(242, 243, 247);
      padding: 20px;
  }

  .body {
    border: 1px solid rgb(153, 149, 173);
    border-radius: 5px;
    padding: 10px;
    margin: 15px 0;
    
    &__field {
      display: flex;

      .field-title {
        font-size: 16px;
        margin: 15px;
        flex: 0 1 150px;
        
        @media only screen and (max-width : 400px) {
          flex: 1 1 auto;
          margin: 5px 0;
        }
      }

      @media only screen and (max-width : 400px) {
        flex-direction: column;
      }
    }
  }
</style>