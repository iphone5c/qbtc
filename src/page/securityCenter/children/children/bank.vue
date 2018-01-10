<template>
	<div class="bank">
		<div class="bankinfo" v-for="data in bankData" ref='del'>
			<div class="bankinfo-top">
				<img src="../../../../assets/safetyCenter/bank-icon.png" alt="">
				<p class="bank-name">{{data.bankName}}</p>
				<p class="bank-num">{{data.bankCardCode}}</p>
				<div class="delete"><i @click="delBank" :id="(data.code)" class="el-icon-delete2"></i></div>
			</div>
			<div class="bankinfo-bottom">
				<p>{{data.address}}</p>
			</div>
		</div>
		<div class="addbank" @click="getOpenBank">
			<img src="../../../../assets/safetyCenter/add.png" alt="">
			<p>{{$t("security_page.1")}}<br/>{{$t("security_page.2")}}</p>
		</div>
		<div class="bank-popup" v-if="isPopup"></div>
		<transition name="fold">
			<div class="popup" v-if="isPopup">
				<div class="close"  @click="closePopup"><i class="el-icon-close"></i></div>
				<p class="title">{{$t("security_page.1")}}</p>
				<el-input :disabled="true" class="accountName" v-model="accountName"></el-input>
				<span class="tips">{{$t("security_page.3")}}</span>
				<div>
					<el-select  :placeholder="($t('security_page.4'))" class="accountBank" v-model="accountBank" :no-data-text="($t('security_page.166'))">
					    <el-option v-for="(item,index) in openBankData" :key="item.value" :value="(item.value)">
					    	{{item.name}}
					    </el-option>
					</el-select>
				</div>
				<div class="cascader">
					<my-cascader @getProv="getProv" @getCity="getCity"></my-cascader>
					<el-input class="branerBank" :placeholder="($t('security_page.5'))" v-model="bankBranch"></el-input>
				</div>
				<el-input :placeholder="($t('security_page.6'))" class="accountNum" v-model="bankNum"></el-input>
				<el-input :placeholder="($t('security_page.7'))" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
					<el-button slot="append" class="sendCode" v-if="!computedTime" @click="SMSLogin">{{$t("security_page.167")}}</el-button>
					<el-button slot="append" v-if="computedTime" :disabled="true">{{computedTime}}{{$t("security_page.168")}}</el-button>
				</el-input>
				<el-input :placeholder="($t('security_page.8'))" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
					<el-button slot="append" class="sendCode" v-if="!computedTime" @click="SMSLogin">{{$t("security_page.167")}}</el-button>
					<el-button slot="append" v-if="computedTime" :disabled="true">{{computedTime}}{{$t("security_page.168")}}</el-button>
				</el-input>
				<el-button class="confirm" type="primary" @click="bankAdd">{{$t("security_page.9")}}</el-button>
			</div>
		</transition>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import cascader from '@/components/cascader'
import {getPaymentInfo,getBankList,getSMSLogin,addBankCardAccount,deleteUserAccount} from '@/utils/api'
	export default {
		data () {
		    return {
		    	isPopup:false,
		    	bankData:[],
		    	accountName:'',
		    	openBankData: '',
		    	accountBank: '',
		    	prov:'',
		    	city:'',
		    	bankBranch:'',
		    	bankNum:'',
		    	phoneCode:'',
		    	computedTime: 0,
		    	isBindPhone: true,
		    	code:'',
		    	bankId: '',
		    }
		},
	    components: {
	    	"my-cascader":cascader
	  	},
	  	computed:{
            ...mapState([
                'userinfoList'
            ]),
        },
	  	created(){
	  		this.accountName = this.userinfoList.realName;
	  		if(this.userinfoList.isBindPhone){
	  			this.isBindPhone = true;
	  		}else{
	  			this.isBindPhone = false;
	  		}
	  		this.getBankCard();
	    },
	  	methods: {
	  		bindSuccess() {
		        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				  		this.getBankCard();
				    }
				});
			},
			// 关闭弹窗
			closePopup(){
				this.isPopup = false;
				this.accountBank = '';
				this.prov = '';
				this.city = '';
				this.bankBranch = '';
				this.bankNum = '';
				this.code = '';
				this.computedTime = 0;
				clearInterval(this.timer);
			},
	  		// 获取列表
	  		async getBankCard(){
	  			let res = await getPaymentInfo("1");
	  			if(!res){
	  				return
	  			}  
	  			this.bankData = res.result;
	  		},
	  		// 获取开户银行
	  		async getOpenBank(){
	  			this.isPopup = true;
	  			let res = await getBankList();
	  			if(!res){
	  				return
	  			}
	  			this.openBankData = res.result;
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
	  		// 添加银行
	  		async bankAdd(){
	  			if(!this.accountName){	
	  				this.$message.error(this.$t('security_page.11'));
          			return
	  			}
	  			if(!this.accountBank){
	  				this.$message.error(this.$t('security_page.12'));
          			return
	  			}
	  			if(!this.prov){
	  				this.$message.error(this.$t('security_page.13'));
          			return
	  			}
	  			if(!this.city){
	  				this.$message.error(this.$t('security_page.14'));
          			return
	  			}
	  			if(!this.bankBranch){
	  				this.$message.error(this.$t('security_page.15'));
          			return
	  			}
	  			if(!this.bankNum){
	  				this.$message.error(this.$t('security_page.16'));
          			return
	  			}
	  			if(!this.code){
	  				this.$message.error(this.$t('security_page.17'));
          			return
	  			}
	  			let res = await addBankCardAccount(this.accountBank,this.bankNum,this.prov,this.city,this.bankBranch,this.code);
	  			if(!res){
	  				return
	  			}
	  			this.bindSuccess();
	  			this.closePopup();
	  		},
	  		// 删除银行
	  		delBank(e){
	  		 	let self = e.target
	  			this.bankId = self.getAttribute('id');
	  			const h = this.$createElement;
	  			this.$msgbox({
		        	title: this.$t('security_page.169'),
		        	message: h('p', null, [
		            	h('span', null, this.$t('security_page.18')),
		            ]),
		          	showCancelButton: true,
		          	confirmButtonText: this.$t('security_page.19'),
		          	cancelButtonText: this.$t('security_page.20'),
		          	beforeClose: async(action, instance, done) => {
		            if (action === 'confirm') {
		                let res =await deleteUserAccount(this.bankId);
		                this.getBankCard();
			    		this.$message.success(this.$t('security_page.21'));
			    		done();
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
 	.bank{
 		overflow: hidden;
 	}
 	.bankinfo{
 		float: left;
 		@include wh(264px,150px);
		@include borderRadius(10px);
		margin: 0 5px;
		background-color: #4292EC;
		margin-bottom: 20px;
		color: #fff;
		.bankinfo-top{
			padding: 10px 20px;
			border-bottom: 1px solid #fff;
			overflow: hidden;
			img{
				float: left;
				margin-top: 3px;
			}
			p{
				width: 60%;
				float: left;
				margin-left: 10px;
				margin-top: 3px;
			}
			.delete{
				float: right;
				cursor: pointer;
			}
		}
		.bankinfo-bottom{
			padding: 0 20px;
			p{
				margin-top: 10px;
			}
			p:last-child{
				margin-top: 5px;
			}
		}
 	}
	.addbank{
		float: left;
		@include wh(264px,150px);
		@include borderRadius(10px);
		text-align: center;
		border: 1px dashed #D5D5D5;
		cursor: pointer;
		margin: 0 5px;
		margin-bottom: 20px;
		img{
			margin-top: 36px;
		}
		p{
			margin-top: 10px;
		}
	}
	.bank-popup{
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
		@include wh(530px,450px);
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		-moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
		.accountBank{
			width: 100%;
			padding: 20px 0;
		}
		.cascader{
			position: relative;
			overflow: hidden;
			>div{
				float: left;
			}
			.branerBank{
				width: 123px;
				margin-left: 3px;
			}
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
