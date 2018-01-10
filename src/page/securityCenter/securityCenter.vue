<template>
	<div>
		<my-header></my-header>
		<div class="security-wrapper">
			<div class="security-wrapper-head">
				<div class="wrapper-head">
					<div class="title">
						<span>{{$t("security_page.159")}}</span>
					</div>
					<ul class="nav">
						<li v-for="(navData,index) in navDatas" @click="navActives(index)" :class="{active:navActive==(index)}"><router-link  :to="navData.url" ><span></span> {{navData.text}}</router-link></li>
					</ul>
				</div>
			</div>
			<div class="security-wrapper-body">
				<router-view></router-view>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import {mapState, mapMutations,mapActions} from 'vuex'
	import footer from '@/components/footer'
	import header from '@/components/header'
	import {virtualShowALL} from '@/utils/api'
	export default {
	  	name: 'hello',
	 	data () {
		    return {
		    	navDatas:[],
		    	navActive:'',
		    }
	    },
	    computed: {
            ...mapState([
                'language'
            ]),
        },
	    watch: {
		  	'$route' (to, from) {
			  	//刷新参数放到这里里面去触发就可以刷新相同界面了
			    for(let item in this.navDatas){
					if(this.$route.path.indexOf('/address')>=0){
						this.navActive = 3
						return
					}
		            if(this.navDatas[item].url == this.$route.path){
		                this.navActive = item
		            }
		        }
		  	}
		},
	    created: function () {
	    	this.$i18n.locale = this.language;
	    	this.navDatas=[
	    		{text:this.$t('security_page.160'),url:'/securityCenter/userinfo'},
	    		{text:this.$t('security_page.161'),url:'/securityCenter/password'},
	    		{text:this.$t('security_page.162'),url:'/securityCenter/security'},
	    		// {text:'地址管理',url:'/securityCenter/address/currency/'},
	    		{text:this.$t('security_page.163'),url:'/securityCenter/address/bank'},
	    		{text:this.$t('security_page.164'),url:'/securityCenter/authentication'},
	    		{text:this.$t('security_page.165'),url:'/securityCenter/privateApi'}
	    	]
	    	// this.getAccountList();
			for(let item in this.navDatas){
				if(this.$route.path.indexOf('/address')>=0){
					this.navActive = 3
					return
				}
	            if(this.navDatas[item].url == this.$route.path){
	                this.navActive = item
	            }
	        }
		},
	  	components: {
		    "my-footer":footer,
		    "my-header":header,
	  	},
	 	methods: {
		  	navActives:function(index){
		  		this.navActive = index
		  	},
		  	async getAccountList(){
		  		let res = await virtualShowALL();
		  		if(!res){
		  			return
		  		}
		  		this.navDatas[3].url = this.navDatas[3].url +res.result[0].shortName +'_'+ res.result[0].code;
		  	}
	 	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../style/mixin';
	.security-wrapper{
		width: 100%;
		min-width: 1200px;
	}
	.security-wrapper-head{
		@include wh(100%,110px);
		box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		-webkit-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		-moz-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		-o-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		background-color: #173E76;
		color: #fff;
		.wrapper-head{
			@include wh(1200px,110px);
			margin: 0 auto;
			overflow: hidden;
			.title{
				float: left;
				width: 120px;
				border-right: 1px solid #D4D4D4;
				margin: 45px 0;
				span{
					font-size: 18px;
				}
			}
			ul{
				overflow: hidden;
				li{
					float: left;
					cursor: pointer;
					span{
						@include circular(6px,#fff);
					}
					a{
						display: inline-block;
						padding: 45px 50px;
						color: #fff;
						text-decoration: none;
					}
				}
			} 
			
		}
	}
	.security-wrapper-body{
		width: 100%;
		padding-bottom: 60px;
	}
	.active{
		span{
			opacity:1 !important;
		}
	}
</style>
