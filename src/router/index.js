import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index'
import Router from 'vue-router'
import index from '@/page/index'
import {SAVE_LOGINSTATUS,GET_USERINFO,GET_CURRENCYLIST,NEWS_CODE,JUMP_MARKET,SWITCH_LANGUAGE} from '@/store/mutation-types.js'
import {getStore,isEmpty} from '@/utils/common'
// 登录注册
import login from '@/page/login/login'
import register from '@/page/register/register'
// 忘记密码
import findPassword from '@/page/findPassword/findPassword'
import findPasswordPhone from '@/page/findPassword/findPasswordPhone'
import findPasswordEmail from '@/page/findPassword/findPasswordEmail'
// 交易中心
import tradeCenter from '@/page/trade/trade'
// 新闻中心
import news from '@/page/news/news'
import article from '@/page/news/children/article'
import notice from '@/page/news/children/notice'
import info from '@/page/news/children/info'
import coinIntroduce from '@/page/news/children/coinIntroduce'
// 法律声明
import law from '@/page/law/law'
// API
import wiki from '@/page/wiki/wiki'
// 费率
import rate from '@/page/rate/rate'
// 关于我们
import about from '@/page/about/about'
// 联系我们
import contact from '@/page/contact/contact'
// 操作指南
import help from '@/page/help/help'
// 历史记录
import historicalRecord from '@/page/historicalRecord/historicalRecord'
import recharge from '@/page/historicalRecord/children/recharge'
import withdrawals from '@/page/historicalRecord/children/withdrawals'
import trade from '@/page/historicalRecord/children/trade'
import entrust from '@/page/historicalRecord/children/entrust'
// 安全中心
import securityCenter from '@/page/securityCenter/securityCenter'
import userinfo from '@/page/securityCenter/children/userinfo'
import googlePopup from '@/components/googlePopup'
import password from '@/page/securityCenter/children/password'
import security from '@/page/securityCenter/children/security'
import address from '@/page/securityCenter/children/bankcard'
import authentication from '@/page/securityCenter/children/authentication'
import privateApi from '@/page/securityCenter/children/privateApi'
// 收款方式
import bank from '@/page/securityCenter/children/children/bank'
import zfb from '@/page/securityCenter/children/children/zfb'
import currency from '@/page/securityCenter/children/children/currency'
// 钱包
import finance from '@/page/finance/finance'
// 活动
import activity from '@/page/activity/activity'
// 主要股东
import shareholder from '@/page/shareholder/shareholder'
// 404
import error from '@/page/404/404'
Vue.use(Router)

const router = new Router({
  mode : 'history',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '*',
      component: error,
      meta: {
          title: 'QBTC-404',
      },
    },
    {
      path: '/',
        meta: {
            title: 'QBTC-首页'
          },
      component: index
    },
    {
      path: '/index',
        meta: {
            title: 'QBTC-首页'
          },
      component: index
    },
    {
      path: '/login',
        meta: {
            title: 'QBTC-登录'
          },
      component: login
    },
    {
      path: '/register',
        meta: {
            title: 'QBTC-注册',
            // requireAuth: true,
          },
      component: register
    },
    {
      path: '/findPassword',
        meta: {
            title: 'QBTC-找回密码'
          },
      component: findPassword,
    },
    {
      path: '/findPasswordPhone',
      meta: {
          title: 'QBTC-找回密码'
        },
      component: findPasswordPhone
    },
    {
      path: '/findPasswordEmail',
      meta: {
          title: 'QBTC-找回密码'
        },
      component: findPasswordEmail
    },
    {
      path: '/trade',
        meta: {
            title: 'QBTC-交易中心'
          },
      component: tradeCenter
    },
    {
      path: '/news',
        meta: {
            title: 'QBTC-新闻中心',
            surplusRoute: true
          },
      component: news,
      children: [
        {
          path: 'article_:id',
          name: 'article',
          meta: {
              title: 'QBTC-文章详情'
          },
          component: article,
        },
        {
          path: 'notice',
          meta: {
              title: 'QBTC-官方公告'
          },
          component: notice,
        },
        {
          path: 'info',
          meta: {
              title: 'QBTC-行业资讯'
          },
          component: info,
        },
        {
          path: 'coinIntroduce',
          meta: {
              title: 'QBTC-币种介绍'
          },
          component: coinIntroduce,
        },
      ]
    },
    {
      path: '/law',
      meta: {
          title: 'QBTC-法律声明'
      },
      component: law,
    },
    {
      path: '/wiki',
      meta: {
          title: 'QBTC-API'
      },
      component: wiki,
    },
    {
      path: '/rate',
      meta: {
        title: 'QBTC-费率说明'
      },
      component: rate,
    },
    {
      path: '/about',
        meta: {
            title: 'QBTC-关于我们'
          },
      component: about,
    },
    {
      path: '/contact',
        meta: {
            title: 'QBTC-联系我们'
          },
      component: contact,
    },
    {
      path: '/help',
        meta: {
            title: 'QBTC-操作指南'
          },
      component: help,
    },
    {
      path: '/historicalRecord',
        meta: {
            title: 'QBTC-历史记录',
            requireAuth: true,
            surplusRoute: true
          },
      component: historicalRecord,
      children: [
          {
            path: 'recharge',
            meta: {
                title: 'QBTC-充值记录',
                requireAuth: true
            },
            component: recharge,
          },
          {
            path: 'withdrawals',
            meta: {
                title: 'QBTC-提现记录',
                requireAuth: true
            },
            component: withdrawals,
          },
          {
            path: 'trade',
            meta: {
                title: 'QBTC-交易记录',
                requireAuth: true
            },
            component: trade,
          },
          {
            path: 'entrust',
            meta: {
                title: 'QBTC-委托记录',
                requireAuth: true
            },
            component: entrust,
          },
        ]
    },
    {
      path: '/securityCenter',
        meta: {
            title: 'QBTC-安全中心',
            requireAuth: true,
            surplusRoute: true
          },
      component: securityCenter,
      children: [
          {
            path: 'userinfo',
            meta: {
                title: 'QBTC-账户信息',
                requireAuth: true
            },
            component: userinfo,
            children: [
              {
              path: 'googlePopup',
              meta: {
                  title: 'QBTC-账户信息',
                  requireAuth: true
              },
               component: googlePopup,
             }
            ]
          },
          {
            path: 'password',
            meta: {
                title: 'QBTC-密码管理',
                requireAuth: true
            },
            component: password,
          },
          {
            path: 'security',
            meta: {
                title: 'QBTC-操作保护',
                requireAuth: true
            },
            component: security,
          },
          {
            path: 'address',
            meta: {
                title: 'QBTC-银行卡/地址',
                requireAuth: true
            },
            component: address,
            children:[
              {
                path: 'bank',
                name: 'bank',
                meta: {
                    title: 'QBTC-银行卡信息',
                    requireAuth: true
                },
                component: bank
              },
              {
                path: 'zfb',
                name: 'zfb',
                meta: {
                    title: 'QBTC-支付宝信息',
                    requireAuth: true
                },
                component: zfb
              },
              {
                path: 'currency/:id',
                name: 'coin',
                meta: {
                    title: 'QBTC-币信息',
                    requireAuth: true
                },
                component: currency
              },
            ]
          },
          {
            path: 'authentication',
            meta: {
                title: 'QBTC-实名认证',
                requireAuth: true
            },
            component: authentication,
          },
          {
            path: 'privateApi',
            meta: {
                title: 'QBTC-私人API',
                requireAuth: true
            },
            component: privateApi,
          },
        ]
    },
     {
      path: '/finance',
        meta: {
            title: 'QBTC-钱包',
            requireAuth: true
          },
      component: finance
    }, 
    {
      path: '/activity',
        meta: {
            title: 'QBTC-活动',
          },
      component: activity
    },
    {
      path: '/shareholder',
        meta: {
            title: 'QBTC-股东',
          },
      component: shareholder
    },
     {
      path: '/error',
        meta: {
            title: 'QBTC-404'
          },
      component: error
    },
  ]
})
router.beforeEach((to, from, next) => {
    if(isEmpty(store.state.currencyInfoList)){
      store.commit(GET_CURRENCYLIST, getStore("currencyInfo"));
    }
    if(isEmpty(store.state.newsCode)){
      store.commit(NEWS_CODE, getStore("newsCode"));
    }
    if(isEmpty(store.state.userinfoList) && !isEmpty(getStore("loginStatus"))){
      store.commit(GET_USERINFO, getStore("userinfo"));
    }
    if(isEmpty(store.state.jqMarketData)){
      store.commit(JUMP_MARKET, getStore("jqMarketData"));
    }
    if(isEmpty(store.state.language)){
      store.commit(SWITCH_LANGUAGE, getStore("language"));
    }
    if (to.meta.requireAuth) { 
        store.commit(SAVE_LOGINSTATUS, getStore("loginStatus"));
        if (store.state.loginStatus == "true") {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
    if(to.meta.surplusRoute){
      next({
          path: '/error'
      })
    }
})
export default router