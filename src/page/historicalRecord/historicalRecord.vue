<template>
	<div>
		<my-header></my-header>
		<div class="record-wrapper">
			<div class="record-wrapper-head">
				<div class="wrapper-head">
					<div class="title">
						<span>{{$t("history_page.42")}}</span>
					</div>
					<ul class="nav">
						<li v-for="(navData,index) in navDatas" @click="navActives(index)" :class="{active:navActive==(index)}"><router-link  :to="navData.url"><span></span> {{navData.text}}</router-link></li>
					</ul>
				</div>
			</div>
			<div class="record-wrapper-body">
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
	export default {
	  	name: 'hello',
	  	data () {
		    return {
		    	navDatas:[],
		    	navActive:'0'
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
		            if(this.navDatas[item].url == this.$route.path){
		                this.navActive = item
		            }
		        }
		  	}
		},
	   	created: function () {
	   		this.$i18n.locale = this.language;
	    	this.navDatas=[
	    		{text:this.$t('history_page.10'),url:'/historicalRecord/recharge'},
	    		{text:this.$t('history_page.27'),url:'/historicalRecord/withdrawals'},
	    		{text:this.$t('history_page.17'),url:'/historicalRecord/trade'},
	    		{text:this.$t('history_page.1'),url:'/historicalRecord/entrust'}
	    	]
			for(let item in this.navDatas){
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
		  	}
	  	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../style/mixin';
 [v-cloak]{
			display: none !important;
		}

	.record-wrapper{
		width: 100%;
		min-width: 1200px;
	}
	.record-wrapper-head{
		@include wh(100%,110px);
		box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		-webkit-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		-moz-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		-o-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
		.wrapper-head{
			@include wh(1200px,110px);
			margin: 0 auto;
			overflow: hidden;
			.title{
				float: left;
				width: 100px;
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
						@include circular(6px,#5C96E9);
					}
					a{
						display: inline-block;
						padding: 45px 50px;
						color: #000;
						text-decoration: none;
					}
				}
			} 
			
		}
	}
	.record-wrapper-body{
		width: 100%;
		padding-bottom: 60px;
		min-height: 520px;
	}
	.active{
		a{
			color: #5C96E9 !important;
		}
		span{
			opacity:1 !important;
		}
	}
</style>
