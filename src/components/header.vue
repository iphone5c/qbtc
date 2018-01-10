<template>
	<div>
		<header>
			<div class="logo">
				<router-link to="/"><img src="../assets/common/logo.png" alt=""></router-link>
			</div>
			<nav>
				<ul>
					<router-link to="/trade"><li>{{$t("header_page.1")}}</li></router-link>
					<router-link to="/finance"><li>{{$t("header_page.2")}}</li></router-link>
					<router-link to="/activity" class="hot"><li>{{$t("header_page.3")}} <img src="../assets/common/hot.png" alt=""></li></router-link>
					<li @mouseenter="isNavShow = false" @mouseleave="isNavShow = true">
						{{$t("header_page.13")}} <i class="el-icon-caret-bottom"></i>
						<transition name="fold">
							<div class="more" v-if="!isNavShow">
								<ul>
									<li v-for="(navData,index) in navDatas" @mouseenter="navActives(index)" @mouseleave="navActive = null" :class="{active:navActive==(index)}"><router-link  :to="navData.url" ><span></span> {{navData.text}}</router-link></li>
								</ul>
							</div>
						</transition>
					</li>
				</ul>
			</nav>
			<div class="header-right">
				<div class="login" v-if="isLogin != 'true'">
					<router-link to="/login"><span>{{$t("header_page.14")}}</span></router-link>
					<span>|</span>
					<router-link to="/register"><span>{{$t("header_page.15")}}</span></router-link>
				</div>
				<div class="login-after login" v-if="isLogin == 'true'">
					<span>UID：{{UID}}</span>
					<span>|</span>
					<span @click="loginOut">{{$t("header_page.4")}}</span>
				</div>
				<div class="language">
					<el-dropdown>
					  	<el-button type="primary">
					    	{{languages}}<i class="el-icon-caret-bottom el-icon--right"></i>
					  	</el-button>
					  	<el-dropdown-menu slot="dropdown">
					    	<el-dropdown-item @click.native="switchEn">English</el-dropdown-item>
					    	<el-dropdown-item @click.native="switchZh">中文</el-dropdown-item>
					  	</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			
		</header>
	</div>
</template>

<script>
import Vuex from 'vuex'
import {mapState, mapMutations,mapActions} from 'vuex'
import store from '@/store/index'
import {loginOut,sendLanguage} from '@/utils/api'
import {removeStore,getStore,isEmpty} from '@/utils/common'
import {SAVE_LOGINSTATUS,SAVE_USERINFO} from '@/store/mutation-types.js'
	export default {
	    name: 'hello',
	    data () {
		    return {
		    	navDatas:[],
		    	navActive:null,
		    	isLogin: '',
		    	isNavShow: true,
		    	account: '',
		    	UID:'',
		    	languages: '中文'

		    }
		},
		computed: {
            ...mapState([
                'loginStatus','userinfoList','language'
            ]),
        },
        mounted: function () {
        	let login = getStore("loginStatus");
		    this.isLogin = login; 
		    if(!isEmpty(login)){
			    this.loginName();
			    this.getUser();
		    }
		    if(!isEmpty(this.language)){
			    this.$i18n.locale = this.language;
			    this.navDatas=[
		    		{text:this.$t('header_page.6'),url:'/news/notice'},
		    		{text:this.$t('header_page.7'),url:'/historicalRecord/recharge'},
		    		{text:this.$t('header_page.8'),url:'/securityCenter/userinfo'},
		    		{text:this.$t('header_page.9'),url:'/about'},
		    		{text:this.$t('header_page.10'),url:'/contact'},
		    		{text:this.$t('header_page.11'),url:'/help'},
		    	]
			    if(this.language == 'en'){
			    	this.languages = 'English';
			    }else{
			    	this.languages = '中文';
			    }
		    }else{
		    	this.SWITCH_LANGUAGE('zh');
		    	this.$i18n.locale = 'zh';
		    	this.navDatas=[
		    		{text:this.$t('header_page.6'),url:'/news/notice'},
		    		{text:this.$t('header_page.7'),url:'/historicalRecord/recharge'},
		    		{text:this.$t('header_page.8'),url:'/securityCenter/userinfo'},
		    		{text:this.$t('header_page.9'),url:'/about'},
		    		{text:this.$t('header_page.10'),url:'/contact'},
		    		{text:this.$t('header_page.11'),url:'/help'},
		    	]
		    }
		},
	    methods: {
	    	 ...mapActions([
                'getUser'
            ]),
	    	 ...mapMutations([
	            'SWITCH_LANGUAGE'
	        ]),
	    	 navActives:function(index){
		  		this.navActive = index
		  	},

	    	loginName(){	    		
				if(this.userinfoList.isBindPhone){
			    	this.account = this.userinfoList.phone;
			    }else{
			    	this.account = this.userinfoList.email;
			    }	
			    this.UID = this.userinfoList.code;
	    	},
	    	loginOut(){
	    		const h = this.$createElement;
		        this.$msgbox({
		        	title: this.$t('header_page.16'),
		        	message: h('p', null, [
		            	h('span', null, this.$t('header_page.12')),
		            ]),
		          	showCancelButton: true,
		          	confirmButtonText: this.$t('header_page.17'),
		          	cancelButtonText: this.$t('header_page.18'),
		         	beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		                instance.confirmButtonLoading = true;
		                removeStore("loginStatus");
		                removeStore("userinfoList");
			    		store.commit(SAVE_LOGINSTATUS, removeStore("loginStatus"));
			    		store.commit(SAVE_USERINFO, removeStore("userinfoList"));
			    		this.isLogin = '';
			    		this.$router.push({path: '/'});
			    		this.$router.go(0)
			    		done();
		            }else{
				      	done();
				    }
		          }
		        })
	    	},
	    	async switchEn(){
	    		if(this.language != 'en'){
	    			this.$i18n.locale = 'en';
		    		this.languages = 'English';
		    		this.SWITCH_LANGUAGE('en');
		    		let res = await sendLanguage('en');
		    		if(!res){
		    			return
		    		}
		    		this.$router.go(0)
	    		}
	    	},
	    	async switchZh(){
	    		if(this.language != 'zh'){
		    		this.$i18n.locale = 'zh';
		    		this.languages = '中文';
		    		this.SWITCH_LANGUAGE('zh');
		    		let res = await sendLanguage('zh');
		    		if(!res){
		    			return
		    		}
		    		this.$router.go(0)
		    	}
	    	}
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import './../style/mixin';
	header{
		@include wh(100%, 120px);
		background-color:#06244F;
		padding: 0 100px;
		min-width:1200px;
		line-height:120px;
		a{
			color: #fff;
			text-decoration: none;
		}
	}
	header .logo{
		float: left;
		cursor: pointer;
	}
	header .logo img{
		vertical-align: middle;
	}
	nav{
		float: left;
		ul li{
			position: relative;
			float: left;
			color: #fff;
			width: 100px;
			text-align: center;
			cursor: pointer;
		}
		.hot{
			img{
				// width: 22px;
				position: absolute;
				top: 40px;
				right: 0px;
			}
		}
	}
	.more{
		position: absolute;
		padding: 20px 0;
		top: 90px;
		z-index: 9999;
		opacity: 0;
		@include wh(150px,auto);
		background-color: #fff;
		@include borderRadius(10px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    	-moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    	-webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		ul li{
			width: 100%;
			line-height: 40px;
			color: #072450;
			text-align: left;
			span{
				margin-left: 20px;
				@include circular(6px,#fff);
			}
			a{
				display: inline-block;
				@include wh(100%,100%);
				line-height: 40px;
				color: #072450;
			}
		}
	}
	.header-right{
		float: right;
		color: #fff;
		.login{
			float: left;
			span{
				cursor: pointer;
			}
		}
		.language{
			float: left;
			margin-left: 30px;
			line-height: 0;
			margin-top: 40px;
			.el-button--primary{
				padding: 10px 17px;
				min-width: 101px;
			}
			.el-button--primary:hover{
	
			}
			.el-icon-arrow-down{
				margin-left: 10px;
			}
			.el-dropdown-menu__item{
				text-align:center;
			}
		}
	}
	.active{
		span{
			opacity:1 !important;
		}
		a{
			color: #fff !important;
		}
		background-color:#466697;
	}
	header .el-button--primary{
		background:none;
		border-color: #fff;
	}
	.more{
	    transform: translate3d(0, -10px, 0);
	    opacity: 1;
	}
	.fold-enter-active, .fold-leave-active {
	    transition: all .5s;
	}
	.fold-enter, .fold-leave-active {
	    transform: translate3d(0, 0, 0);
	    opacity: 0;
	}
</style>
