<template>
	<div class="security">
		<div class="title">
			<p>{{$t("security_page.116")}}</p>
			<div class="line"></div>
		</div>
		<div class="protect">
			<p class="title">{{$t("security_page.117")}}</p>
			<div class="protect-body">
				<div class="mobilePhone">
					<p class="title">{{$t("security_page.118")}}</p>
					<p class="text" v-if="!bindPhone">
						{{$t("security_page.119")}}
					</p>
					<p class="text" v-if="bindPhone">
						{{$t("security_page.120")}}{{phone}}{{$t("security_page.a120")}}
					</p>
					<a class="modify" v-if="!bindPhone" @click="isBindPhonePopup = true">{{$t("security_page.121")}}</a>
					<a class="modify" v-if="bindPhone" @click="isPhonePopup = true">{{$t("security_page.122")}}</a>
				</div>
				<div class="google">
					<p class="title">{{$t("security_page.123")}}</p>
					<p class="text" v-if="!bindGoogle">
						{{$t("security_page.124")}}
					</p>
					<p class="text" v-if="bindGoogle">
						{{$t("security_page.125")}}
					</p>
					<a class="modify" v-if="!bindGoogle" @click="getGoole">{{$t("security_page.126")}}</a>
					<a class="modify" v-if="bindGoogle" @click="googleSee">{{$t("security_page.127")}}</a>
				</div>
			</div>
			<div class="userloginlog">
				<p class="title">{{$t("security_page.128")}}</p>
				<div class="record">
					<table>
						<thead>
							<tr>
								<td>{{$t("security_page.129")}}</td>
								<td>{{$t("security_page.130")}}</td>
								<td>{{$t("security_page.131")}}</td>
								<td>{{$t("security_page.132")}}</td>
							</tr>
						</thead>
						<tbody>
							<tr v-if="isRecord" v-for="data in dataList">
								<td>{{data.loginDate}}</td>
								<td>{{data.ip}}</td>
								<td>{{data.facilityName}}</td>
								<td>{{data.ipArea}}</td>

							</tr>
							<tr v-if="!isRecord">
								<td colspan="4" class="no-data-tips">{{$t("security_page.133")}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	<my-popup 
		:isGooglePopup="isGooglePopup" 
		@closeGooglePopup="closeGooglePopup"		
		:isBindPhonePopup="isBindPhonePopup" 
		@closeBindPhonePopup="closeBindPhonePopup"
		:isPhonePopup="isPhonePopup" 
		@closePhonePopup="closePhonePopup"
		@phoneBind="phoneBind"
		@phoneModify="phoneModify"
		@googleBind="googleBind"
		:isGoogle="isGoogle" 
		:popupHeight="popupHeight" 
		:googleInfo = "googleInfo"
		ref="fzj" 
		>
	</my-popup>
	</div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {bindPhone,modifyPhone,getGooleInfo,bindGoogle,seeGooleInfo,findUserLogin} from '@/utils/api'
	export default {
	  	data () {
		    return {
		    	bindPhone: false,
		    	bindGoogle: false,
		    	isGooglePopup: false,
		    	isBindPhonePopup: false,
		    	isPhonePopup: false,
		    	isGoogle: false,
		    	popupHeight: '',
		    	googleInfo:'',
		    	phone: '',
		    	isRecord: false,
		    	dataList: [],
		    }
	    },
	    components: {
	    },
	    computed:{
             ...mapState([
                'userinfoList'
            ]),
        },
        mounted: function () {
			this.bindGoogle= this.userinfoList.isBindGoogle;
			this.bindPhone = this.userinfoList.isBindPhone;
			this.phone = this.userinfoList.phone;
			this.loginInfo();
		},
	    methods: {
	    	...mapMutations([
                'RETSET_PHONE','BIND_GOOGLE','SECURITY_LEVEL'
            ]),
			closeGooglePopup (data) {
		        this.isGooglePopup = data
		    },
		    closePhonePopup (data) {
		        this.isPhonePopup = data
		    },
		    closeBindPhonePopup (data) {
		        this.isBindPhonePopup = data
		    },
		    bindSuccess() {
		        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				  		this.$router.go(0)
				    }
				});
			},
		    // 绑定手机
		    async phoneBind(data){
		    	let res = await bindPhone(data.accountPhone,data.phoneCode);
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
		    // 登录信息
		    async loginInfo(){
		    	let res = await findUserLogin(1,8);
		    	if(!res){
		    		return;
		    	}
		    	if(res.result.list.length != 0){
		    		this.isRecord = true;
		    	}
		    	this.dataList = res.result.list;
		    }
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../../style/mixin';
	.security{
		width: 1200px;
		background-color: #fff;
		margin: 0 auto;
		padding: 30px 50px;
		margin-top: 30px;
		.title{
			padding: 30px 0;
			overflow: hidden;
			p{
				float: left;
				font-size: 16px;
			}
			.line{
				float: right;
				@include wh(1000px,1px);
				background-color: #EEEEEE;
				margin-top: 10px;
			}
		}
	}
	.protect{
		.protect-body{
			overflow: hidden;
			div{
				float: left;
				@include wh(260px,230px);
				@include borderRadius(20px);
				border: 1px solid #98BDF1;
				.title{
					padding-left: 20px;
					border-bottom: 1px solid #D5D5D5;
				}
				.text{
					height: 110px;
					padding: 20px;
					color: #949494;
				}
				.modify{
					display: inline-block;
					width: 100%;
					text-align: center;
					color: #5c96e9;
					cursor: pointer;
				}
			}
			.google{
				margin-left: 100px;
			}
		}
	}
	.userloginlog{
		.record{
			background-color: #F6F6F6;
			padding: 0 60px;
			table{
				border-collapse:collapse;
				width: 100%;
				text-align: center;
				tr{
					height: 50px;
					td{
						width:25%;
					}
				}
				thead tr{
					height: 50px;
					border-bottom: 1px solid #D6D6D6;
				}
			}
		}
	}
	.no-data-tips{
		padding: 100px 0;
	}
</style>
