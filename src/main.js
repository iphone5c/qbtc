// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {getCookie} from '@/utils/cookie'
import store from './store/'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import http from '@/utils/http'
import VueI18n from 'vue-i18n'

import popup from '@/components/popup'
Vue.component('my-popup',popup)
import highstock from 'highcharts/highstock'
Vue.prototype.highstock = highstock

import 'babel-polyfill' 
Vue.prototype.http = http
Vue.use(Element)
Vue.use(VueI18n)
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false
const i18n = new VueI18n({
    locale: 'zh',  // 语言标识
    messages: {
        'zh': require('@/language/zh'),
        'en': require('@/language/en')
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
