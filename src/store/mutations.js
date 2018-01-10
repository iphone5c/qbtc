import {
	SAVE_TOKEN,
	SAVE_LOGINSTATUS,
	SAVE_USERINFO,
	GET_USERINFO,
	RETSET_PHONE,
	BIND_EMAIL,
	BIND_DEALPAW,
	BIND_GOOGLE,
	REALNAME_GRADE,
	SECURITY_LEVEL,
	SAVE_CURRENCYLIST,
	GET_CURRENCYLIST,
	NEWS_CODE,
	JUMP_MARKET,
	ONLINE_NUM,
	SWITCH_LANGUAGE
} from './mutation-types.js'
import {getStore,setStore,isEmpty} from '@/utils/common'
export default {
	// 存放TOKEN
	[SAVE_TOKEN](state, session) {
		state.token = session;
		setStore("session",state.token);
	},
	// 存放登陆状态
	[SAVE_LOGINSTATUS](state, status) {
		state.loginStatus = status;
		setStore("loginStatus",status);
	},
	// 存放登陆信息
	[SAVE_USERINFO](state, info) {
		// state.userInfo = {...info};
		// setStore("userinfo",info);
		state.userinfoList = info;
		setStore("userinfoList",info);
	},
	// 获取登陆信息
	[GET_USERINFO](state){
		if(!isEmpty(getStore("loginStatus"))){
			let info = getStore('userinfoList');
			state.userinfoList = JSON.parse(info);
		}
	},
    //绑定/修改 手机
	[RETSET_PHONE](state,phone) {
		var phoneValue = phone.substring(1,3)+'****'+phone.substring(8,4);
		state.userinfoList.phone = phoneValue;
		state.userinfoList.isBindPhone = true;
		setStore("userinfoList",state.userinfoList);
	},
	// 绑定/修改 邮箱
	[BIND_EMAIL](state,email) {
		state.userinfoList.email = email;
		state.userinfoList.isBindEmail = true;
		setStore("userinfoList",state.userinfoList);
	},
	// 是否绑定交易密码
	[BIND_DEALPAW](state) {
		state.userinfoList.isSetDealCode = true;
		setStore("userinfoList",state.userinfoList);
	},
	// 是否绑定谷歌验证
	[BIND_GOOGLE](state) {
		state.userinfoList.isBindGoogle = true;
		setStore("userinfoList",state.userinfoList);
	},
	// 实名认证级别
	[REALNAME_GRADE](state,grade) {
		state.userinfoList.isRealVerify = grade;
		setStore("userinfoList",state.userinfoList);
	},
	// 安全级别
	[SECURITY_LEVEL](state) {
		let counts = 0;
		let countNums = 1;
		if(state.userinfoList.isBindEmail){
			counts++;
			countNums++;
		}
		if(state.userinfoList.isBindEmail){
			counts++;
			countNums++;
		}
		if(state.userinfoList.isBindGoogle){
			counts++;
			countNums++;
		}
		if(state.userinfoList.isSetDealCode){
			countNums++;
		}
		state.userinfoList.security = counts>=3?"高":(counts==2?"中":"低");
		state.userinfoList.securityCount = countNums;
		setStore("userinfoList",state.userinfoList);
	},
	// 存放虚拟币地址
	[SAVE_CURRENCYLIST](state,info) {
		state.currencyInfo = info;
		setStore("currencyInfo",info);
	},
	// 获取虚拟币地址
	[GET_CURRENCYLIST](state) {
		let info = getStore('currencyInfo');
		state.currencyInfoList = JSON.parse(info);
	},
	// 新闻Code
	[NEWS_CODE](state,code){
		setStore("newsCode",code);
		state.newsCode = code;
	},
	// 存放市场
	[JUMP_MARKET](state,info){
		setStore("jqMarketData",info);
		if(!isEmpty(info)){
			state.jqMarketData = info;
			state.jpMarketCoin = info.split("/")[0];
			state.jpMarketName = info.split("/")[1];
			state.jpMarketCoinCode = info.split("/")[2];
			state.jpMarketNameCode = info.split("/")[3];
		}else{
			state.jqMarketData = info;
			state.jpMarketCoin = info;
			state.jpMarketName = info;
			state.jpMarketCoinCode = info;
			state.jpMarketNameCode = info;
		}
	},
	// 在线人数
	[ONLINE_NUM](state,code){
		state.onlineNum = code;
	},
	// 切换语言
	[SWITCH_LANGUAGE](state,info){
		state.language = info;
		setStore("language",info);
	},
}