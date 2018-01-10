<template>
	<div>
		<my-header></my-header>
		<div class="login-wrapper">
			<p class="title">{{$t("login_page.1")}}</p>
			<el-input :placeholder="($t('login_page.2'))" class="account" v-model="accountValue"></el-input>
			<el-input :placeholder="($t('login_page.3'))" class="password" type='password' v-model="passwordValue" @keyup.enter.native="sendLogin"></el-input>
			<el-button class="confirm" type="primary" @click="sendLogin">{{$t("login_page.1")}}</el-button>
			<router-link to="/findPassword"><p class="forgotPassword">{{$t("login_page.4")}}</p></router-link>
			<div class="register">
				<p class="no-account">{{$t("login_page.5")}}</p>
				<router-link to="/register"><el-button class="go-register">{{$t("login_page.6")}}</el-button></router-link>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import {mapState, mapMutations} from 'vuex'
import {loginUser,getUserinfo} from '@/utils/api'
export default {
	name: 'hello',
	data() {
		return {
			accountValue:null,
			passwordValue: null
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	computed: {
		// 判断手机号格式是否正确
	    rightPhone : function(){
	    	return /^1[3578]\d{9}$/.test(this.accountValue);
	    },
	    rightEmail: function(){
	    	return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.accountValue);
	    }

	},
	mounted: function () {
		
	},
	methods:{
		...mapMutations([
            'SAVE_LOGINSTATUS','SAVE_USERINFO'
        ]),
		async sendLogin(){
			let self = this;
			let account = this.accountValue;
			let password = this.passwordValue;
			if(!account){
				this.$message.error(this.$t('login_page.7'));
          		return
			}
			// else if(!this.rightPhone && !this.rightEmail){
			// 	this.$message.error('手机号码/邮箱格式错误！');
   //        		return
			// }
			if(!password){
				this.$message.error(this.$t('login_page.8'));
          		return
			}else if(!/.{6}$/.test(password)){
				this.$message.error(this.$t('login_page.9'));
          		return
			}
	        const res = await loginUser(account,password);
	        if(!res){
	        	return
	        }
	        if (res.statusCode == 200) { 
		        let userRes = await getUserinfo();
				if(!userRes){
					return
				}
				this.SAVE_USERINFO(userRes.result);
				this.SAVE_LOGINSTATUS("true");
		    	try{
		            if(this.$route.query.redirect){
		                let url = decodeURIComponent(this.$route.query.redirect)
		                this.$router.push({path: url});
		            }else{
		                this.$router.push({path: '/'});
		            }
		        }catch(err){
		            this.$router.push({path: '/'});
		        }
	      	}else{
	      		this.$message.error(res.msg);
	      	}
	    },
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
	.login-wrapper{
		@include wh(560px,440px);
		@include borderRadius(10px);
		background-color: #fff;
		padding: 40px 100px;
		margin: 130px auto;
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.account,.password{
			margin-top: 24px;
		}
		.forgotPassword{
			margin-top: 10px;
			text-align: right;
			cursor: pointer;
		}
		.register{
			margin-top: 30px;
			overflow: hidden;
			.no-account{
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
		.confirm{
			width: 100%;
			margin-top: 24px;
			background-color: #5C96E9;
			border-color: #5C96E9;
		}
	}
</style>
