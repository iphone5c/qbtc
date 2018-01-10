<template>
	<div class="privateApi">
		<div class="title">
			<p>{{$t("security_page.96")}}</p>
			<div class="line"></div>
		</div>
		<div class="openApi" v-if="type == '1'">
			<div class="tips">
				<img src="../../../assets/safetyCenter/explain.png" alt="">
				{{$t("security_page.97")}}{{title}} <span>API</span>
			</div>
			<div class="api">
				<div class="item">
					<span class="title">{{$t("security_page.171")}}</span>
					<el-input :placeholder="($t('security_page.98'))" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
						<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("security_page.167")}}</el-button>
						<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("security_page.168")}}</el-button>
					</el-input>
					<el-input :placeholder="($t('security_page.99'))" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
						<el-button slot="append" class="sendCode" v-if="computedTime <= 0" @click="SMSLogin">{{$t("security_page.167")}}</el-button>
						<el-button slot="append" v-if="computedTime > 0" :disabled="true">{{computedTime}}{{$t("security_page.168")}}</el-button>
					</el-input>
				</div>
				<div class="item">
					<span class="title">{{$t("security_page.100")}}</span>
					<el-input :placeholder="($t('security_page.101'))" v-model="google"></el-input>
				</div>
				<div class="item">
					<span class="title">{{$t("security_page.102")}}</span>
					<el-input :placeholder="($t('security_page.103'))" class="certificatesNum" v-model="password" type="password"></el-input>
				</div>
				<el-button type="primary" class="confirm" @click="confirm" v-if="buttonType == 1">{{$t("security_page.104")}}</el-button>
				<el-button type="primary" class="confirm" @click="confirm" v-if="buttonType == 2">{{$t("security_page.105")}}</el-button>
				<el-button type="primary" class="confirm" @click="apiClose" v-if="buttonType == 3">{{$t("security_page.106")}}</el-button>
			</div>
		</div>
		<div class="keyApi" v-else-if="type == '2'">
			<div class="tips">
				<img src="../../../assets/safetyCenter/explain.png" alt="">
				{{$t("security_page.107")}}
			</div>
			<el-button type="primary" class="confirmClose confirm" @click="type=1,buttonType=3,title=$t('security_page.172')">{{$t("security_page.108")}}</el-button>
			<div class="apiKeyBox">
				<p>{{$t("security_page.109")}}</p>
				<p>{{$t("security_page.110")}} (Access Key)： <span>{{accessKey}}</span></p>
				<p>{{$t("security_page.111")}}(Secret Key)： <span>{{secretKey}} {{$t("security_page.112")}}</span></p>
			</div>
			<el-button type="primary" class="confirmClose confirm" @click="type=1,buttonType=2,title=$t('security_page.113')">{{$t("security_page.105")}}</el-button>
		</div>
	</div>

</template>

<script>
import {mapState, mapMutations,mapActions} from 'vuex'
import {getSMSLogin,openingApi,getKey,closeApi} from '@/utils/api'
	export default {
	  	data () {
		    return {
		    	isBindPhone: true,
		    	computedTime: 0,
		    	code: '',
		    	google: '',
		    	password: '',
		    	type: 1,
		    	buttonType: 1,
		    	accessKey: '',
		    	secretKey: '',
		    	title:this.$t('security_page.114'),
		    }
	  	},
	  	computed: {
            ...mapState([
                'userinfoList'
            ]),
        },
	  	mounted: function () {
	  		if(this.userinfoList.isBindPhone){
				this.isBindPhone = true;
			}else{
				this.isBindPhone = false;
			}
			if(this.userinfoList.isBindApi){
				this.type = 2;
				this.showApi();
			}else{
				this.type = 1;
			}
		},
		// 操作成功弹框
	  	methods: {
	  		bindSuccess(num) {
		        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				    	this.type = num;
				    	this.code = '';
				    	this.google = '';
				    	this.password = '';
				    }
				});
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
			// 开启API
			async confirm(){
				if(!this.code){
					this.$message.error(this.$t('security_page.115'));
	          		return
				}
				if(!this.google){
					this.$message.error(this.$t('security_page.101')+'!');
	          		return
				}
				if(!this.password){
					this.$message.error(this.$t('security_page.103')+'!');
	          		return
				}
				let res = await openingApi(this.code,this.google,this.password);
	    		 if(!res){
			    	return
			    }
			    this.accessKey = res.result.accessKey;
			    this.secretKey = res.result.secretKey;
			    this.bindSuccess(2);
			    this.computedTime = 0;
			},
			// 展示API
			async showApi(){
				let res = await getKey();
	    		 if(!res){
			    	return
			    }
			    this.accessKey = res.result.accessKey;
			    this.secretKey = res.result.secretKey;
			},
			// 关闭API
			async apiClose(){
				if(!this.code){
					this.$message.error(this.$t('security_page.115'));
	          		return
				}
				if(!this.google){
					this.$message.error(this.$t('security_page.101')+'!');
	          		return
				}
				if(!this.password){
					this.$message.error(this.$t('security_page.103')+'!');
	          		return
				}
				let res = await closeApi(this.code,this.google,this.password);
	    		 if(!res){
			    	return
			    }
			    this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				    	this.$router.go(0);
				    }
				});
			}
	  	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../../style/mixin';
	.privateApi{
		width: 1200px;
		background-color: #fff;
		margin: 0 auto;
		padding: 30px 50px;
		margin-top: 30px;
		min-height: 500px;
		>.title{
			padding: 30px 0;
			overflow: hidden;
			p{
				float: left;
				font-size: 16px;
			}
			.line{
				float: right;
				@include wh(920px,1px);
				background-color: #EEEEEE;
				margin-top: 10px;
			}
		}
		.tips{
			@include wh(100%,auto);
			padding: 30px 20px;
			background-color: #F6F6F6;
			color: #848484;
			img{
				vertical-align: middle;
				margin-right: 10px;
			}
			span{
				color: #f2ba32;
			}
			
		}
		.api{
			width: 100%;
			.item{
				width: 600px;
				margin-top: 30px;
				span{
					display: inline-block;
					width: 110px;
				}
				.el-input{
					width: 320px;
				}
			}
		}
		.apiKeyBox{
			@include wh(100%,auto);
			padding: 30px 20px;
			background-color: #F6F6F6;
			margin-top: 40px;
			p{
				margin-bottom: 20px;
				span{
					color: #9b97e9;
				}
			}
			p:last-child{
				margin-bottom: 0;
			}
		}
		.confirm{
			margin-top: 30px;
			margin-left: 113px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
		.confirmClose{
			margin-left: 0;
		}
		.confirm:hover{
			background-color: #649BED;
   			border-color: #649BED;
		}
	}
</style>
