<template>
	<div>
		<my-header></my-header>
		<div class="register-wrapper" v-if="!isPhoneRes">
			<p class="title">{{$t("register_page.1")}}</p>
			<el-input :placeholder="($t('register_page.2'))" class="account" v-model="accountPhone">
				<el-select v-model="regionSelect" slot="prepend" :placeholder="($t('register_page.3'))" style="width: 110px">
			    	<el-option v-for="(datas,index) in phonhRegion" :key="datas.region" :value="'+' + (datas.region)"> +{{datas.region}} {{datas.number}}</el-option>
			    </el-select>
			</el-input>
			<el-input :placeholder="($t('register_page.4'))" class="verificationCode" v-model="phoneCode" :maxlength="6">
				<el-button slot="append" class="sendCode" v-if="!computedPhoneTime" @click="sendPhoneCode">{{$t("register_page.5")}}</el-button>
				<el-button slot="append" class="sendCode" v-if="computedPhoneTime" :disabled="true">{{computedPhoneTime}}{{$t("register_page.6")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('register_page.7'))" class="password" v-model="passwordPhone" type="password"></el-input>
			<el-input :placeholder="($t('register_page.8'))" class="againpassword" type="password" v-model="againPasswordPhone"></el-input>
			<el-button class="confirm" type="primary" @click="sendPhoneRegister">{{$t("register_page.9")}}</el-button>
			<p class="agreement"> <el-checkbox v-model="phoneChecked">{{$t("register_page.10")}}</el-checkbox> <router-link to="">{{$t("register_page.19")}}</router-link></p>
			<div class="register">
				<p class="register-email" @click="isPhoneRes = true;accountType = '2'">{{$t("register_page.11")}}</p>
				<div class="go-login">{{$t("register_page.12")}}<router-link to="/login"><span>{{$t("register_page.13")}}</span></router-link></div>
			</div>
		</div>
		<div class="register-wrapper" v-if="isPhoneRes">
			<p class="title">{{$t("register_page.11")}}</p>
			<el-input :placeholder="($t('register_page.14'))" class="account" v-model="accountEmail">
			</el-input>
			<el-input :placeholder="($t('register_page.4'))" class="verificationCode" v-model="emailCode" :maxlength="6">
				<el-button slot="append" class="sendCode" v-if="!computedEmailTime" @click="sendEmailCode">{{$t("register_page.5")}}</el-button>
				<el-button slot="append" class="sendCode" v-if="computedEmailTime" :disabled="true">{{computedEmailTime}}{{$t("register_page.6")}}</el-button>
			</el-input>
			<el-input :placeholder="($t('register_page.7'))" class="password" v-model="passwordEmail" type="password"></el-input>
			<el-input :placeholder="($t('register_page.8'))" class="againpassword" v-model="againPasswordEmail" type="password"></el-input>
			<el-button class="confirm" type="primary" @click="sendEmailRegister">{{$t("register_page.9")}}</el-button>
			<p class="agreement"> <el-checkbox v-model="emailChecked">{{$t("register_page.10")}}</el-checkbox> <router-link to="">{{$t("register_page.19")}}</router-link></p>
			<div class="register">
				<p class="register-email" @click="isPhoneRes = false;accountType = '1'">{{$t("register_page.1")}}</p>
				<div class="go-login">{{$t("register_page.12")}}<router-link to="/login"><span>{{$t("register_page.13")}}</span></router-link></div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import {registerPhoneUser,registerEmailUser,getSMSCode,getEmailCode,verifyPhone,verifyEmail} from '@/utils/api'
import {region} from '@/utils/region'
export default {
	name: 'hello',
	data() {
		return {
			phoneChecked: false, 	// 手机注册协议
			regionSelect:'',		// 选择地区
			accountPhone: '',		// 手机注册用户名			
			phoneCode:'',			// 手机验证码
			passwordPhone: '',		// 手机注册密码			
			againPasswordPhone:'',	// 手机注册确认密码
			phonhRegion:[],     // 地区DATA

			emailChecked: false,	// 邮箱注册协议
			accountEmail: '',		// 邮箱注册用户名
			emailCode:'',			// 手机验证码
			passwordEmail: '',		// 邮箱注册密码
			againPasswordEmail:'',	// 邮箱注册确认密码

			isPhoneRes: false,     	// 页面切换
			accountType: '1',		// 注册type
			computedPhoneTime: 0,   // 计数
			computedEmailTime: 0    // 计数
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	computed: {
	    // ...mapState([
	    //     'token'
	    // ]),
	    // 判断手机号格式是否正确
	    rightPhone : function(){
	    	return /^1[3578]\d{9}$/.test(this.accountPhone);
	    },
	    // 判断邮箱格式是否正确
	    rightEmail: function(){
	    	return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.accountEmail);
	    }
	},
	mounted: function () {
		this.phonhRegion = region;
	},
	methods:{
		// 发送手机验证码
		async sendPhoneCode(){
			if(!this.regionSelect){
				this.$message.error(this.$t('register_page.20'));
          		return
			}
			if(!this.accountPhone){
				this.$message.error(this.$t('register_page.21'));
				return
			}
			if(this.regionSelect == "+86"){
				if(!this.rightPhone){
					this.$message.error(this.$t('register_page.22'));
					return
				}
			}
			// 验证手机号是否注册
			let exsis = await verifyPhone(this.accountPhone);
			if(!exsis){
				return
			}
			if (exsis.result) { 
		       	this.$message.error(this.$t('register_page.23'));
		       	return
	      	}
			this.computedPhoneTime = 120;
            this.timer = setInterval(() => {
                this.computedPhoneTime --;
                if (this.computedPhoneTime == 0) {
                    clearInterval(this.timer)
                }
            }, 1000)
			let res = await getSMSCode(this.regionSelect,this.accountPhone);
		},
		// 发送邮箱验证码
		async sendEmailCode(){
			if(!this.rightEmail){
				this.$message.error(this.$t('register_page.24'));
				return
			}
			// 验证邮箱是否注册
			let exsis = await verifyEmail(this.accountEmail);
			if(!exsis){
				return
			}
			if (exsis.result) { 
		       	this.$message.error(this.$t('register_page.25'));
		       	return
	      	}
			
			if(this.rightEmail){
				this.computedEmailTime = 120;
                this.timer = setInterval(() => {
                    this.computedEmailTime --;
                    if (this.computedEmailTime == 0) {
                        clearInterval(this.timer)
                    }
                }, 1000)
			}
			let res = await getEmailCode(this.accountEmail);
		},
		// 手机注册
		async sendPhoneRegister(){
			let self = this;
			let regionSelect = self.regionSelect;
			let account = self.accountPhone;
			let phoneCode = self.phoneCode;
			let password = self.passwordPhone;
			let againPassword = self.againPasswordPhone;
			if(!regionSelect){
				this.$message.error(this.$t('register_page.20'));
          		return
			}
			if(!account){
				this.$message.error(this.$t('register_page.26'));
          		return
			}
			if(this.regionSelect == "+86"){
				if(!this.rightPhone){
					this.$message.error(this.$t('register_page.27'));
	          		return
				}
			}
			if(!phoneCode){
				this.$message.error(this.$t('register_page.28'));
          		return
			}
			if(!password){
				this.$message.error(this.$t('register_page.29'));
	      		return
			}else if(!/^.{6,16}$/.test(password)){
				this.$message.error(this.$t('register_page.30'));
	      		return
			}else if(/^\d+$/.test(password)){
				this.$message.error(this.$t('register_page.31'));
	      		return
			}
			if(!againPassword){
				this.$message.error(this.$t('register_page.32'));
	      		return
			}else if(againPassword !== password){
				this.$message.error(this.$t('register_page.33'));
	      		return
			}
			if(!this.phoneChecked){
				this.$message.error(this.$t('register_page.15'));
	      		return
			}
	        const res = await registerPhoneUser(self.accountType,this.regionSelect,account,phoneCode,password,againPassword);
	        if(!res){
	        	return
	        }
	        if (res.statusCode == 200) { 
		        this.open();
	      	}
	    },
	    async sendEmailRegister(){
			let self = this;
			let account = self.accountEmail;
			let emailCode = self.emailCode;
			let password = self.passwordEmail;
			let againPassword = self.againPasswordEmail;
			if(!account){
				this.$message.error(this.$t('register_page.34'));
          		return
			}else if(!this.rightEmail){
				this.$message.error(this.$t('register_page.35'));
          		return
			}
			if(!emailCode){
				this.$message.error(this.$t('register_page.28'));
          		return
			}
			if(!password){
				this.$message.error(this.$t('register_page.29'));
	      		return
			}else if(!/^.{6,16}$/.test(password)){
				this.$message.error(this.$t('register_page.30'));
	      		return
			}else if(/^\d+$/.test(password)){
				this.$message.error(this.$t('register_page.31'));
	      		return
			}
			if(!againPassword){
				this.$message.error(this.$t('register_page.32'));
	      		return
			}else if(againPassword !== password){
				this.$message.error(this.$t('register_page.33'));
	      		return
			}
			if(!this.emailChecked){
				this.$message.error(this.$t('register_page.15'));
	      		return
			}
	        const res = await registerEmailUser(self.accountType,account,emailCode,password,againPassword);
	        if (!res) { 
		       return
	      	}
	      	 this.open();
	    },
	    open() {
	        this.$alert(this.$t('register_page.16'), this.$t('register_page.17'), {
				confirmButtonText: this.$t('register_page.18'),
			    callback: action => {
			        this.$router.push({path: '/login'});
			    }
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
@import '../../style/mixin';
	a{
		color: #000;
		text-decoration: none;
	}
	.register-wrapper{
		@include wh(560px,540px);
		@include borderRadius(10px);
		background-color: #fff;
		padding: 40px 90px;
		margin: 80px auto;
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 25px;
			padding-top: 10px;
		}
		.account,.verificationCode,.password,.againpassword{
			margin-top: 24px;
		}
		.agreement{
			margin-top: 10px;
		}
		.register{
			margin-top: 30px;
			overflow: hidden;
			.register-email{
				float: left;
				cursor: pointer;
			}
			.go-login{
				float: right;
				span{
					color: #5C96E9; 
				}
			}
		}
		.confirm{
			width: 100%;
			margin-top: 24px;
			background-color: #5C96E9;
			border-color: #5C96E9;
		}
	}
</style>
