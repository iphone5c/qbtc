<template>
	<div class="currency">
		<div class="currencyinfo" v-for="data in currencyDatas">
			<div class="currencyinfo-top">
				<p class="title">{{data.coinName}}</p>
				<div class="delete"><i @click="delCurrency" :id="(data.userAccount.code)" class="el-icon-delete2"></i></div>
			</div>
			<div class="currencyinfo-bottom">
				<p>{{data.userAccount.extractCashAddress}}</p>
				<img src="../../../../assets/safetyCenter/ewm-icon.png" alt="">
			</div>
		</div>
		<div class="addcurrency" @click="openPopup">
			<img src="../../../../assets/safetyCenter/add.png" alt="">
			<p>{{$t("security_page.22")}}</p> 
		</div>
		<div class="currency-popup" v-if="isPopup"></div>
		<transition name="fold">
			<div class="popup" v-if="isPopup" :style="{height:popupHeight}">
				<div class="close"  @click="closePopup"><i class="el-icon-close"></i></div>
				<p class="title">{{$t("security_page.23")}}{{currencyName}}{{$t("security_page.a23")}}</p>
				<el-input :placeholder="($t('security_page.24'))" class="accountAddress" v-model="accountAddress"></el-input>
				<el-input placeholder="memo" class="remarks" v-model="memo" v-if="isGxs"></el-input>
				<el-input :placeholder="($t('security_page.25'))" class="remarks" v-model="remarks"></el-input>
				<el-input :placeholder="($t('security_page.26'))" class="password" type="password" v-model="password"></el-input>
				<el-input :placeholder="($t('security_page.7'))" class="verificationCode" v-model="code" :maxlength="6" v-if="isBindPhone">
					<el-button slot="append" class="sendCode" v-if="!computedTime" @click="SMSLogin">{{$t("security_page.167")}}</el-button>
					<el-button slot="append" v-if="computedTime" :disabled="true">{{computedTime}}{{$t("security_page.168")}}</el-button>
				</el-input>
				<el-input :placeholder="($t('security_page.8'))" class="verificationCode" v-model="code" :maxlength="6" v-if="!isBindPhone">
					<el-button slot="append" class="sendCode" v-if="!computedTime" @click="SMSLogin">{{$t("security_page.167")}}</el-button>
					<el-button slot="append" v-if="computedTime" :disabled="true">{{computedTime}}{{$t("security_page.168")}}</el-button>
				</el-input>
				<el-button class="confirm" type="primary" @click="currencyAdd">{{$t("security_page.27")}}</el-button>
			</div>
		</transition>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getCoinPaymentInfo,getSMSLogin,addVirtualCoinAccount,deleteUserAccount} from '@/utils/api'
	export default {
		data () {
		    return {
		    	isPopup:false,
		    	currencyDatas:[],
		    	accountAddress:'',
		    	remarks: '',
		    	password: '',
		    	computedTime: '',
		    	code: '',
		    	currencyId: '',
		    	isBindPhone: true,
		    	coinId: '',
		    	currencyName:'',
		    	popupHeight: 'auto',
		    	isGxs: false,
		    	memo: '',
		    }
		},
		computed: {
		    ...mapState([
		        'currencyInfoList','userinfoList'
		    ]),
	    },
	    watch: {
		  '$route' (to, from) {
		  //刷新参数放到这里里面去触发就可以刷新相同界面了
		    let fullPaths = this.getStatus(this.$route.path).split("/");
		    if(fullPaths[fullPaths.length-1]=='bank'||fullPaths[fullPaths.length-1]=='zfb')
		    	return;
			var currencyCode = fullPaths[fullPaths.length-1].split("_")[1]
			var currencyName = fullPaths[fullPaths.length-1].split("_")[0]
		    this.getCurrencyCode(currencyCode,currencyName);
		  }
		},
	    mounted: function () {
	    	this.fullscreenLoading = true;
	    	this.getCoinInfo();
	    	if(this.userinfoList.isBindPhone){
	  			this.isBindPhone = true;
	  		}else{
	  			this.isBindPhone = false;
	  		}
		},
		methods: {
			...mapMutations([
                'GET_CURRENCYLIST','SAVE_CURRENCYLIST'
            ]),
            getStatus (urlStr) {
			    var urlStrArr = urlStr.split('/')
			    return urlStrArr[urlStrArr.length - 1]
			},
			bindSuccess() {
		        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				  		this.getCoinInfo();
				  		done();
				    }
				});
			},
			// 获取虚拟币信息
			getCoinInfo(){
				var fullPaths = this.getStatus(this.$route.path).split("/");
			    if(fullPaths[fullPaths.length-1]=='bank'||fullPaths[fullPaths.length-1]=='zfb')
			    	return;
				var currencyCode = fullPaths[fullPaths.length-1].split("_")[1]
				var currencyName = fullPaths[fullPaths.length-1].split("_")[0]
		    	this.getCurrencyCode(currencyCode,currencyName);
			},
			// 打开弹窗
			openPopup(){
				this.isPopup = true;
				if(this.currencyName == "GXS" || this.currencyName == "TV" || this.currencyName == "BDS" || this.currencyName == "BDSCNY"){
					this.isGxs = true;
					this.popupHeight = "426px";
				}else{
					this.isGxs = false;
					this.popupHeight = "376px";
				}
			},
			// 关闭弹窗
			closePopup(){
				this.isPopup = false;
				this.accountAddress = '';
				this.memo = '';
				this.remarks = '';
				this.password = '';
				this.code = '';
				this.computedTime = 0;
				clearInterval(this.timer);
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
                        clearInterval(this.timer);
                    }
                }, 1000)
			},
            // 获取虚拟币列表
            async getCurrencyCode(currencyCode,currencyName){
            	this.currencyId = currencyCode;
            	this.currencyName = currencyName;
				let res = await getCoinPaymentInfo(currencyCode);
				if(!res){
					return
				}
	  			this.SAVE_CURRENCYLIST(res.result);
	  			this.currencyDatas = res.result;
	  		},
			// 添加虚拟币地址
	  		async currencyAdd(){
	  			if(!this.accountAddress){
	  				this.$message.error(this.$t('security_page.29'));
          			return
	  			}
	  			if(this.currencyName=="GXS" || this.currencyName=="TV" || this.currencyName=="BDS" || this.currencyName=="BDSCNY"){
	  				if(!this.memo){
		  				this.$message.error(this.$t('security_page.30'));
	          			return
		  			}
	  			}
	  			if(!this.password){
	  				this.$message.error(this.$t('security_page.31'));
          			return
	  			}
	  			if(!this.code){
	  				this.$message.error(this.$t('security_page.32'));
          			return
	  			}
	  			let res = await addVirtualCoinAccount(this.accountAddress,this.currencyId,this.remarks,this.code,this.password,this.memo);
	  			if(!res){
	  				return
	  			}
	  			this.bindSuccess();
	  			this.closePopup();
	  		},
	  		// 删除虚拟币地址
	  		delCurrency(e){
	  		 	let self = e.target
	  			this.coinId = self.getAttribute('id');
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
		                let res =await deleteUserAccount(this.coinId);
		                if(!res){
		                	return;
		                }
			    		this.getCoinInfo();
			    		this.$message.success(this.$t('security_page.33'));
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
 	.currency{
 		overflow: hidden;
 	}
 	.currencyinfo{
 		float: left;
 		@include wh(250px,150px);
		@include borderRadius(10px);
		margin: 0 10px;
		background-color: #4292EC;
		margin-bottom: 20px;
		color: #fff;
		.currencyinfo-top{
			padding: 10px 20px;
			border-bottom: 1px solid #fff;
			overflow: hidden;
			.title{
				float: left;
				font-size: 32px;
			}
			.delete{
				float: right;
				margin-top: 20px;
				cursor: pointer;
			}
		}
		.currencyinfo-bottom{
			padding: 0 20px;
			p{
				float: left;
				margin-top: 30px;
				width: 80%;
				white-space:normal;
				word-break:break-all;
			}
			img{
				float: right;
				margin-top: 30px;
			}
		}
 	}
	.addcurrency{
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
	.currency-popup{
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
		@include wh(530px,376px);
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
		.accountAddress{
			padding: 5px 0;
		}
		.remarks{
			margin-top: 20px;
		}
		.password{
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
