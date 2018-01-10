import Vue from 'vue'
import http from '@/utils/http'
Vue.http = http

/**
 * 获取Token
 */
export const saveToken = async() => {
	return await http.getTokens('/web/newToken.do',{})
}

/**
 * 获取开户行列表
 */
export const getBankList = async() => {
	return await http.get('/web/commons/getBankList.do',{})
}
/**
 * 获取短信验证码（登陆之前）
 */
export const getSMSCode = async(areaCode,phone) => {
	return await http.get('/web/commons/sendSMSphone.do',{
		areaCode:areaCode,
		phone:phone
	});
}

/**
 * 获取短信/邮箱验证码（登陆之后）
 */
export const getSMSLogin = async(areaCode,phone) => {
	return await http.get('/web/commons/sendSMSLogin.do',{
		areaCode:areaCode,
		phone:phone
	});
}

/**
 * 判断验证码是否正确
 */
export const isVerificationCode = async(type,validateCode) => {
	return await http.get('/web/commons/validatePhoneOrEmail.do',{
		type:type,
		validateCode:validateCode
	});
}


/**
 * 获取邮箱验证码
 */
export const getEmailCode = async(email) => {
	return await http.get('/web/commons/sendSMSemail.do',{
		email:email
	});
}

/**
 * 验证手机号是否注册
 */
export const verifyPhone = async(phoneNum) => {
	return await http.get('/web/commons/verificationPhoneNum.do',{
		phoneNum:phoneNum
	});
}
/**
 * 验证邮箱是否注册
 */
export const verifyEmail = async(email) => {
	return await http.get('/web/commons/verificationEmailNums.do',{
		email:email
	});
}


/**
 * 获取证件类型
 */
export const getCertType = async() => {
	return await http.get('/web/commons/getCertificatesType.do',{});
}



/**
 * 注册
 */
export const registerPhoneUser = async(type,areaCode,account,phoneCode,password,againPasswordValue) => {
	return await http.get('/web/user/registerUser.do',{
		type: type,
		areaCode:areaCode,
		login: account,
		mscode: phoneCode,
		password: password,
		configPassword: againPasswordValue
})}

/**
 * 注册
 */
export const registerEmailUser = async(type,account,phoneCode,password,againPasswordValue) => {
	return await http.get('/web/user/registerUser.do',{
		type: type,
		login: account,
		mscode: phoneCode,
		password: password,
		configPassword: againPasswordValue
})}


/**
 * 登陆
 */
export const loginUser = async(account,password) => {
	return await http.get('/web/user/loginUser.do',{
		login: account,
		password: password
})}
/**
 * 退出登陆
 */
export const loginOut = async(account,password) => {
	return await http.get('/web/user/loginUser.do',{
		login: account,
		password: password
})}


/**
 * 通过手机找回密码
 */
export const findPasswordPhone = async(mobileNums,verificationCode,newPassword,configNewPassword) => {
	return await http.get('/web/user/backPasswordByPhone.do',{
		mobileNums:mobileNums,
		verificationCode:verificationCode,
		newPassword:newPassword,
		configNewPassword:configNewPassword
	})
}
/**
 * 通过邮箱找回密码
 */
export const findPasswordEmail = async(emailName,verificationCode,newPassword,configNewPassword) => {
	return await http.get('/web/user/backPasswordByEamil.do',{
		emailName:emailName,
		verificationCode:verificationCode,
		newPassword:newPassword,
		configNewPassword:configNewPassword
	})
}

/**
 * 获取用户信息
 */
export const getUserinfo = async() => {
	return await http.get('/web/user/showUser.do',{})
}

/**
 * 绑定邮箱
 */
export const bindEmail = async(emailName,smsCode) => {
	return await http.get('/web/user/bindEmail.do',{
		emailName: emailName,
		smsCode: smsCode
	})
}
/**
 * 修改邮箱
 */
export const modifyEmail = async(emailOld,emailNew,smsCode) => {
	return await http.get('/web/user/modifyEmail.do',{
		emailOld: emailOld,
		emailNew: emailNew,
		smsCode: smsCode
	})
}

/**
 * 绑定手机
 */
export const bindPhone = async(areaCode,phone,smsCode) => {
	return await http.get('/web/user/bindPhoneNum.do',{
		areaCode:areaCode,
		phone: phone,
		smsCode: smsCode
	})
}
/**
 * 修改手机
 */
export const modifyPhone = async(oldPhone,newPhone,areaCode,newSmsCode ) => {
	return await http.get('/web/user/modifyPhone.do',{
		oldPhone: oldPhone,
		newPhone: newPhone,
		areaCode: areaCode,
		newSmsCode: newSmsCode
	})
}
/**
 * 修改登陆密码
 */
export const modifyLoginPaw = async(oldPassword,newPassword,verificationCode ) => {
	return await http.get('/web/user/updateLoginpassword.do',{
		oldPassword: oldPassword,
		newPassword: newPassword,
		verificationCode: verificationCode  
	})
}
/**
 * 修改交易密码
 */
export const modifyDealPaw= async(oldPassword,newPassword,smsCode,googleVerifyCode) => {
	return await http.get('/web/user/modifyDealCode.do',{
		oldPassword: oldPassword,
		newPassword: newPassword,
		smsCode: smsCode,  
		googleVerifyCode: googleVerifyCode,  
	})
}
/**
 * 设置交易密码
 */
export const bindDealPaw= async(dealCode,smsCode) => {
	return await http.get('/web/user/setDealCode.do',{
		dealCode: dealCode,
		smsCode: smsCode  
	})
}

/**
 * 获取谷歌信息
 */
export const getGooleInfo= async() => {
	return await http.get('/web/user/getGoogleVerifyCode.do',{})
}
/**
 * 绑定谷歌验证
 */
export const bindGoogle= async(googleVerifyCode,secret,url) => {
	return await http.get('/web/user/bindGoogleVerifyCode.do',{
		googleVerifyCode: googleVerifyCode,
		secret: secret,
		url: url
	})
}


/**
 * 查看谷歌信息
 */
export const seeGooleInfo= async() => {
	return await http.get('/web/user/getCurrentGoogleVerifyCode.do',{})
}


/**
 * 获取登陆信息
 */
export const findUserLogin= async(pageIndex,pageSize) => {
	return await http.get('/web/user/findUserLogin.do',{
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}

/**
 * 获取银行卡/地址列表
 */
export const virtualShowALL= async() => {
	return await http.get('/web/user/virtualShowALL.do',{})
}

/**
 * 获取银行卡/支付宝列表
 */
export const getPaymentInfo= async(payType) => {
	return await http.get('/web/user/getPaymentInfo.do',{
		payType:payType
	})
}

/**
 * 添加银行卡
 */
export const addBankCardAccount= async(bankName,bankCard,province,city,bankAddress,smsCode) => {
	return await http.get('/web/user/addBankCardAccount.do',{
		bankName:bankName,
		bankCard:bankCard,
		province:province,
		city:city,
		bankAddress:bankAddress,
		smsCode:smsCode  
	})
}


/**
 * 删除银行卡/支付宝/虚拟币
 */
export const deleteUserAccount= async(code) => {
	return await http.get('/web/user/deleteUserAccount.do',{
		code: code
	})
}

/**
 * 添加支付宝账号
 */
export const addAlipayAccount = async(alipayName,alipayAccountCode,smsCode) => {
	return await http.get('/web/user/addAlipayAccount.do',{
		alipayName: alipayName,
		alipayAccountCode: alipayAccountCode,
		smsCode: smsCode
	})
}
/**
 * 根据code获取虚拟币列表
 */
export const getCoinPaymentInfo = async(coinTypeCode) => {
	return await http.get('/web/user/getCoinPaymentInfo.do',{
		coinTypeCode: coinTypeCode
	})
}
/**
 * 根据code添加虚拟币地址
 */
export const addVirtualCoinAccount = async(address,coinCode,remark,smsCode,dealCode,memo) => {
	return await http.get('/web/user/addVirtualCoinAccount.do',{
		address: address,
		coinCode: coinCode,
		remark: remark,
		smsCode: smsCode,
		dealCode: dealCode,
		memo: memo,
	})
}

/**
 * 初级实名认证
 */
export const primaryTrueName = async(realName,country,idType,certificatesNum) => {
	return await http.get('/web/user/primaryTrueName.do',{
		realName: realName,
		country: country,
		idType: idType,
		certificatesNum: certificatesNum
	})
}

/**
 * 高级实名认证（上传证件照）
 */
export const seniorTrueName = async(positivePhoto,backPhoto,holdPhoto) => {
	return await http.get('/web/user/seniorTrueName.do',{
		positivePhoto: positivePhoto,
		backPhoto: backPhoto,
		holdPhoto: holdPhoto
	})
}


/**
 * 获取文章列表
 */
export const getArticleList = async(type,pageIndex,pageSize) => {
	return await http.get('/web/news/getNewsPageList.do',{
		type:type,
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}

/**
 * 获取法律/费率/关于我们/联系
 */
export const getAbountInfo = async(type) => {
	return await http.get('/web/news/friendShows.do',{
		type:type
	})
}


/**
 * 获取文章详情
 */
export const getArticleDetails = async(code) => {
	return await http.get('/web/news/newsShowById.do',{
		code:code
	})
}



/**
 * 获取默认市场币种
 */
export const getMarketDefaultInfo = async() => {
	return await http.get('/web/trade/defaultInfo.do',{})
}

/**
 * 买入
 */
export const buyCoin = async(marketCode,coinType,unitPrice,num,totalPrice) => {
	return await http.get('/web/trade/buyCoin.do',{
		marketCode: marketCode,
		coinType: coinType,
		unitPrice: unitPrice,
		num: num,
		totalPrice: totalPrice
	})
}

/**
 * 卖入
 */
export const sellCoin = async(marketCode,coinType,unitPrice,num,totalPrice) => {
	return await http.get('/web/trade/sellCoin.do',{
		marketCode: marketCode,
		coinType: coinType,
		unitPrice: unitPrice,
		num: num,
		totalPrice: totalPrice
	})
}
/**
 * 验证是否检验过交易密码
 */
export const ifCheckPassword = async() => {
	return await http.get('/web/trade/ifCheckPassword.do',{})
}
/**
 * 验证交易密码
 */
export const checkTradePassword = async(tradePassword) => {
	return await http.get('/web/trade/checkTradePassword.do',{
		tradePassword: tradePassword
	})
}


/**
 * 撤销委托
 */
export const cancelEntrust = async(entrustCode ) => {
	return await http.get('/web/trade/cancelEntrust.do',{
		entrustCode: entrustCode
	})
}

/**
 * 获取委托记录
 */
export const getEntrustList = async(pageIndex,pageSize) => {
	return await http.get('/web/historyRecord/historyEntrustList.do',{
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}

/**
 * 获取交易记录
 */
export const getTradeList = async(pageIndex,pageSize) => {
	return await http.get('/web/historyRecord/historyTradeList.do',{
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}

/**
 * 获取充值记录
 */
export const getChargeList = async(pageIndex,pageSize) => {
	return await http.get('/web/historyRecord/coinChargeList.do',{
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}
/**
 * 获取提现记录
 */
export const getWithdrawList = async(pageIndex,pageSize) => {
	return await http.get('/web/historyRecord/coinWithdrawList.do',{
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}


/**
 * 获取用户收藏钱包
 */
export const privateWalletList = async() => {
	return await http.get('/web/wallet/privateWalletList.do',{})
}

/**
 * 获取所有币种
 */
export const collectWalletList = async() => {
	return await http.get('/web/wallet/collectWalletList.do',{})
}

/**
 * 保存
 */
export const operatePrivateWallet = async(coinTypes) => {
	return await http.get('/web/wallet/operatePrivateWallet.do',{
		coinTypes: coinTypes
	})
}

/**
 * 获取充值提现记录
 */
export const chargeAndWithdrawList = async(pageIndex,pageSize) => {
	return await http.get('/web/wallet/chargeAndWithdrawList.do',{
		pageIndex: pageIndex,
		pageSize: pageSize
	})
}

/**
 * 获取虚拟币地址
 */
export const selectCoinAddressList = async(coinTypeCode) => {
	return await http.get('/web/user/selectCoinAddressList.do',{
		coinTypeCode: coinTypeCode
	})
}

/**
 * 虚拟币提现
 */
export const coinWithdraw = async(coinType,number,tradePassword,googleCode,address) => {
	return await http.get('/web/wallet/coinWithdraw.do',{
		coinType: coinType,
		number: number,
		tradePassword: tradePassword,
		googleCode: googleCode,
		address: address
	})
}

/**
 * 获取虚拟币地址
 */
export const privateCoins = async(privateCoins) => {
	return await http.get('/web/mainPage/privateCoins.do',{
		privateCoins: privateCoins
	})
}

/**
 * 获取首页3条新闻
 */
export const latelyArticleList = async() => {
	return await http.get('/web/article/latelyArticleList.do',{})
}

/**
 * 获取首页市场
 */
export const getMarkets = async() => {
	return await http.get('/web/commons/getMarkets.do',{})
}

/**
 * 开启私有API
 */
export const openingApi = async(messageCode,googleCode,password) => {
	return await http.get('/web/api/openingApi.do',{
		messageCode:messageCode,
		googleCode:googleCode,
		password:password
	})
}
/**
 * 展示私有API
 */
export const getKey = async() => {
	return await http.get('/web/api/getKey.do',{})
}
/**
 * 关闭私有API
 */
export const closeApi = async(messageCode,googleCode,password) => {
	return await http.get('/web/api/closeApi.do',{
		messageCode:messageCode,
		googleCode:googleCode,
		password:password
	})
}


/**
 * 取消提现
 */
export const cancelVirtualWithdraw = async(recordCode) => {
	return await http.get('/web/wallet/cancelVirtualWithdraw.do',{
		recordCode:recordCode
	})
}

/**
 * 获取法币
 */
export const legalCoinList = async() => {
	return await http.get('/web/wallet/legalCoinList.do',{})
}

/**
 * 获取活动列表（登陆之前）
 */
export const getActivitiesAll = async() => {
	return await http.get('/web/activity/getActivitiesAll.do',{})
}
/**
 * 获取活动列表（登陆之后）
 */
export const userActivities = async() => {
	return await http.get('/web/activity/userActivities.do',{})
}
/**
 * 获取用户奖励列表
 */
export const getUserReward = async() => {
	return await http.get('/web/activity/userReward.do',{})
}
/**
 * 领取奖励
 */
export const receiveReward = async(activityCode) => {
	return await http.get('/web/activity/receiveReward.do',{
		activityCode: activityCode
	})
}

/**
 * 删除聊天记录
 */
export const delChat = async(code) => {
	return await http.get('/web/commons/delChat.do',{
		code: code
	})
}

/**
 * 获取删除聊天权限
 */
export const getChatAdmin = async() => {
	return await http.get('/web/commons/getChatAdmin.do',{})
}
/**
 * 切换语言
 */
export const sendLanguage = async(language) => {
	return await http.get('/web/commons/language.do',{
		language: language
	})
}