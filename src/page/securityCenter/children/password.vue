<template>
	<div class="password">
		<div class="title">
			<p>{{$t("security_page.89")}}</p>
			<div class="line"></div>
		</div>
		<div class="loginPassword">
			<p class="title">
				{{$t("security_page.90")}}
			</p>
			<div class="tips">
				<p>{{$t("security_page.91")}}</p>
				<p></p>
			</div>
			<div class="modify" @click="isLoginPasswordPopup = true;popupHeight = '390px'">{{$t("security_page.92")}}</div>
		</div>
		<div class="tradePassword">
			<p class="title">
				{{$t("security_page.93")}}
			</p>
			<div class="tips">
				<p>{{$t("security_page.91")}}</p>
				<p></p>
			</div>
			<div class="modify" v-if="!isSetup">
				<span></span>
				<span @click="SetDealPaw">{{$t("security_page.94")}}</span>
			</div>
			<div class="modify" v-if="isSetup">
				<!-- <span>忘记交易密码</span> -->
				<span @click="modifyPaw">{{$t("security_page.92")}}</span>
			</div>
		</div>
		<my-popup 
			:isBindTraderpassword="isBindTraderpassword" 
			@closeBindTraderpassword="closeBindTraderpassword"
			:isPasswordPopup="isPasswordPopup" 
			@closePasswordPopup="closePasswordPopup"
			:isLoginPasswordPopup="isLoginPasswordPopup" 
			@closeLoginPasswordPopup="closeLoginPasswordPopup"
			@loginPawModify="loginPawModify"
			@dealPawModify="dealPawModify"
			@dealPawBind="dealPawBind"
			:titlePopup="titlePopup" 
			:popupHeight="popupHeight" 
			>
		</my-popup>
	</div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {modifyLoginPaw,modifyDealPaw,bindDealPaw} from '@/utils/api'
	export default {
	  data () {
	    return {
	    	isSetup: false,
	    	isPasswordPopup: false,
	    	isLoginPasswordPopup: false,
	    	isBindTraderpassword: false,
	    	titlePopup: '',
	    	bindGoogle: false,
	    	popupHeight: '',
	    }
	  },
	  components: {
	  },
	  mounted: function () {
			 this.bindGoogle= this.userinfoList.isBindGoogle;
			 this.isSetup = this.userinfoList.isSetDealCode;
		},
	  computed:{
             ...mapState([
                'userinfoList'
            ]),
        },
	  methods: {
	  	...mapMutations([
            'BIND_DEALPAW','SECURITY_LEVEL'
        ]),
		closePasswordPopup (data) {
	        this.isPasswordPopup = data
	    },
	    closeLoginPasswordPopup (data) {
	        this.isLoginPasswordPopup = data
	    },
	    closeBindTraderpassword (data) {
	        this.isBindTraderpassword = data
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
		bindSuccess() {
	        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
				confirmButtonText: this.$t('security_page.170'),
			    callback: action => {
			  		// this.$router.go(0)
			    }
			});
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
		// 修改登录密码
	    async loginPawModify(data){
	    	let res = await modifyLoginPaw(data.oldPassword,data.newPassword,data.code);
	    	if(!res){
	    		return
	    	}
	    	this.bindSuccess();
	    	this.closePasswordPopup();
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
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../../style/mixin';
	.password{
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
				float: left;
				@include wh(1000px,1px);
				background-color: #EEEEEE;
				margin-top: 10px;
				margin-left: 30px;
			}
		}
	}
	.loginPassword{
		overflow: hidden;
		.title{
			float: left;
		}
		.tips{
			float: left;
			width: 60%;
			margin-left: 30px;
			color: #9f9f9f;
			p:last-child{
				margin-top: 10px;
			}
		}
		.modify{
			float: right;
			color: #5c96e9;
			cursor: pointer;
		}
	}
	.tradePassword{
		margin-top: 50px;
		padding-top: 30px;
		border-top: 1px dashed #E5E5E5;  
		overflow: hidden;
		.title{
			float: left;
		}
		.tips{
			float: left;
			width: 60%;
			margin-left: 30px;
			color: #9f9f9f;
			p:last-child{
				margin-top: 10px;
			}
		}
		.modify{
			float: right;
			width: 15%;
			color: #5c96e9;			
			span:first-child{
				float: left;
				cursor: pointer;
			}
			span:last-child{
				float: right;
				cursor: pointer;
			}
		}
	}
</style>
