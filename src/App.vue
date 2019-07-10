<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      payments: [{
        numberAccount: 111222333444555,
        totalPayment: '2000',
        numberCard: '1111,2222,3333,4444',
        monthCard: '12',
        yearCard: 2019,
        host: 'Alekseev Kirill',
        cvv: '001',
        date: 'Tue Jul 09 2019 10:00:00 GMT+0300 (Москва, стандартное время)'
      }], 
    }
  },
  mounted() {
    this.$root.$data.payments = this.payments;
  }
}
</script>

<style>
#app {
  max-width: 1024px;
}
</style>
