<template>
	<div>
		<my-header></my-header>
		<div class="artcle-wrapper">
			<div class="wrapper-top">
				<div class="wrapper-top-head">
					<div class="title">
						<span>{{$t("news_page.1")}}</span>
					</div>
					<ul class="nav"> 
						<li v-for="(navData,index) in navDatas" @click="navActives(index)" :class="{active:navActive==(index)}">
							<router-link :to="navData.url"><span></span> {{navData.value}}</router-link>
						</li>
					</ul>
				</div>
				
			</div>
			<div class="wrapper-body">
				<router-view></router-view>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import Vuex from 'vuex'
import footer from '@/components/footer'
import header from '@/components/header'
import {mapState, mapMutations} from 'vuex'
import {isEmpty} from '@/utils/common'
export default {
	name: 'hello',
	data() {
		return {
			checked: true,
			navDatas:[],
			navActive:'0'
		}
	},
	computed: {
        ...mapState([
            'language','newsCode'
        ]),
    },
	watch: {
	  	'$route' (to, from) {
		  	//刷新参数放到这里里面去触发就可以刷新相同界面了
		    for(let item in this.navDatas){
	            if(this.navDatas[item].url == this.$route.path){
	                this.navActive = item
	                return
	            }
	        }
	  	}
	},
	created: function () {
		this.$i18n.locale = this.language;
    	this.navDatas=[
    		{value:this.$t('news_page.2'),url:'/news/notice'},
			{value:this.$t('news_page.3'),url:'/news/coinIntroduce'},
			{value:this.$t('news_page.4'),url:'/news/info'},
    	]
		for(let item in this.navDatas){
            if(this.navDatas[item].url == this.$route.path){
                this.navActive = item
                return
            }
        }
        if(!isEmpty(this.newsCode)){
        	this.navActive = this.newsCode;
        }
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	methods: {
	  	navActives:function(index){
	  		this.navActive = index
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
	.active{
		a{
			color: #5C96E9 !important;
		}
		span{
			opacity:1 !important;
		}
	}
	.artcle-wrapper{
		width: 100%;
		margin: 0 auto;
		.wrapper-top{
			width: 100%;
			box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
			-webkit-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
			-moz-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
			-o-box-shadow: 0 4px 10px 0 rgba(0,0,0,.1);
			.wrapper-top-head{
				text-align: center;
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
		 
	}
	.wrapper-body{
		width: 1200px;
		min-height: 560px;
		margin-bottom: 20px;
		margin: 0 auto;
		padding-top: 50px;
	}
</style>
