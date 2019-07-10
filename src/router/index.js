import Vue from 'vue';
import Router from 'vue-router';
import main from '../pages/pay.vue';
import success from '../pages/success.vue';
import listPayments from '../pages/listPayments.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'main', path: '/', component: main },
    {name: 'success', path: '/success', component: success, props: (route) => ({...route.params}), 
      beforeEnter: (to, from, next) => {
        const {params} = to;
        if (Object.values(params).length === 4) {
            next();
        } 
        else {
            next('/');
        }
      }
    },
    {name: 'listPayments', path: '/listPayments', component: listPayments, 
      beforeEnter: (to, from, next) => {
        const {name} = from;
        if ( name ===  'main') {
            next();
        } 
        else {
            next('/');
        }
      }
    },
  ]
});
