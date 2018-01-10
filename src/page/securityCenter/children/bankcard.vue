<template>
	<div class="security">
		<div class="title">
			<p>{{$t("security_page.87")}}</p>
			<div class="line"></div>
		</div>
		<div class="collection-address">
			<div class="address-top" v-loading="fullscreenLoading" element-loading-text="拼命加载中...">
				<ul>
					<li v-for="(data,index) in currencyData" @click="currencyActive(index)" :class="{active:currencyActives==(index)}">
						<router-link  :to="{name: data.url, params: { id: data.urlName }}" :id="(data.code)">{{data.name}}</router-link>
					</li>
				</ul>
			</div>
			<div class="address-body">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {virtualShowALL,getCoinPaymentInfo} from '@/utils/api'
	export default {
		data () {
		    return {
		    	fullscreenLoading: false, // loading
		    	currencyData:[],
		    	currencyActives:'',
		    }
		},
	    mounted(){
	    	this.fullscreenLoading = true;
	    	this.getAccountList();
	    	 for(let item in this.currencyData){
		        if(this.currencyData[item].url == this.$route.path){
		            this.currencyActives = item
		        }
		    }
	    },
		methods: {
		  	currencyActive(index){
		  		this.currencyActives = index;
		  	},
		  	// 获取银行卡地址列表
		  	async getAccountList(){
		  		let res = await virtualShowALL();
		  		if(!res){
		  			return
		  		}
		  		// this.currencyData.push({name:'银行卡管理',urlName:'bank',code:'',url:'bank',navUrl:'/securityCenter/bankcard/bank'},{name:'支付宝管理',urlName:'alipay',code:'',url:'zfb',navUrl:'/securityCenter/bankcard/zfb'});
		  		this.currencyData.push({name:this.$t('security_page.88'),urlName:'bank',code:'',url:'bank',navUrl:'/securityCenter/bankcard/bank'});
		  		for(let i=0;i<res.result.length;i++){
		  			this.currencyData.push({name:res.result[i].shortName,urlName:res.result[i].shortName+'_'+res.result[i].code,code:res.result[i].code,url:'coin',navUrl:'/securityCenter/address/currency/'+res.result[i].shortName+'_'+res.result[i].code});
		  		}
		  		this.fullscreenLoading = false;
				for(let item in this.currencyData){
			        if(this.currencyData[item].navUrl == this.$route.path){
			            this.currencyActives = item
			        }
			    }
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
		min-height: 460px;
		.title{
			padding: 30px 0;
			overflow: hidden;
			p{
				float: left;
				font-size: 16px;
			}
			.line{
				float: left;
				@include wh(980px,1px);
				background-color: #EEEEEE;
				margin-top: 10px;
				margin-left: 30px;
			}
		}
	}
	.collection-address{
		.address-top{
			min-height: 200px;
			ul{
				border-bottom: 1px dashed #DCDCDC;
				margin-bottom: 30px;
				padding-bottom: 30px;
				overflow: hidden;
				li{
					float: left;
					@include wh(107.5px,36px);
					@include jz(center,36px);
					@include borderRadius(2px);
					margin: 0 15px; 
					background-color: #FEFEFE;
					border: 1px solid #D5D5D5;
					margin-bottom: 20px;
					cursor: pointer;
					a{
						display: inline-block;
						@include wh(100%,100%);
						color: #000;
						text-decoration: none;
					}
				}
			}
		}
	}
	.active{
		background-color: #5C96E9 !important;
		border-color: #5C96E9 !important;
		a{
			color: #fff !important;
		}
	}
</style>
