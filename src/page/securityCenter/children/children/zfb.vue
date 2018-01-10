<template>
	<div class="zfb">
		<div class="zfbinfo" v-for="data in zfbData">
			<div class="zfbinfo-top">
				<img src="../../../../assets/safetyCenter/zfb-icon.png" alt="">
				<p class="zfb-name">{{data.zfbName}}</p>
				<div class="delete"><i @click="delzfb" :id="(data.code)" class="el-icon-delete2"></i></div>
			</div>
			<div class="zfbinfo-bottom">
				<p>支付宝账号</p>
				<p>{{data.zfbAccountCode}}</p>
			</div>
		</div>
		<div class="addzfb" @click="isPopup = true">
			<img src="../../../../assets/safetyCenter/add.png" alt="">
			<p>添加支付宝</p>
		</div>
		<div class="zfb-popup" v-if="isPopup"></div>
		<transition name="fold">
			<div class="popup" v-if="isPopup">
				<div class="close"  @click="isPopup = false"><i class="el-icon-close"></i></div>
				<p class="title">添加支付宝</p>
				<el-input class="accountName" placeholder="请输入支付宝开户人" v-model="accountName"></el-input>
				<span class="tips">*支付宝姓名必须与您的实名认证姓名一致</span>
				<el-input placeholder="支付宝账号" class="accountNum" v-model="accountNum"></el-input>
				<el-input placeholder="短信验证码" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
					<el-button slot="append" class="sendCode" v-if="!computedTime" @click="SMSLogin">获取验证码</el-button>
					<el-button slot="append" v-if="computedTime" :disabled="true">{{computedTime}}秒后可重发</el-button>
				</el-input>
				<el-input placeholder="邮箱验证码" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
					<el-button slot="append" class="sendCode" v-if="!computedTime" @click="SMSLogin">获取验证码</el-button>
					<el-button slot="append" v-if="computedTime" :disabled="true">{{computedTime}}秒后可重发</el-button>
				</el-input>
				<el-button class="confirm" type="primary" @click="zfbAdd">确认提交</el-button>
			</div>
		</transition>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getPaymentInfo,getSMSLogin,addAlipayAccount,deleteUserAccount} from '@/utils/api'
	export default {
	  	data () {
		    return {
		    	zfbData:[],
		    	isPopup:false,
		    	isBindPhone:true,
		    	code:'',
		    	computedTime: 0,
		    	accountName:'',
		    	accountNum:'',
		    	zfbId:'',
		    }
		},
	  	computed:{
            ...mapState([
                'userinfoList'
            ]),
        },
        created(){
	  		if(this.userinfoList.isBindPhone){
	  			this.isBindPhone = true;
	  		}else{
	  			this.isBindPhone = false;
	  		}
	  		this.getZfbCard();
	    },
	  	methods: {
	  		bindSuccess() {
		        this.$alert('操作成功！', '提示', {
					confirmButtonText: '确定',
				    callback: action => {
				  		this.$router.go(0)
				    }
				});
			},
	  		// 获取列表
	  		async getZfbCard(){
	  			let res = await getPaymentInfo("2");
	  			if(!res){
	  				return
	  			}  
	  			this.zfbData = res.result;
	  		},
	  		// 发送验证码(手机/邮箱 登陆之后)
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
	  		getCity(data){
	  			this.city = data;
	  		},
	  		getProv(data){
	  			this.prov = data;
	  		},
	  		// 添加支付宝
	  		async zfbAdd(){
	  			if(!this.accountName){
	  				this.$message.error('请输入支付宝开户名！');
          			return
	  			}
	  			if(!this.accountNum){
	  				this.$message.error('请输入支付宝账号！');
          			return
	  			}
	  			if(!this.code){
	  				this.$message.error('请输入验证码！');
          			return
	  			}
	  			let res = await addAlipayAccount(this.accountName,this.accountNum,this.code);
	  			if(!res){
	  				return
	  			}
	  			this.bindSuccess();
	  			this.isPopup = false;
	  		},
	  		// 删除支付宝
	  		delzfb(e){
	  		 	let self = e.target
	  			this.zfbId = self.getAttribute('id');
	  			const h = this.$createElement;
	  			this.$msgbox({
		        	title: '提示',
		        	message: h('p', null, [
		            	h('span', null, '确认删除吗？'),
		            ]),
		          	showCancelButton: true,
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		                let res = deleteUserAccount(this.zfbId);
			    		this.$router.go(0);
		            }else{
				      	done();
				    }
		          }
		        })
	  		}
	  	}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
 @import '../../../../style/mixin';
 	.zfb{
 		overflow: hidden;
 	}
 	.zfbinfo{
 		float: left;
 		@include wh(250px,150px);
		@include borderRadius(10px);
		margin: 0 10px;
		background-color: #4292EC;
		margin-bottom: 20px;
		color: #fff;
		.zfbinfo-top{
			padding: 10px 20px;
			border-bottom: 1px solid #fff;
			overflow: hidden;
			img{
				float: left;
			}
			p{
				width: 55%;
				float: left;
				margin-left: 10px;
				margin-top: 20px;
			}
			.delete{
				float: right;
				margin-top: 20px;
				cursor: pointer;
			}
		}
		.zfbinfo-bottom{
			padding: 0 20px;
			p{
				margin-top: 20px;
			}
			p:last-child{
				margin-top: 5px;
			}
		}
 	}
	.addzfb{
		float: left;
		@include wh(250px,150px);
		@include borderRadius(10px);
		text-align: center;
		border: 1px dashed #D5D5D5;
		cursor: pointer;
		margin: 0 10px;
		margin-bottom: 20px;
		img{
			margin-top: 36px;
		}
		p{
			margin-top: 10px;
		}
	}	
	.zfb-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
	}
	.popup{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(530px,350px);
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
		.accountName{
			padding: 5px 0;
		}
		.tips{
			font-size: 12px;
			color: #bdbdbd;
		}
		.accountNum{
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
