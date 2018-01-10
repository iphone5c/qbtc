<template>
	<div class="userinfo" v-loading.fullscreen.lock="fullscreenLoading">
		<div class="title">
			<p>{{$t("security_page.134")}}</p>
			<div class="line"></div>
		</div>
		<div class="account">
			{{accountValue}}<br/>
			<span>UID：{{UIDCode}}</span>
		</div>
		<div class="setStatus" v-cloak>
			<div class="item" v-if="bindPhone" v-cloak>
				<img src="../../../assets/safetyCenter/phone-s.png" alt="">
				<p class="title">{{$t("security_page.135")}}</p>
				<p class="text">{{phoneValue}}</p>
			</div>
			<div class="item" v-if="!bindPhone" v-cloak>
				<img src="../../../assets/safetyCenter/phone.png" alt="">
				<p class="title">{{$t("security_page.135")}}</p>
				<p class="text">{{$t("security_page.136")}}</p>
			</div>
			<div class="item" v-if="bindRealname==1 || bindRealname==2">
				<img src="../../../assets/safetyCenter/realname.png" alt="">
				<p class="title">{{$t("security_page.137")}}</p>
				<p class="text">{{$t("security_page.138")}}</p>
			</div>
			<div class="item" v-else-if="bindRealname==3 || bindRealname==4">
				<img src="../../../assets/safetyCenter/realname-s.png" alt="">
				<p class="title">{{$t("security_page.137")}}</p>
				<p class="text">{{$t("security_page.139")}}（{{realName}}）</p>
			</div>
			<div class="item" v-else-if="bindRealname==5">
				<img src="../../../assets/safetyCenter/realname-s.png" alt="">
				<p class="title">{{$t("security_page.137")}}</p>
				<p class="text">{{$t("security_page.140")}}（{{realName}}）</p>
			</div>
			<div class="item" v-if="bindEmail">
				<img src="../../../assets/safetyCenter/email-s.png" alt="">
				<p class="title">{{$t("security_page.173")}}</p>
				<p class="text">{{emailValue}}</p>
			</div>
			<div class="item" v-if="!bindEmail">
				<img src="../../../assets/safetyCenter/email.png" alt="">
				<p class="title">{{$t("security_page.173")}}</p>
				<p class="text">{{$t("security_page.136")}}</p>
			</div>
			<div class="item" v-if="bindGoogle">
				<img src="../../../assets/safetyCenter/google-s.png" alt="">
				<p class="title">{{$t("security_page.141")}}</p>
				<p class="text">{{$t("security_page.174")}}</p>
			</div>
			<div class="item" v-if="!bindGoogle">
				<img src="../../../assets/safetyCenter/google.png" alt="">
				<p class="title">{{$t("security_page.141")}}</p>
				<p class="text">{{$t("security_page.142")}}</p>
			</div>
		</div>
		<div class="securityLevel">
			<img src="../../../assets/safetyCenter/securityLevel.png" alt="">
			<p class="title">{{accountValue}}，{{$t("security_page.143")}}{{level}}</p>
			<p class="text">{{$t("security_page.144")}}{{securityCount}}{{$t("security_page.a144")}}</p>
		</div>
		<div class="safetyProtection">
			<div class="item">
				<p class="title">{{$t("security_page.145")}}</p>
				<span class="text">{{$t("security_page.146")}}</span>
				<div class="item-right" v-if="!bindEmail">
					<span class="item-right-one">{{$t("security_page.136")}}</span>
					<span class="item-right-two" @click="isBindEmailPopup = true">{{$t("security_page.147")}}</span>
				</div>
				<div class="item-right" v-if="bindEmail">
					<span class="item-right-one">{{$t("security_page.148")}}</span>
					<span class="item-right-two" @click="isEmailPopup = true">{{$t("security_page.149")}}</span>
				</div>
			</div>
			<div class="item">
				<p class="title">{{$t("security_page.150")}}</p>
				<span class="text">{{$t("security_page.151")}}</span>
				<div class="item-right" v-if="!bindPhone">
					<span class="item-right-one">{{$t("security_page.136")}}</span>
					<span class="item-right-two" @click="isBindPhonePopup = true">{{$t("security_page.147")}}</span>
				</div>
				<div class="item-right" v-if="bindPhone">
					<span class="item-right-one">{{$t("security_page.148")}}</span>
					<span class="item-right-two" @click="isPhonePopup = true">{{$t("security_page.149")}}</span>
				</div>
			</div>
			<div class="item">
				<p class="title">{{$t("security_page.152")}}</p>
				<span class="text">{{$t("security_page.153")}}</span>
				<div class="item-right" v-if="!bindGoogle">
					<span class="item-right-one">{{$t("security_page.136")}}</span>
					<span class="item-right-two" @click="getGoole">{{$t("security_page.147")}}</span>
				</div>
				<div class="item-right" v-if="bindGoogle">
					<span class="item-right-one">{{$t("security_page.148")}}</span>
					<span class="item-right-two" @click="googleSee">{{$t("security_page.154")}}</span>
				</div>
			</div>
			<div class="item">
				<p class="title">{{$t("security_page.175")}}</p>
				<span class="text">{{$t("security_page.155")}}</span>
				<div class="item-right">
					<span class="item-right-one">{{$t("security_page.156")}}</span>
					<span class="item-right-two" @click="isLoginPasswordPopup = true;popupHeight = '390px'">{{$t("security_page.149")}}</span>
				</div>
			</div>
			<div class="item">
				<p class="title">{{$t("security_page.157")}}</p>
				<span class="text">{{$t("security_page.158")}}</span>
				<div class="item-right" v-if="!bindTraderPassword">
					<span class="item-right-one">{{$t("security_page.176")}}</span>
					<span class="item-right-two" @click="SetDealPaw">{{$t("security_page.177")}}</span>
				</div>
				<div class="item-right" v-if="bindTraderPassword">
					<span class="item-right-one">{{$t("security_page.156")}}</span>
					<span class="item-right-two" @click="modifyPaw">{{$t("security_page.149")}}</span>
				</div>
			</div>
		</div>
		<my-popup 
			:isEmailPopup="isEmailPopup" 
			@closeEmailPopup="closeEmailPopup"
			:isBindEmailPopup="isBindEmailPopup" 
			@closeBindEmailPopup="closeBindEmailPopup"
			:isGooglePopup="isGooglePopup" 
			@closeGooglePopup="closeGooglePopup"
			:isPasswordPopup="isPasswordPopup" 
			@closePasswordPopup="closePasswordPopup"
			:isLoginPasswordPopup="isLoginPasswordPopup" 
			@closeLoginPasswordPopup="closeLoginPasswordPopup"
			:titlePopup="titlePopup" 
			:isBindPhonePopup="isBindPhonePopup" 
			@closeBindPhonePopup="closeBindPhonePopup"
			:isPhonePopup="isPhonePopup" 
			@closePhonePopup="closePhonePopup"
			:isBindTraderpassword="isBindTraderpassword" 
			@closeBindTraderpassword="closeBindTraderpassword"
			:isGoogle="isGoogle" 
			:popupHeight="popupHeight" 
			@emailBind = "emailBind"
			@emailModify = "emailModify"
			@phoneBind = "phoneBind"
			@phoneModify = "phoneModify"
			@loginPawModify = "loginPawModify"
			@dealPawModify = "dealPawModify"
			@dealPawBind = "dealPawBind"
			@googleBind = "googleBind"
			:googleInfo = "googleInfo"
			ref="fzj" 
			>
		</my-popup>

	</div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getUserinfo,bindEmail,modifyEmail,bindPhone,modifyPhone,modifyLoginPaw,modifyDealPaw,bindDealPaw,getGooleInfo,bindGoogle,seeGooleInfo} from '@/utils/api'
	export default {
		data () {
		    return {
		    	fullscreenLoading: false, // loading
		    	isBindEmailPopup: false,  // 绑定邮箱弹窗
		    	isEmailPopup: false,  // 修改邮箱弹窗
		    	isPasswordPopup: false,  //修改交易密码弹窗
		    	isLoginPasswordPopup: false,  //修改登录密码弹窗
		    	isBindPhonePopup: false, // 绑定密码弹窗
		    	isPhonePopup: false,  // 修改手机弹窗
		    	isGooglePopup: false, // 绑定谷歌弹窗
		    	isBindTraderpassword: false, // 绑定交易密码弹窗
		    	isGoogle: false, // 是否绑定谷歌验证
		    	popupHeight:'', // 谷歌验证弹窗高度
		    	titlePopup: '', // 修改登录/交易密码title
		    	bindPhone: false, // 是否绑定手机
		    	bindEmail: false, // 是否绑定邮箱
		    	bindTraderPassword: false, // 是否绑定交易密码
		    	bindGoogle: false, // 是否绑定谷歌
		    	bindRealname: 1, // 是否实名认证
		    	phoneValue:'', // 手机
		    	level:'', // 安全等级
		    	securityCount:'', // 几重保护
		    	emailValue:'', // 邮箱
		    	realName:'', // 真实姓名
		    	UIDCode:'', // 会员ID
		    	accountValue: '',  // 账号
		    	googleInfo:'',
		    }
		},
		computed: {
            ...mapState([
                'userinfoList'
            ]),
        },
		async mounted() {
			if(this.userinfoList.isBindPhone){
				this.accountValue = this.userinfoList.phone
			}else{
				this.accountValue = this.userinfoList.email
			}
			this.bindEmail = this.userinfoList.isBindEmail;
			this.bindPhone = this.userinfoList.isBindPhone;
			this.bindGoogle = this.userinfoList.isBindGoogle;
			this.bindRealname = this.userinfoList.isRealVerify;
			this.bindTraderPassword = this.userinfoList.isSetDealCode;
			this.phoneValue = this.userinfoList.phone;
			this.level = this.userinfoList.security;
			this.securityCount = this.userinfoList.securityCount
			this.emailValue = this.userinfoList.email
			this.realName = this.userinfoList.realName
			this.UIDCode = this.userinfoList.code
			this.fullscreenLoading = false;
		},
		methods: {
			...mapMutations([
                'RETSET_PHONE','BIND_EMAIL','BIND_DEALPAW','BIND_GOOGLE','SECURITY_LEVEL'
            ]),
		  	closeBindEmailPopup (data) {
		        this.isBindEmailPopup = data
		    },
		    closeEmailPopup (data) {
		        this.isEmailPopup = data
		    },
			closeGooglePopup (data) {
		        this.isGooglePopup = data
		    },
		    closePasswordPopup (data) {
		        this.isPasswordPopup = data
		    },
		    closeLoginPasswordPopup (data) {
		        this.isLoginPasswordPopup = data
		    },
		    closePhonePopup (data) {
		        this.isPhonePopup = data
		    },
		    closeBindPhonePopup (data) {
		        this.isBindPhonePopup = data
		    },
		    closeBindTraderpassword (data) {
		        this.isBindTraderpassword = data
		    },
		    bindSuccess() {
		        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				  		this.$router.go(0)
				    }
				});
			},
			// 是否绑定谷歌（设置交易密码）
			SetDealPaw(){
				this.isBindTraderpassword = true;
				if(this.bindGoogle){
					this.popupHeight = '390px';
		    	}else{
		    		this.popupHeight = '330px';
		    	}
			},
			// 是否绑定谷歌（修改交易密码）
			modifyPaw(){
				this.isPasswordPopup = true;
				if(this.bindGoogle){
					this.popupHeight = '450px';
		    	}else{
		    		this.popupHeight = '390px';
		    	}
			},
			// 绑定邮箱
		    async emailBind(data){
		    	let res = await bindEmail(data.accountEmail,data.emailCode);
		    	if(!res){
		    		return
		    	}
		    	this.BIND_EMAIL(data.accountEmail);
		    	this.SECURITY_LEVEL();
		    	this.bindSuccess();
		    	this.closeBindEmailPopup();
		    },
		    // 修改邮箱
		    async emailModify(data){
		    	let res = await modifyEmail(data.oldEmail,data.newEmail,data.emailCode);
		    	if(!res){
		    		return
		    	}
				this.BIND_EMAIL(data.newEmail);
		    	this.bindSuccess();
		    	this.closeEmailPopup();
		    },
		    // 绑定手机
		    async phoneBind(data){
		    	let res = await bindPhone(data.regionSelect,data.accountPhone,data.phoneCode);
		    	if(!res){
		    		return
		    	}
		    	this.RETSET_PHONE(data.accountPhone);
		    	this.SECURITY_LEVEL();
		    	this.bindSuccess();
		    	this.closeBindPhonePopup();
		    },
		    // 修改手机
		    async phoneModify(data){
		    	let res = await modifyPhone(data.oldPhone,data.newPhone,data.regionSelect,data.phoneCode);
		    	if(!res){
		    		return
		    	}
		    	this.RETSET_PHONE(data.newPhone);
		    	this.bindSuccess();
		    	this.closePhonePopup();
		    },
		    // 修改登陆密码
		    async loginPawModify(data){
		    	let res = await modifyLoginPaw(data.oldPassword,data.newPassword,data.code);
		    	if(!res){
		    		return
		    	}
		    	this.bindSuccess();
		    	this.closeLoginPasswordPopup();
		    },
		     // 修改交易密码
		    async dealPawModify(data){
		    	let res = await modifyDealPaw(data.oldPassword,data.newPassword,data.code,data.googleCode);
		    	if(!res){
		    		return
		    	}
		    	this.bindSuccess();
		    	this.closePasswordPopup();
		    },
		     // 设置交易密码
		    async dealPawBind(data){
		    	let res = await bindDealPaw(data.dealPaw,data.code);
		    	if(!res){
		    		return
		    	}
		    	this.BIND_DEALPAW();
		    	this.SECURITY_LEVEL();
		    	this.bindSuccess();
		    	this.closeBindTraderpassword();
		    },
		    // 获取谷歌验证
		    async getGoole(){
		    	this.isGooglePopup= true;
		    	this.isGoogle = true;
		    	this.popupHeight='620px';
		    	let res = await getGooleInfo();
		    	if(!res){
		    		return
		    	}
		    	this.googleInfo = res.result;
		    	this.$refs.fzj.getGoogleUrl();
		    },
		    // 绑定谷歌验证
		    async googleBind(data){
		    	let res = await bindGoogle(data.googleCode,data.secret,data.url);
		    	if(!res){
		    		return
		    	}
		    	this.BIND_GOOGLE();
		    	this.SECURITY_LEVEL();
		    	this.bindSuccess();
		    	this.closeGooglePopup();
		    },
		    // 查看谷歌验证
		    async googleSee(data){
		    	this.isGooglePopup= true;
		    	this.isGoogle = false;
		    	this.popupHeight='510px';
		    	let res = await seeGooleInfo();
		    	if(!res){
		    		return
		    	}
		    	this.googleInfo = res.result;
		    	this.$refs.fzj.getGoogleUrl();
		    },
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../../style/mixin';
	 [v-cloak] {
	    display: none !important;
	}
	.userinfo{
		width: 1200px;
		background-color: #fff;
		margin: 0 auto;
		padding: 30px 50px;
		margin-top: 30px;
		>.title{
			padding: 30px 0;
			overflow: hidden;
			p{
				float: left;
				font-size: 16px;
			}
			.line{
				float: left;
				@include wh(1000px,1px);
				background-color: #EEEEEE;
				margin-top: 10px;
				margin-left: 30px;
			}
		}
		.account{
			font-size: 16px;
		}
	}
	.setStatus{
		width: 100%;
		margin-top: 30px;
		overflow: hidden;
		div{
			float: left;
			width: 20%;
			img{
				float: left;
			}
			p{
				float: left;
				margin-left: 20px;
				width: 65%;
			}
			.text{
				color: #5c96e9;
			}
		}
	}
	.securityLevel{
		width: 100%;
		margin-top: 30px;
		background-color: #F4F4F4;
		padding: 20px 0;
		overflow: hidden;
		img{
			float: left;
			margin-left: 30px;
		}
		p{
			float: left;
			margin-left: 50px;
			width: 50%;
		}
		.title{
			margin-top: 30px;
			font-weight: 600;
		}
		.text{
			margin-top: 10px;
		}
	}
	.safetyProtection{
		width: 100%;
		.item{
			padding: 30px 0;
			border-bottom: 1px dashed #E5E5E5; 
			.title{
				float: left;
				width: 140px;
			}
			.text{
				color: #9f9f9f;
			}
			.item-right{
				float: right;
				.item-right-one{
					color: #16478f;
				}
				.item-right-two{
					color: #5c96e9;
					cursor: pointer;
				}
			}
		}
	}
</style>
