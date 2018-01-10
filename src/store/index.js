import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
Vue.use(Vuex)

const state = {
	token: '', // token
	loginStatus :'', // 登陆状态
	userinfo: '', // 用户信息
	userinfoList: '', // 用户信息
	currencyInfo: '', // 虚拟币地址
	currencyInfoList: '', // 虚拟币地址
	newsCode: '', // 新闻code
	jpMarketName:'', // 市场名
	jpMarketCoin:'',// 币名
	jpMarketNameCode:'',// 市场CODE
	jpMarketCoinCode:'',// 币CODE
	jqMarketData:'', // 市场数据
	onlineNum:'',// 在线人数
	language: '' ,//语言 
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})