<template>
	<div>
	<!-- 设置邮箱弹窗 -->
	<div class="bind-email-popup" v-if="isBindEmailPopup"></div>
	<transition name="fold">
		<div class="popup bind-email-popups" v-if="isBindEmailPopup">
			<div class="close"  @click="closeBindEmailPopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.1")}}</p>
			<el-input :placeholder="($t('popup_page.2'))" class="email" v-model="accountEmail"></el-input>
			<el-input :placeholder="($t('popup_page.3'))" class="verificationCode" v-model="emailCode" :maxlength="6">
				<el-button slot="append" class="sendCode" v-if="!computedEmailTime" @click="sendEmailCode(accountEmail)">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedEmailTime" :disabled="true">{{computedEmailTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-button class="confirm" type="primary" @click="emailBind">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 修改邮箱验证弹窗 -->
	<div class="email-popup" v-if="isEmailPopup"></div>
	<transition name="fold">
		<div class="popup email-popups" v-if="isEmailPopup">
			<div class="close"  @click="closeEmailPopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.7")}}</p>
			<el-input :placeholder="($t('popup_page.8'))" class="oldemail" v-model="oldEmail"></el-input>
			<el-input :placeholder="($t('popup_page.9'))" class="newemail" v-model="newEmail"></el-input>
			<el-input :placeholder="($t('popup_page.10'))" class="verificationCode" v-model="emailCode" :maxlength="6">
				<el-button slot="append" class="sendCode" v-if="!computedEmailTime" @click="sendEmailCode(newEmail)">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedEmailTime" :disabled="true">{{computedEmailTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-button class="confirm" type="primary" @click="emailModify">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 修改交易密码弹窗 -->
	<div class="password-popup" v-if="isPasswordPopup"></div>
	<transition name="fold">
		<div class="popup password-popups" :style="{height:popupHeight}" v-if="isPasswordPopup">
			<div class="close"  @click="closePasswordPopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.11")}}</p>
			<el-input :placeholder="($t('popup_page.12'))" class="oldPassword" v-model="oldPassword" type="password"></el-input>
			<el-input :placeholder="($t('popup_page.13'))" class="newPassword" v-model="newPassword" type="password"></el-input>
			<el-input :placeholder="($t('popup_page.14'))" class="againNewPassword" v-model="againNewPassword" type="password"></el-input>
			<el-input :placeholder="($t('popup_page.15'))" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
				<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('popup_page.16'))" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
				<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('popup_page.17'))" class="googleCode" v-model="googleCode" v-if="isBindGoogle"></el-input>
			<el-button class="confirm" type="primary" @click="dealPawModify">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 修改登录密码弹窗 -->
	<div class="loginPassword-popup" v-if="isLoginPasswordPopup"></div>
	<transition name="fold">
		<div class="popup loginPassword-popups" :style="{height:popupHeight}" v-if="isLoginPasswordPopup">
			<div class="close"  @click="closeLoginPasswordPopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.18")}}</p>
			<el-input :placeholder="($t('popup_page.12'))" class="oldPassword" v-model="oldPassword" type="password"></el-input>
			<el-input :placeholder="($t('popup_page.13'))" class="newPassword" v-model="newPassword" type="password"></el-input>
			<el-input :placeholder="($t('popup_page.14'))" class="againNewPassword" v-model="againNewPassword" type="password"></el-input>
			<el-input :placeholder="($t('popup_page.15'))" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
				<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('popup_page.16'))" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
				<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-button class="confirm" type="primary" @click="loginPawModify">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 绑定手机弹窗 -->
	<div class="bind-phone-popup" v-if="isBindPhonePopup"></div>
	<transition name="fold">
		<div class="popup bind-phone-popups" v-if="isBindPhonePopup">
			<div class="close"  @click="closeBindPhonePopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.19")}}</p>
			<el-input :placeholder="($t('popup_page.20'))" class="account" v-model="accountPhone">
				<el-select v-model="regionSelect" slot="prepend" :placeholder="($t('popup_page.21'))" style="width: 110px">
			    	<el-option v-for="(data,index) in phonhRegion" :key="data.region" :value="'+' + (data.region)">+{{data.region}} {{data.number}}</el-option>
			    </el-select>
			</el-input>
			<el-input :placeholder="($t('popup_page.3'))" class="verificationCode" v-model="phoneCode" :maxlength="6">
				<el-button slot="append" class="sendCode" v-if="!computedPhoneTime" @click="sendPhoneCode(accountPhone)">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedPhoneTime" :disabled="true">{{computedPhoneTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-button class="confirm" type="primary" @click="phoneBind">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 修改手机弹窗 -->
	<div class="phone-popup" v-if="isPhonePopup"></div>
	<transition name="fold">
		<div class="popup phone-popups" v-if="isPhonePopup">
			<div class="close"  @click="closePhonePopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.22")}}</p>
			<el-input :placeholder="($t('popup_page.23'))" class="oldPhone" v-model="oldPhone"></el-input>
			<el-input :placeholder="($t('popup_page.24'))" class="newPhone" v-model="newPhone">
				<el-select v-model="regionSelect" slot="prepend" :placeholder="($t('popup_page.21'))" style="width: 110px">
			    	<el-option v-for="(data,index) in phonhRegion" :key="data.region" :value="'+' + (data.region)">+{{data.region}} {{data.number}}</el-option>
			    </el-select>
			</el-input>
			<!-- <el-input placeholder="图形验证码" class="captchaCode">
				<div slot="append" class="imgCode" style="background:url('./../assets/safetyCenter/img-icon.png');"></div>
			</el-input> -->
			<el-input :placeholder="($t('popup_page.15'))" class="verificationCode" v-model="phoneCode" :maxlength="6">
				<el-button slot="append" class="sendCode" v-if="!computedPhoneTime" @click="sendPhoneCode(newPhone)">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedPhoneTime" :disabled="true">{{computedPhoneTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-button class="confirm" type="primary" @click="phoneModify">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 修改谷歌验证弹窗 -->
	<div class="google-popup" v-if="isGooglePopup"></div>
	<transition name="fold">
		<div class="popup google-popups" :style="{height:popupHeight}" v-if="isGooglePopup">
			<div class="close"  @click="closeGooglePopup"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.25")}}</p>
			<div class="qrCode">
				<div class="qrCode-left">
					<div class="qrCode-box">
						<img src="./../assets/safetyCenter/googleQR.png" alt="">
					</div>
					<p>{{$t("popup_page.26")}}</p>
				</div>
				<div class="qrCode-right">
					<div class="qrCode-box" id="code">
						<!-- <img src="./../assets/safetyCenter/googleQR.png" alt=""> -->
					</div>
					<p>
						{{$t("popup_page.27")}}
					</p>
				</div>
			</div>
			<div class="google-form">
				<div class="item">
					<label>{{$t("popup_page.28")}}</label>
					<span>{{data.secret}}</span>
				</div>
				<div class="item">
					<label>{{$t("popup_page.29")}}</label>
					<span>{{data.code}}</span>
				</div>
				<div class="item" v-if="isGoogle"> 
					<label>{{$t("popup_page.30")}}</label>
					<el-input :placeholder="($t('popup_page.31'))" class="googleCode" v-model="googleCode"></el-input>
				</div>
				<el-button class="confirm" type="primary" v-if="isGoogle" @click="googleBind">{{$t("popup_page.6")}}</el-button>
			</div>
		</div>
	</transition>
	<!-- 设置交易密码弹窗 -->
	<div class="bind-traderpassword-popup" v-if="isBindTraderpassword"></div>
	<transition name="fold">
		<div class="popup bind-traderpassword-popups" :style="{height:popupHeight}" v-if="isBindTraderpassword">
			<div class="close"  @click="closeBindTraderpassword"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.32")}}</p>
			<el-input :placeholder="($t('popup_page.33'))" class="traderpassword" type="password" v-model="dealPaw"></el-input>
			<el-input :placeholder="($t('popup_page.34'))" class="againtraderpassword" type="password" v-model="againDealPaw"></el-input>
			<el-input :placeholder="($t('popup_page.15'))" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
				<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('popup_page.16'))" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
				<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("popup_page.4")}}</el-button>
				<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("popup_page.5")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('popup_page.31'))" class="googleCode" v-model="googleCode" v-if="isBindGoogle"></el-input>
			<el-button class="confirm" type="primary" @click="dealPawBind">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>
	<!-- 输入交易密码 -->
	<div class="send-trade-password" v-if="isSendTraderPassword"></div>
	<transition name="fold">
		<div class="popup send-trade-passwords" v-if="isSendTraderPassword">
			<div class="close"  @click="closeSendTradePassword"><i class="el-icon-close"></i></div>
			<p class="title">{{$t("popup_page.35")}}</p>
			<el-input :placeholder="($t('popup_page.35'))" class="traderpassword" type="password" v-model="sendTraderPassword"></el-input>
			<el-button class="confirm" type="primary" @click="sendTraderPaw">{{$t("popup_page.6")}}</el-button>
		</div>
	</transition>



	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {verifyEmail,getEmailCode,verifyPhone,getSMSCode,getSMSLogin} from '@/utils/api'
import {region} from '@/utils/region'
	export default {
		// props:["isPasswordPopup","isPhonePopup","isGooglePopup","titlePopup"],
		props:{
			isBindEmailPopup: {
	          type: Boolean,
	          default: false
	        },
	        isEmailPopup: {
	          type: Boolean,
	          default: false
	        },
			isPasswordPopup: {
	          type: Boolean,
	          default: false
	        },
	        isLoginPasswordPopup: {
	          type: Boolean,
	          default: false
	        },
	        isBindPhonePopup: {
	          type: Boolean,
	          default: false
	        },
	        isPhonePopup: {
	          type: Boolean,
	          default: false
	        },
	        isGooglePopup: {
	          type: Boolean,
	          default: false
	        },
	        isBindTraderpassword: {
	          type: Boolean,
	          default: false
	        },
	        isSendTraderPassword: {
	          type: Boolean,
	          default: false
	        },
	        titlePopup: {
	          type: String,
	          default: ''
	        },
	        isGoogle: {
	          type: Boolean,
	          default: false
	        },
	        popupHeight: {
	          type: String,
	          default: ''
	        },
	        googleInfo:{
	        }
		},
		data () {
		    return {
		    	phonhRegion:region,     // 地区DATA
		    	regionSelect:'',		// 选择地区
		    	computedEmailTime: 0,    // 计数
				accountEmail: '',  
				emailCode:'',   // 邮箱验证码
				oldEmail: '',
				newEmail: '',
				phoneCode:'',			// 手机验证码
				computedPhoneTime: 0,   // 计数
				accountPhone: '',
				oldPhone: '',
				newPhone: '',
				oldPassword: '',
				newPassword: '',
				againNewPassword: '',
				isBindPhone: true,
				code: '',
				dealPaw: '',
				againDealPaw: '',
				googleCode: '',
				isBindGoogle: false,
				computedTime: 0,
				sendTraderPassword: '',
		    }
		},
		components: {
		},
		mounted: function () {
			this.isBindGoogle = this.userinfoList.isBindGoogle;
		 	if(this.userinfoList.isBindPhone){
		 		this.isBindPhone = true;
		 	}else{
		 		this.isBindPhone = false;
		 	}   
		},
		computed:{
             ...mapState([
                'userinfoList'
            ]),
            data: function () {  
		      let obj=Object.assign({}, this.googleInfo); 
		      return obj  
		    }
        },
		methods: {
			getGoogleUrl() {
	          	this.getGoogle();
	        },
			getGoogle(){
				this.$nextTick(function () {
	           		require ('@/utils/jquery-3.2.1.min.js');
	            	require ('@/utils/jquery.qrcode.min.js');
	            	this.qrcode();
	            })
			},
			qrcode(){
                $("#code").qrcode({
                    text: this.data.url,
                    width:116,
                    height:116
                });
            },
			 // 判断手机号格式是否正确
		    rightPhone : function(phone){
		    	return /^1[3578]\d{9}$/.test(phone);
		    },
		    // 判断邮箱格式是否正确
			rightEmail: function(email){
		    	return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(email);
		    },
			closeBindEmailPopup:function(){
				this.$emit('closeBindEmailPopup', false)
				this.accountEmail=this.emailCode='';
			},
			closeEmailPopup:function(){
				this.$emit('closeEmailPopup', false)
				this.oldEmail=this.newEmail=this.emailCode='';
			},
			closeGooglePopup:function(){
				this.$emit('closeGooglePopup', false)
				this.googleCode="";
			},
			closePasswordPopup:function(){
				this.$emit('closePasswordPopup', false);
				this.oldPassword=this.newPassword=this.againNewPassword=this.code='';
				this.computedTime = 0;
			},
			closeLoginPasswordPopup:function(){
				this.$emit('closeLoginPasswordPopup', false);
				this.oldPassword=this.newPassword=this.againNewPassword=this.code='';
				this.computedTime = 0;
			},
			closeBindPhonePopup:function(){
				this.$emit('closeBindPhonePopup', false);
				this.accountPhone=this.phoneCode=this.regionSelect='';
			},
			closePhonePopup:function(){
				this.$emit('closePhonePopup', false);
				this.oldPhone=this.newPhone=this.phoneCode=this.regionSelect='';
			},
			closeBindTraderpassword:function(){
				this.$emit('closeBindTraderpassword', false);
				this.dealPaw=this.againDealPaw=this.code='';
				this.computedTime = 0;
			},
			closeSendTradePassword:function(){
				this.$emit('closeSendTradePassword', false);
			},
			// 发送验证码(手机/邮箱 登录之后)
			async SMSLogin(){
				let res = await getSMSLogin();
				if(!res){
					return
				}
				this.computedTime = 120;
                this.timer = setInterval(() => {
                    this.computedTime --;
                    if (this.computedTime == 0) {
                        clearInterval(this.timer)
                    }
                }, 1000)
			},
			// 发送手机验证码
			async sendPhoneCode(phone){
				if(!this.regionSelect){
					this.$message.error(this.$t('popup_page.36'));
	          		return
				}
				if(!phone){
					this.$message.error(this.$t('popup_page.37'));
					return
				}
				if(this.regionSelect == "+86"){
					if(!this.rightPhone(phone)){
						this.$message.error(this.$t('popup_page.38'));
						return
					}
				}
				// 验证手机号是否注册
				let exsis = await verifyPhone(phone);
				if(!exsis){
					return
				}
				if (exsis.result) { 
			       	this.$message.error(this.$t('popup_page.39'));
			       	return
		      	}
				
				this.computedPhoneTime = 120;
                this.timer = setInterval(() => {
                    this.computedPhoneTime --;
                    if (this.computedPhoneTime == 0) {
                        clearInterval(this.timer)
                    }
                }, 1000)
				let res = await getSMSCode(this.regionSelect,phone);
			},
			// 发送邮箱验证码
			async sendEmailCode(email){
				if(!this.rightEmail(email)){
					this.$message.error(this.$t('popup_page.40'));
					return
				}
				// 验证邮箱是否注册
				let exsis = await verifyEmail(email);
				if(!exsis){
					return
				}
				if (exsis.result) { 
			       	this.$message.error(this.$t('popup_page.41'));
			       	return
		      	}
				
				if(this.rightEmail(email)){
					this.computedEmailTime = 120;
	                this.timer = setInterval(() => {
	                    this.computedEmailTime --;
	                    if (this.computedEmailTime == 0) {
	                        clearInterval(this.timer)
	                    }
	                }, 1000)
				}
				let res = await getEmailCode(email);
			},
			// 绑定邮箱
		    emailBind(){
				if(!this.accountEmail){
					this.$message.error(this.$t('popup_page.42'));
					return
				}else if(!this.rightEmail(this.accountEmail)){
					this.$message.error(this.$t('popup_page.43'));
					return
				}
				if(!this.emailCode){
					this.$message.error(this.$t('popup_page.44'));
					return
				}
				this.$emit('emailBind',{
					accountEmail: this.accountEmail,
					emailCode: this.emailCode
				});
			},
			// 修改邮箱
		    emailModify(){
				if(!this.oldEmail){
					this.$message.error(this.$t('popup_page.45'));
					return
				}else if(!this.rightEmail(this.oldEmail)){
					this.$message.error(this.$t('popup_page.43'));
					return
				}
				if(!this.newEmail){
					this.$message.error(this.$t('popup_page.46'));
					return
				}else if(!this.rightEmail(this.newEmail)){
					this.$message.error(this.$t('popup_page.43'));
					return
				}
				if(!this.emailCode){
					this.$message.error(this.$t('popup_page.47'));
					return
				}
				this.$emit('emailModify',{
					oldEmail: this.oldEmail,
					newEmail: this.newEmail,
					emailCode: this.emailCode
				});
			},
			// 绑定手机
			phoneBind(){
				if(!this.regionSelect){
					this.$message.error(this.$t('popup_page.48'));
					return
				}
				if(!this.accountPhone){
					this.$message.error(this.$t('popup_page.49'));
					return
				}
				if(this.regionSelect == "+86"){
					if(!this.rightPhone(this.accountPhone)){
						this.$message.error(this.$t('popup_page.50'));
						return
					}
				}
				if(!this.phoneCode){
					this.$message.error(this.$t('popup_page.51'));
					return
				}
				this.$emit('phoneBind',{
					regionSelect: this.regionSelect,
					accountPhone: this.accountPhone,
					phoneCode: this.phoneCode
				});
			},
			// 修改手机
			phoneModify(){
				if(!this.oldPhone){
					this.$message.error(this.$t('popup_page.52'));
					return
				}
				if(!this.regionSelect){
					this.$message.error(this.$t('popup_page.53'));
					return
				}
				if(!this.newPhone){
					this.$message.error(this.$t('popup_page.54'));
					return
				}
				if(this.regionSelect == "+86"){
					if(!this.rightPhone(this.newPhone)){
						this.$message.error(this.$t('popup_page.55'));
						return
					}
				}
				if(!this.phoneCode){
					this.$message.error(this.$t('popup_page.56'));
					return
				}
				this.$emit('phoneModify',{
					oldPhone: this.oldPhone,
					newPhone: this.newPhone,
					regionSelect: this.regionSelect,
					phoneCode: this.phoneCode
				});
			},
			// 修改登录密码
			loginPawModify(){
				if(!this.oldPassword){
					this.$message.error(this.$t('popup_page.57'));
					return
				}
				if(!this.newPassword){
					this.$message.error(this.$t('popup_page.58'));
					return
				}else if(!/^.{6,16}$/.test(this.newPassword)){
					this.$message.error(this.$t('popup_page.59'));
		      		return
				}else if(/^\d+$/.test(this.newPassword)){
					this.$message.error(this.$t('popup_page.60'));
		      	}
				if(!this.againNewPassword){
				this.$message.error(this.$t('popup_page.61'));
		      		return
				}else if(this.againNewPassword !== this.newPassword){
					this.$message.error(this.$t('popup_page.62'));
		      		return
				}
				if(!this.code){
					this.$message.error(this.$t('popup_page.63'));
					return
				}
				this.$emit('loginPawModify',{
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
					code: this.code
				});
				
			},
			// 修改交易密码
			dealPawModify(){
				if(!this.oldPassword){
					this.$message.error(this.$t('popup_page.64'));
					return
				}
				if(!this.newPassword){
					this.$message.error(this.$t('popup_page.65'));
					return
				}else if(!/^.{6,16}$/.test(this.newPassword)){
					this.$message.error(this.$t('popup_page.66'));
		      		return
				}else if(/^\d+$/.test(this.newPassword)){
					this.$message.error(this.$t('popup_page.67'));
		      	}
				if(!this.againNewPassword){
				this.$message.error(this.$t('popup_page.68'));
		      		return
				}else if(this.againNewPassword !== this.newPassword){
					this.$message.error(this.$t('popup_page.69'));
		      		return
				}
				if(!this.code){
					this.$message.error(this.$t('popup_page.70'));
					return
				}
				this.$emit('dealPawModify',{
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
					code: this.code,
					googleCode: this.googleCode,
					
				});
				
			},
			// 设置交易密码
			dealPawBind(){
				if(!this.dealPaw){
					this.$message.error(this.$t('popup_page.71'));
					return
				}else if(!/^.{6,16}$/.test(this.dealPaw)){
					this.$message.error(this.$t('popup_page.72'));
		      		return
				}else if(/^\d+$/.test(this.dealPaw)){
					this.$message.error(this.$t('popup_page.73'));
		      	}
				if(!this.againDealPaw){
				this.$message.error(this.$t('popup_page.74'));
		      		return
				}else if(this.againDealPaw !== this.dealPaw){
					this.$message.error(this.$t('popup_page.75'));
		      		return
				}
				if(!this.code){
					this.$message.error(this.$t('popup_page.76'));
					return
				}
				this.$emit('dealPawBind',{
					dealPaw: this.dealPaw,
					code: this.code
				});
			},
			// 绑定谷歌验证
			googleBind(){
				if(!this.googleCode){
					this.$message.error(this.$t('popup_page.77'));
					return
				}
				this.$emit('googleBind',{
					googleCode: this.googleCode,
					secret: this.data.secret,
					url: this.data.url
				});
			},
			// 发送交易密码
			sendTraderPaw(){
				if(!this.sendTraderPassword){
					this.$message.error(this.$t('popup_page.78'));
					return
				}
				this.$emit('sendTraderPaw',{
					sendTraderPassword: this.sendTraderPassword,
				});
			}
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">
 @import './../style/mixin';
	 .imgCode{
	 	width: 82px;
	 	height: 30px;
	 	padding: 2px 0;
	 }
	 [v-cloak] {
	   display:none;
	}
 	// 邮箱弹窗
	.bind-email-popup,.email-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.email-popups{
 		@include wh(530px,330px);
 	}
 	.bind-email-popups{
		@include wh(530px,280px);
 	}
	.email-popups,.bind-email-popups{
		position: fixed;
		top: 50%;
		left: 50%;
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 100px;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.email,.oldemail,.newemail{
			margin-top: 20px;
		}
		.verificationCode{
			margin-top: 20px;
			.sendCode{
				background-color: #fff;
				color: #6b9eeb;
				cursor: pointer;
			}
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
	}
	
	// 修改密码弹窗
	.password-popup,.loginPassword-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.password-popups,.loginPassword-popups{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 530px;
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 100px;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.oldPassword,.newPassword,.againNewPassword,.googleCode{
			margin-top: 20px;
		}
		.el-select .el-input {
		    width: 110px;
		}
		.verificationCode{
			margin-top: 20px;
			.sendCode{
				background-color: #fff;
				color: #6b9eeb;
				cursor: pointer;
			}
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
	}
	// 绑定手机弹窗
	.bind-phone-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.bind-phone-popups{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(530px,280px);
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 100px;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.newPhone{
			margin-top: 20px;
		}
		.verificationCode{
			margin-top: 20px;
			.sendCode{
				background-color: #fff;
				color: #6b9eeb;
				cursor: pointer;
			}
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
	}
	// 修改手机弹窗
	.phone-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.phone-popups{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(530px,330px);
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 100px;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.oldPhone,.newPhone,.captchaCode{
			margin-top: 20px;
		}
		.verificationCode{
			margin-top: 20px;
			.sendCode{
				background-color: #fff;
				color: #6b9eeb;
				cursor: pointer;
			}
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
	}
	// 修改谷歌验证弹窗
	.google-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.google-popups{
		position: fixed;
		top: 50%;
		left: 50%;
		// @include wh(530px,620px);
		width: 530px;
		@include borderRadius(12px 12px 10px 10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			color: #fff;
			cursor: pointer;
		}
		.title{
			padding: 30px 0;
			text-align: center;
			font-size: 16px;
			color: #fff;
			background-color: #2A71D7;
			@include borderRadius(10px 10px 0 0);
		}
		.qrCode{
			padding: 30px 80px;
			background-color: #F7F7F7;
			overflow: hidden;
			 >div{
				width: 138px;
				.qrCode-box{
					@include borderRadius(5px);
					border: 1px solid #5591E6;
					padding: 10px;
					background-color: #fff;
					min-height: 141px;
				}
				p{
					margin-top: 15px;
					color: #a9a9a9;
				}
			}
			.qrCode-left{
				float: left;
			}
			.qrCode-right{
				float: right;
			}
		}
		.google-form{
			padding: 10px 80px;
			.item{
				margin-top: 20px;
				label{
					display: inline-block;
					width: 80px;
					text-align: right;
				}
				span{
					display: inline-block;
					margin-left: 10px;
				}
				.googleCode{
					width: 270px;
					margin-left: 10px;
				}
			}
			.confirm{
				margin-top: 30px;
				background-color: #5C96E9;
				border-color: #5C96E9;
				padding: 12px 30px;
				margin-left: 90px;
    		}
		}
		
	}
	// 设置交易密码弹窗
	.bind-traderpassword-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.bind-traderpassword-popups{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 530px;
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 100px;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.traderpassword,.againtraderpassword,.googleCode{
			margin-top: 20px;
		}
		.verificationCode{
			margin-top: 20px;
			.sendCode{
				background-color: #fff;
				color: #6b9eeb;
				cursor: pointer;
			}
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
	}
	// 输入交易密码
	.send-trade-password{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
		z-index: 10;
	}
	.send-trade-passwords{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(530px,220px);
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 100px;
		opacity: 0;
		z-index: 10;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.traderpassword{
			margin-top: 20px;
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
	}
	.popup{
 		transform: translate(-50%, -50%);
	    opacity: 1;
	}
	.fold-enter-active, .fold-leave-active {
	    transition: all .5s;
	}
	.fold-enter, .fold-leave-active {
	    transform: translate(-50%, -60%);
	    opacity: 0;
	}
</style>