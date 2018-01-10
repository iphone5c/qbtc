<template>
	<div class="body">
		<my-header></my-header>
		<div class="banner">
			<div class="block">
			    <el-carousel trigger="click" height="580px" :interval="6000">
				    <el-carousel-item>
				      	<router-link to="/trade">
				        	<img src="../assets/index/banner10.png" alt="" @click="mgoMarket">
				        </router-link>
			     	</el-carousel-item>
				    <el-carousel-item>
				      	<router-link to="/trade">
				        	<img src="../assets/index/banner9.png" alt="" @click="topcMarket">
				        </router-link>
			     	</el-carousel-item>
				    <el-carousel-item>
				      	<router-link to="/trade">
				        	<img src="../assets/index/banner7.png" alt="" @click="gcsMarket">
				        </router-link>
			     	</el-carousel-item>
			     	<el-carousel-item>
				      	<router-link :to="{name: 'article', params: { id: 'b9d440a5a5c64113a7b916fc5125bb72' }}">
				        	<img src="../assets/index/banner8.png" alt="" @click="nulsMarket">
				        </router-link>
			     	</el-carousel-item>
				    <el-carousel-item>
				      	<router-link :to="{name: 'article', params: { id: '4473bb1e9e824642a1ba179fe76e861c' }}">
				        	<img src="../assets/index/banner6.jpg" alt="" @click="wjMarket">
				        </router-link>
			     	</el-carousel-item>
			    </el-carousel>
			</div>
			<div class="candy">
				<router-link to="/activity"><img src="../assets/index/candy.gif" alt=""></router-link>
			</div>
			<div class="notice" v-for="data in detailsData"> 
				<div class="title">{{$t("index_page.1")}}</div>
				<span class="details">{{data.content}}</span>
				<router-link :to="{name: 'article', params: { id: data.code }}"><span @click="moreCode()">{{$t("index_page.28")}}</span></router-link>
			</div>
		</div>
		<div class="tradeCoin"  v-loading="fullscreenLoading || webSocketLoading" element-loading-text="Loading...">
			<div class="market">
				<ul>
					<li v-for="(data,index) in navTitleData" @click="switchMarket(index)" :class="{active:navActive==(index)}"><img :src="(data[2])" alt=""> {{data[1]}} {{$t("index_page.2")}}</li>
				</ul>
			</div>
			<table>
				<thead>
					<tr>
						<td>{{$t("index_page.3")}}</td>
						<td>{{$t("index_page.4")}}</td>
						<td>{{$t("index_page.5")}}({{marketTitle}})</td>
						<td>{{$t("index_page.6")}}</td>
						<td>{{$t("index_page.7")}}</td>
						<td>{{$t("index_page.8")}}</td>
						<td>{{$t("index_page.9")}}</td>
						<td>{{$t("index_page.10")}}</td>
					</tr>
				</thead>
				<tbody>
					<router-link to="/trade">
						<tr v-for="(data,index) in privateCoinsData" @click="jumpMarket(index)">
							<td><img :src="(data.coinloge)" alt=""> {{data.chineseName}}/{{data.name}}</td>
							<td :class="[((data.status) == '2')  ? 'enableColor' : 'noenableColor']">{{data.statusName}}</td>
							<td :class="[((data.marketRose) >= 0)  ? 'riseColor' : 'fallColor']"><span class="bg-newprice">{{data.latelyDealPrice}} <img v-if="data.marketRose>=0" src="../assets/index/rise.png" alt=""><img v-if="data.marketRose<0" src="../assets/index/fall.png" alt=""></span></td>
							<td>{{data.highestPrice24}}</td>
							<td>{{data.lowestPrice24}}</td>
							<td>{{data.entrustAmount24}}</td>
							<td :class="[((data.marketRose) >= 0)  ? 'riseColor' : 'fallColor']"><span class="bg-rose">{{data.marketRose}}%</span></td>
							<td class="trading">{{$t("index_page.11")}}</td>
						</tr>
					</router-link>
				</tbody>
			</table>
		</div>
		<!-- <div class="notice-line"></div> -->
		<div class="explain">
			<div class="item">
				<img src="../assets/index/Quick.png" alt="">
				<p class="title">{{$t("index_page.12")}}</p>
				<p class="text">
					{{$t("index_page.13")}}
				</p>
			</div>
			<div class="item">
				<img src="../assets/index/safety.png" alt="">
				<p class="title">{{$t("index_page.14")}}</p>
				<p class="text">
					{{$t("index_page.15")}}
				</p>
			</div>
			<div class="item">
				<img src="../assets/index/excellent.png" alt="">
				<p class="title">{{$t("index_page.16")}}</p>
				<p class="text">
					{{$t("index_page.17")}}
				</p>
			</div>
			<div class="item">
				<img src="../assets/index/languages.png" alt="">
				<p class="title">{{$t("index_page.18")}}</p>
				<p class="text">
					{{$t("index_page.19")}}
				</p>
			</div>
		</div>
		<div class="download">
			<div>
				<div class="download-left">
					<img src="../assets/index/mobilePhone.png" alt="">
				</div>
				<div class="download-right">
					<p class="title">QBTC {{$t("index_page.20")}}</p>
					<p class="text">
						{{$t("index_page.21")}}  </br>
						{{$t("index_page.22")}}
					</p>
					<div class="app">
						<div class="iphone">
							<img src="../assets/index/iphone.png" alt="">
							<span>iphone</span>
						</div>
						<div class="android">
							<img src="../assets/index/android.png" alt="">
							<span>android</span>
						</div>
					</div>
					<p class="more">
						<!-- October, stay tuned...<a>more></a> -->
					</p>
				</div>
				<div style="clear:both;"></div>
			</div>
			
		</div>
		<div class="journalism">
			<div class="item">
				<p class="title">{{$t("index_page.23")}}</p>
					<p class="text" v-for="(data,index) in noticeData">
						<router-link :to="{name: 'article', params: { id: data.code }}">
							<span @click="noticeCode">{{data.title}}</span>
						</router-link>
					</p>
				<div class="timeAxis">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<div class="line"></div>
				</div>
				<router-link to="/news/notice">
					<span class="more">
						{{$t("index_page.27")}}
					</span>
				</router-link>
			</div>
			<div class="item">
				<p class="title">{{$t("index_page.24")}}</p>
					<p class="text" v-for="(data,index) in coinData">
						<router-link :to="{name: 'article', params: { id: data.code }}">
							<span @click="coinCode">{{data.title}}</span>
						</router-link>
					</p>
				<div class="timeAxis">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<div class="line"></div>
				</div>
				<router-link to="/news/coinIntroduce">
					<span class="more">
						{{$t("index_page.27")}}
					</span>
				</router-link>
			</div>
			<div class="item">
				<p class="title">{{$t("index_page.25")}}</p>
				<p class="text" v-for="(data,index) in infoData">
					<router-link :to="{name: 'article', params: { id: data.code }}">
						<span @click="infoCode">{{data.title}}</span>
					</router-link>
				</p>
				<div class="timeAxis">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<div class="line"></div>
				</div>
				<router-link to="/news/info">
					<span class="more">
						{{$t("index_page.27")}}
					</span>
				</router-link>
			</div>
		</div>
		<div class="siteLink">
			<p class="title">
				<span>QBTC</span> {{$t("index_page.26")}}
			</p>
			<ul>
				<li v-for="(data,index) in friendshipLink">
					<a :href="(data.link)" target="_blank">
						<img :src="(data.picture)" alt="">
					</a>
				</li>
			</ul>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import footer from '@/components/footer'
	import header from '@/components/header'
	import {removeStore,getStore,isEmpty,setStore} from '@/utils/common'
	import {mapState, mapMutations} from 'vuex'
	import options from '@/utils/options'
	import XTrendChart from '@/components/trendChart.vue'
	import {loginUser,getUserinfo,privateCoins,latelyArticleList,getAbountInfo,saveToken,getMarkets,getArticleList} from '@/utils/api'
	import {wsUrl} from '@/utils/env'
	import store from '@/store/index'
	export default {
	  	name: 'hello',
		data () {
		    return {
		    	fullscreenLoading: false, // loading
		    	webSocketLoading: false, // loading
		    	edit: false,
		    	isLogin: '',
		    	account: '',
		    	UID: '',
		    	accountValue: '',
		    	passwordValue: '',
		    	socketMarket: null,
		    	privateCoinsData:[],
		    	navActive:0,
		    	optionalData:[],
		    	navTitleData:[],
		    	plus:true,
		    	marketCode:'',
		    	noticeData:[],
		    	infoData:[],
		    	coinData:[],
		    	friendshipLink: [],
		    	isMove: true,
		    	chartActive: '',
		    	ip:'',
		    	numberFew: 0,
		    	detailsData: [],
		    	marketTitle: '',
		    	newPriceData: [],
		    	session:'',
		    }
		},
		beforeRouteLeave(to, from, next){
			next();
		    this.socketMarket.close();
		},
	  	mounted: function () { 
  			// this.fullscreenLoading = true;
  			this.session = getStore("session");
  			this.webSocketLoading = true;
	  		this.getFriendshipLink();
	  		this.getArticle();
	  		this.getCoin();
	  		this.getInfo();
	  		var _this = this;
	  		let login = getStore("loginStatus");
		    this.isLogin = login; 
		   	if(!isEmpty(login)){     
		    	if(this.userinfoList.isBindPhone){
			    	this.account = this.userinfoList.phone;
			    }else{
			    	this.account = this.userinfoList.email;
			    }
			    this.UID = this.userinfoList.code;
			    this.ip= this.userinfoList.userLocal;
		   	}
			this.socketMarket = new WebSocket(wsUrl+'/websocket/mainPageInfoSocket');
	   		this.socketMarket.onopen = function(){
			   	_this.getSwitchMarket();
	   		}
		   	this.socketMarket.onmessage = function(event){
		   		var datas = JSON.parse(event.data);
		   		_this.privateCoinsData = datas;
		   		_this.newPriceData=[];
		   		 for(var i=0;i<datas.length;i++){
		   			_this.newPriceData.push({"price":datas[i].latelyDealPrice,"code":datas[i].code+'_'+datas[i].marketCode});
		   		}
				_this.webSocketLoading = false;
		   	}
		},
		watch:{
			newPriceData:{
				//注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
				handler(curVal,oldVal){
					if(oldVal == undefined){
						return
					}
					for(var i=0;i<oldVal.length;i++){
						for(var j=0;j<curVal.length;j++){
							if(curVal[j].code == oldVal[i].code){
								if(curVal[j].price != oldVal[i].price){
									var bgnewprice = document.getElementsByClassName("bg-newprice")[j];
									var bgrose = document.getElementsByClassName("bg-rose")[j];
									if(this.privateCoinsData[j].marketRose>=0){
										bgnewprice.style.cssText = "background-color:rgba(229, 250, 231, 0.61);transition: all .3s";
										bgrose.style.cssText = "background-color:rgba(229, 250, 231, 0.61);transition: all .3s";
									}else{
										bgnewprice.style.cssText = "background-color:rgba(250, 229, 229, 0.74);transition: all .3s";
										bgrose.style.cssText = "background-color:rgba(250, 229, 229, 0.74);transition: all .3s";
									}
									setTimeout(() => {
								       	bgnewprice.style.cssText = "background-color:transparent;transition: all .3s";
								       	bgrose.style.cssText = "background-color:transparent;transition: all .3s";
							    	}, 1000);
								}
							}
						}
					}
				},
				deep:true
			}
		},
		computed: {
            ...mapState([
                'userinfoList'
            ]),
        },
		components: {
		    "my-footer":footer,
		    "my-header":header,
		    "my-trendChart": XTrendChart,
		},
		methods: {
			...mapMutations([
	            'SAVE_LOGINSTATUS','SAVE_USERINFO','NEWS_CODE','SAVE_TOKEN','JUMP_MARKET'
	        ]),
	        // 默认市场
	        async getSwitchMarket(){
	        	let res = await getMarkets();
		    	if(!res){
		    		return
		    	}
		    	var navTitleData = res.result;
		    	for(var i=0;i<navTitleData.length;i++){
		    		var list = navTitleData[i].split("-");
		    		this.navTitleData.push(list)
		    	}
	        	var datas = {
			 		topic:this.navTitleData[0][0],
			 		token:this.session
			 	}
			 	this.marketTitle = this.navTitleData[0][1];
	        	this.socketMarket.send(JSON.stringify(datas)); 
	        },	
	        // 切换市场
	        switchMarket: function(index){
	        	this.navActive = index;
	        	var datas = {
			 		topic:this.navTitleData[index][0],
			 		token:this.session
			 	}
	        	this.socketMarket.send(JSON.stringify(datas)); 
	        	this.marketTitle = this.navTitleData[index][1];
	        },
	        // 跳转交易
	        jumpMarket(index){
	        	if(this.isOne){
	        		this.JUMP_MARKET(this.privateCoinsData[index].name+'/'+this.navTitleData[this.navActive][1]+'/'+this.privateCoinsData[index].code+'/'+this.navTitleData[this.navActive][0]);
	        	}else{
	        		this.JUMP_MARKET(this.privateCoinsData[index].name+'/'+this.navTitleData[this.navActive][1]+'/'+this.privateCoinsData[index].code+'/'+this.navTitleData[this.navActive][0]);
	        	}
		    	
		    },
		    // 获取官方公告
		    async getArticle(){
				let res = await getArticleList(1,1,4);
				if(!res){
					return
				}
				this.noticeData = res.result.list;
				this.detailsData.push(res.result.list[0]);
			},
			noticeCode(){
				this.NEWS_CODE(0);	
			},
			// 获取币种介绍
			async getCoin(){
				let res = await getArticleList(2,1,4);
				if(!res){
					return
				}
				this.coinData = res.result.list;
			},
			coinCode(){
				this.NEWS_CODE(1);	
			},
			 // 获取行业资讯
			async getInfo(){
				let res = await getArticleList(3,1,4);
				if(!res){
					return
				}
				this.infoData = res.result.list;
			},
			infoCode(){
				this.NEWS_CODE(2);	
			},
		    // 获取友情链接
		    async getFriendshipLink(){
		    	let res = await getAbountInfo(1);
		    	if(!res){
					return
				}
				this.friendshipLink = res.result;
			},
			displayChart(index){
				this.chartActive = index;
				this.isMove = !this.isMove;
			},
			gcsMarket(){
				this.JUMP_MARKET('GCS'+'/'+'CNTY'+'/'+'0dd42d54cd7343358eaeacb4e3c956f5'+'/'+'a27aa3f895a84e8f84b4d31fc3492320');
			},
			topcMarket(){
				this.JUMP_MARKET('TOPC'+'/'+'CNTY'+'/'+'0d410595761b4b5a9ab7b7acc9de7ba9'+'/'+'a27aa3f895a84e8f84b4d31fc3492320');
			},
			mgoMarket(){
				this.JUMP_MARKET('MGO'+'/'+'CNTY'+'/'+'09c6b99f5c63403fab2ecdef1b1dc441'+'/'+'a27aa3f895a84e8f84b4d31fc3492320');
			},
			btxMarket(){
				this.NEWS_CODE(0);	
			},
			wjMarket(){
				this.NEWS_CODE(1);	
			},
			nulsMarket(){
				this.NEWS_CODE(1);	
			},
			moreCode(){
				this.NEWS_CODE(0);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import './../style/mixin';
 	.body{
 		min-width: 1400px;
 		background-color: #fff;
 	}
 	header{
 		min-width: 1400px !important;
 	}
	a{
		color: #000;
		text-decoration: none;
	}
 	.banner{
 		@include wh(100%,auto);
 		background-color: #06244F;
		min-width: 1400px;
		position: relative;
		img{
			left: 50%;
			position: absolute;
			transform: translate(-50%,0%);
		}
		.candy{
			position: absolute;
			right: 100px;
			bottom: 300px;
			z-index: 2;
		}
		.notice{
			position: absolute;
			bottom: 30px;
			z-index: 2;
	 		text-align:center;
	 		left: 50%;
	 		transform: translate(-50%,-100%);
	 		.title{
	 			float: left;
	 			display:inline-block;
	 			@include wh(60px,30px);
	 			border: 1px solid #5C96E9;
	 			color: #5C96E9;
	 			line-height: 30px;
	 		}
	 		.details{
	 			float: left;
	 			display:inline-block;
	 			width: 500px;
	 			color: #fff;
	 			overflow: hidden;
 				white-space: nowrap;/*不换行*/
            	text-overflow:ellipsis;
            	margin-top: 5px;
            	margin-left: 10px;
	 		}
	 		span{
	 			float: left;
	 			color: #5C96E9;
	 			margin-top: 5px;
	 		}
	 	}
 	}
 	.tradeCoin{
 		min-height: 600px;
 		.market{
 			@include wh(100%,50px);
 			background-color: #E3E3E3;
 			padding: 0 100px;
 			.active{
 				color: #00A7EE;
 			}
 			ul{
 				li{
 					float: left;
 					color: #BBBBBB;
 					margin-right: 30px;
 					cursor: pointer;
 					font-size: 18px;
 					line-height: 50px;
 					img{
 						width: 20px;
 						vertical-align: middle;
 						margin-top: -5px;
 					}
 				}
 			}
 		}
 		table{
 			border-collapse:collapse;
 			width: 100%;
 			tr{
 				width: 100%;
 				td:first-child{
 					width: 16%;
	 				padding-left: 100px;
	 			}
	 			td:last-child{
	 				// padding-right: 60px;
	 			}
 			}
 			thead{
 				tr{
 					height: 50px;
 					background-color: #fff;
 					border-bottom: 1px solid #C8C8C8;
 					color: #969696;
 				}
 			}
 			thead, tbody tr {
				display:table;
				width:100%;
				table-layout:fixed;
			}
 			tbody{
 				a{
 					line-height: 36px;
 				}
 				tr{
 					line-height: 40px;
 					background-color: #fff;
 					td{
 						line-height: 44px;
 						img{
 							vertical-align: middle;
 							width: 16px;
 							margin-top: -4px;
 						}
 					}
 				}
 				.bg-newprice,.bg-rose{
 					display: inline-block;
 					height: 30px;
 					line-height: 30px;
 					padding: 0 10px;
 				}
 				tr:hover{
 					cursor: pointer;
 					background-color: rgba(0,0,0,.1) !important;
 				}
 				tr:nth-child(2n+1){
 					background-color: #F8F8F8;
 				}
 				tr:last-child{
	 				border-bottom: 3px solid #EBEBEB;
	 			}
	 			.trading{
	 				color: #20AC18;
	 			}
	 			.trading:hover{
	 				color: #4BE046;
	 				cursor: pointer;
	 			}
	 			.enableColor{
	 				color: #00A7EE;
	 			}
	 			.noenableColor{
	 				color: #ACACAC;
	 			}
	 			.riseColor{
	 				color: #11A909;
	 				img{
	 					width: 10px;
	 				}
	 			}
	 			.fallColor{
	 				color: #FA5D6A;
	 				img{
	 					width: 10px;
	 				}
	 			}
 			}
 		}
 	}
 	.notice-line{
 		width: 100%;
 		max-width: 1700px;
 		min-width: 1200px;
 		height: 1px;
 		margin: 0 auto;
 		background-color: #CDD3DC;
 	}
 	.explain{
 		width: 100%;
 		min-width: 1400px;
 		max-width: 1700px;
 		margin: 0 auto;
 		padding: 80px 0;
 		overflow: hidden;
 		text-align: center;
 		.item{
 			float: left;
 			width: 25%;
 			img{
 				margin: 24px 0;
 			}
 			.title{
 				padding: 10px 0;
 				font-size: 16px;
 			}
 			.text{
 				padding: 0 50px;
 				letter-spacing: 1px;
 			}
 		}
 	}
 	.download{
 		width: 100%;
 		min-width: 1400px;
 		background-color: #F5F5F5;
 		margin-top: 16px;
 		.download-left{
 			float: left;
 			// @include wh(50%,579px);
 			width: 50%;
 			img{
 				margin-top: 65px;
 				vertical-align: bottom;
 			}
 		}
 		.download-right{
 			float: left;
 			width: 50%;
 			padding: 60px 0;
 			.title{
 				@include sc(32px,#06244f);
 				margin-top: 20px;
 			}
 			.text{
 				margin-top: 20px;
 				line-height: 25px;
 				color: #525252;
 			}
 			.app{
 				margin: 30px 0;
 				overflow:hidden;
 				div{
 					float: left;
 					@include wh(180px,46px);
 					background-color: #06244F;
 					color: #fff;
 					line-height: 46px;
 					text-align: center;
 					@include borderRadius(40px);
 					cursor: pointer;
 					img{
 						width: 26px;
 						vertical-align: middle;
 						margin-top: -10px;
 					}
 					span{
 						font-size: 26px;
 						margin-left: 10px;
 					}
 				}
 				.android{
 					margin-left: 30px;
 				}
 			}
 			.more{
 				a{
 					color: #06244f;
 					cursor: pointer;
 				}
 			}
 		}
 	}
 	.download>div{
 		width: 1200px;
 		margin: 0 auto;
 	}
 	.journalism{
 		width: 1400px;
 		height: 600px;
 		margin: 0 auto;
 		padding: 50px 0;
 		background: url('./../assets/index/map.png') no-repeat center top;
 		overflow: hidden;
 		.item{
 			float: left;
 			position: relative;
 			width: 33.3%;
    		padding: 20px 50px;
    		margin-top: 20px;
 			.title{
 				width: 100%;
 				overflow: hidden;
 				white-space: nowrap;/*不换行*/
            	text-overflow:ellipsis;
 				text-align: left;
 				@include sc(18px,#06244f)
			}
			.text{
				width: 100%;
				margin-top: 38px;
				margin-left: 40px;
 				overflow: hidden;
 				white-space: nowrap;/*不换行*/
            	text-overflow:ellipsis;
			}
			.text a:hover{
				color: #90B4FF;
				cursor: pointer;
			}
			p:nth-child(2){
				margin-top: 77px;
			}
			.timeAxis{
				position: absolute;
				top: 80px;
				span{
					position: relative;
					display: block;
					width: 12px;
					height: 12px;
					margin-top: 46px;
					background-color: #D2D2D2;
					@include borderRadius(10px);
					vertical-align: middle;
					z-index: 1;
				}
				span:first-child{
					background-color: #53B34F;
				}
				.line{
					position: absolute;
					top: 0;
					left: 5.5px;
					height: 300px;
					border-right: 1px dashed #BFBFBF;
					z-index: 0;
				}
			}
 			.more{
 				display: inline-block;
 				margin-top: 70px;
 				color: #90B4FF;
 				margin-left: 40px;
 				cursor: pointer;
 			}
 		}
 		.item:last-child{
 			margin-right: 0;
 		}
 		
 	}
 	.siteLink{
 		@include wh(100%,413px);
 		background: url('./../assets/index/link.png') no-repeat center top;
 		padding: 60px 0; 
 		border-bottom: 1px solid #425164;
 		.title{
 			text-align: center;
 			font-size: 26px;
 			color: #fff;
 			span{
 				color: #5c96e9;
 				font-size: 26px;
 			}
 		}
 		ul{
 			@include wh(1400px,auto);
	 		margin: 0 auto;
	 		margin-top: 10px;
	 		padding: 20px;
 			overflow: hidden;
 		}
 		ul li{
 			float: left;
 			width: 14.2%;
 			min-height: 50px;
 			text-align: center;
 			margin-top: 36px;
 			img{
 				transition: all 0.3s ease;
			    filter: grayscale(100%);
			    opacity: 0.8;
 			}
 			img:hover{
 				filter: none;
    			opacity: 1;
 			}
 		}
 	}
</style>