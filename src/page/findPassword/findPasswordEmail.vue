<template>
	<div>
		<my-header></my-header>

		<div class="box" v-if="step == 'A'">
			<div class="title">
				<div class="on"></div>
				<div class="on">{{$t("findpaw_page.4")}}</div>
				<div></div>
				<div>{{$t("findpaw_page.5")}}</div>
				<div></div>
				<div>{{$t("findpaw_page.6")}}</div>
				<div></div>
			</div>
			<div class="find-wrapper">
				<p class="title">{{$t("findpaw_page.3")}}</p>
				<el-input :placeholder="($t('findpaw_page.7'))" class="account" v-model="accountEmail"></el-input>
				<el-input :placeholder="($t('findpaw_page.8'))" class="verificationCode" :maxlength="6" v-model="emailCode">
					<el-button slot="append" class="sendCode" v-if="!computedEmailTime" @click="sendEmailCode">{{$t("findpaw_page.9")}}</el-button>
					<el-button slot="append" class="sendCode" v-if="computedEmailTime" :disabled="true">{{computedEmailTime}}{{$t("findpaw_page.10")}}</el-button>
				</el-input>
				<el-button class="confirm" type="primary" @click="firstStep">{{$t("findpaw_page.11")}}</el-button>
				<div class="register">
					<router-link to="/findPasswordPhone"><p class="findPasswordPhone">{{$t("findpaw_page.2")}}</p></router-link>
					<router-link to="/register"><el-button class="go-register">{{$t("findpaw_page.12")}}</el-button></router-link>
				</div>
			</div>
		</div>
		<div class="box" v-else-if="step == 'B'">
			<div class="title">
				<div></div>
				<div>{{$t("findpaw_page.4")}}</div>
				<div class="on"></div>
				<div class="on">{{$t("findpaw_page.5")}}</div>
				<div class="on"></div>
				<div>{{$t("findpaw_page.6")}}</div>
				<div></div>
			</div>
			<div class="find-wrapper">
				<p class="title">{{$t("findpaw_page.3")}}</p>
				<el-input :placeholder="($t('findpaw_page.13'))" class="password" v-model="password" type="password"></el-input>
				<el-input :placeholder="($t('findpaw_page.14'))" class="againpassword" v-model="againPassword" type="password"></el-input>
				<el-button class="confirm" type="primary" @click="secondSteps">{{$t("findpaw_page.11")}}</el-button>
				<div class="register">
					<router-link to="/findPasswordPhone"><p class="findPasswordPhone">{{$t("findpaw_page.2")}}</p></router-link>
					<router-link to="/register"><el-button class="go-register">{{$t("findpaw_page.12")}}</el-button></router-link>
				</div>
			</div>
		</div>
		<div class="box" v-else-if="step == 'C'">
			<div class="title">
				<div></div>
				<div>{{$t("findpaw_page.4")}}</div>
				<div></div>
				<div>{{$t("findpaw_page.5")}}</div>
				<div></div>
				<div class="on">{{$t("findpaw_page.6")}}</div>
				<div class="on"></div>
			</div>
			<div class="find-wrapper">
				<p class="title">{{$t("findpaw_page.3")}}</p>
				<div class="success">
					<img src="../../assets/findPassword/success.png" alt="">
					<p>{{$t("findpaw_page.36")}}</p>
				</div>
				<router-link to="/login"><el-button class="confirm" type="primary">{{$t("findpaw_page.15")}}</el-button></router-link>
				<div class="register">
					<router-link to="/findPasswordPhone"><p class="findPasswordPhone">{{$t("findpaw_page.2")}}</p></router-link>
					<router-link to="/register"><el-button class="go-register">{{$t("findpaw_page.12")}}</el-button></router-link>
				</div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import {getEmailCode,verifyEmail,isVerificationCode,findPasswordEmail} from '@/utils/api'
export default {
	name: 'hello',
	data() {
		return {
			checked: true,
			step: "A",
			accountEmail:'',
			emailCode:'',
			computedEmailTime:0,
			password:'',
			againPassword:''
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	computed: {
	    // 判断邮箱格式是否正确
	    rightEmail: function(){
	    	return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.accountEmail);
	    }
	},
	methods:{
		// 发送邮箱验证码
		async sendEmailCode(){
			if(!this.rightEmail){
				this.$message.error(this.$t('findpaw_page.16'));
				return
			}
			// 验证手机号是否注册
			let exsis = await verifyEmail(this.accountEmail);
			if(!exsis){
				return
			}
			if (!exsis.result) { 
		       	this.$message.error(this.$t('findpaw_page.17'));
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
		// 邮箱找回密码第一步
		async firstStep(){
			if(!this.accountEmail){
				this.$message.error(this.$t('findpaw_page.18'));
          		return
			}else if(!this.rightEmail){
				this.$message.error(this.$t('findpaw_page.19'));
          		return
			}
			if(!this.emailCode){
				this.$message.error(this.$t('findpaw_page.20'));
          		return
			}
			// 验证短信验证码是否正确
			let res = await isVerificationCode('2',this.emailCode);
			if(!res.result){
				this.$message.error(this.$t('findpaw_page.21'));
				return
			}
			this.step = 'B';
		},
		// 手机找回密码第二步
		async secondSteps(){
			if(!this.password){
				this.$message.error(this.$t('findpaw_page.22'));
	      		return
			}else if(!/^.{6,16}$/.test(this.password)){
				this.$message.error(this.$t('findpaw_page.23'));
	      		return
			}else if(/^\d+$/.test(this.password)){
				this.$message.error(this.$t('findpaw_page.24'));
	      		return
			}
			if(!this.againPassword){
				this.$message.error(this.$t('findpaw_page.25'));
	      		return
			}else if(this.againPassword !== this.password){
				this.$message.error(this.$t('findpaw_page.26'));
	      		return
			}
			let res = await findPasswordEmail(this.accountEmail,this.emailCode,this.password,this.againPassword);
			if(!res){
				return
			}
			this.step = 'C'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
@import '../../style/mixin';
.box {
	width: 100%;
	min-width: 1200px;
	background: #f6f6f6;
	padding-top: 55px;
	padding-bottom: 45px;
	text-align: center;
	>.title {
		overflow: hidden;
		margin: 0 auto;
		width: 841px;
		margin-bottom: 50px;
		div {
			float: left;
		}

		div:nth-of-type(2n+1) {
			width: 140px;
			height: 1px;
			background: #a8a8a8;
			margin-top: 20px;
		}

		div:nth-of-type(2n) {
			width: 92px;
			height: 36px;
			border: 1px solid #a8a8a8;
			line-height: 36px;
			color: #636363;
			text-align: center;
		}
	}

	a{
		color: #000;
		text-decoration: none;
	}

	.on {
		color: #fff!important;
		background: #5c96e9!important;
		border-color: #5c96e9!important;
	}

	.fom {
		width: 562px;
		height: 606px;
		// border: 1px solid #e4e4e4;
		border-radius: 10px;
		margin: 0 auto;
		background: #fff;
		position: relative;
	}

	.fom h4 {
		text-align: center;
		color: #525252;
		font-size: 23px;
		margin-top: 50px;
		margin-bottom: 50px;
		font-weight: normal;
	}

	.int {
		width: 477px;
		height: 53px;
		border: 1px solid #c3c3c3;
		border-radius: 8px;
		padding-left: 70px;
		margin-bottom: 28px;
		outline: none;
	}
}

.find-wrapper{
	@include wh(560px,auto);
	@include borderRadius(10px);
	background-color: #fff;
	padding: 40px 100px;
	margin: 78px auto;
	.title{
		text-align: center;
		font-size: 18px;
		padding-bottom: 15px;
	}
	.account,.certificatesType,.certificatesNum,.verificationCode,.password,.againpassword{
		margin-top: 24px;
	}
	.register{
		margin-top: 30px;
		overflow: hidden;
		.findPasswordPhone{
			float: left;
			padding: 10px 0;
		}
		.go-register{
			float: right;
			padding: 10px 20px;
			border-color: #5C96E9;
			color: #5C96E9; 
		}
	}
	.success{
		padding: 20px 0;
		p{
			margin-top: 23px;
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
