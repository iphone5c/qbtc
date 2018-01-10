<template>
	<div element-loading-text="Loading...">
		<my-header></my-header>
		<div class="trade-wrapper">
			<div class="wrapper-top">
				<div class="coin-center" @mouseenter="isMarket = false" @mouseleave="isMarket = true">
					{{marketCoin}}/{{marketTitle}}
					<i></i>
					<transition name="fold">
						<div class="market-wrapper" v-if="!isMarket">
							<div class="market-title">
								<ul class="nav">
									<li v-for="(navData,index) in navDatas" @click="navActives(index)" :class="{active:navActive==(index)}"><span></span> {{navData.name}} {{$t("trade_page.1")}}</li>
								</ul>
							</div>
							<div class="market-body" v-loading="commonLoading">
								<table>
									<thead>
										<tr v-if="isOne">
											<td>{{$t("trade_page.42")}}</td>
											<td>{{$t("trade_page.2")}}（{{titlePriceOne}}）</td>
											<td>{{$t("trade_page.3")}}（{{titlePriceOne}}）</td>
											<td>{{$t("trade_page.4")}}</td>
											<td>{{$t("trade_page.5")}}</td>
										</tr>
										<tr v-if="!isOne">
											<td>{{$t("trade_page.42")}}</td>
											<td>{{$t("trade_page.2")}}（{{titlePriceTwo}}）</td>
											<td>{{$t("trade_page.3")}}（{{titlePriceTwo}}）</td>
											<td>{{$t("trade_page.4")}}</td>
											<td>{{$t("trade_page.5")}}</td>
										</tr>
									</thead>
									<tbody class="market-body-tbody"  @wheel.prevent="scrolling($event,'.market-body-tbody')">
										<tr v-for="(data,index) in marketCoinDatasOne" @click="marketActives(index)" v-if="isOne">
											<td><img :src="(data.coinloge)" alt=""> {{data.chineseName}}/{{data.name}}</td>
											<td>{{data.latelyDealPrice}}</td>
											<td>{{data.entrustPrice24}}</td>
											<td>{{data.entrustAmount24}}</td>
											<td :class="[((data.marketRoseSign) >= 0)  ? 'buyColor' : 'sellColor']">{{data.marketRose}}</td>
										</tr>
										<tr v-for="(data,index) in marketCoinDatasTwo" @click="marketActives(index)" v-if="!isOne">
											<td><img :src="(data.coinloge)" alt=""> {{data.chineseName}}/{{data.name}}</td>
											<td>{{data.latelyDealPrice}}</td>
											<td>{{data.entrustPrice24}}</td>
											<td>{{data.entrustAmount24}}</td>
											<td :class="[((data.marketRoseSign) >= 0)  ? 'buyColor' : 'sellColor']">{{data.marketRose}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</transition>
				</div>
				<ul class="coin-news">
					<li>{{$t("trade_page.2")}} ({{marketTitle}})<p>{{latestDealPrize}}</p></li>
					<li>{{$t("trade_page.3")}} ({{marketTitle}})<p>{{entrustPrice24}}</p></li>
					<li>{{$t("trade_page.4")}} ({{marketCoin}})<p>{{entrustAmount24}}</p></li>
					<li>{{$t("trade_page.5")}}<p class="rise" v-if="!isRise">{{marketRose}}</p><p class="fall" v-if="isRise">{{marketRose}}</p></li>
					<li><my-trendChart :id="trendId" :option="trendOption"></my-trendChart></li>
				</ul>
			</div>
			
		</div>
		<div class="trade-body">
			<div class="box-coin">
				<div class="coin-left">
					<my-chat></my-chat>
					<div class="sellDisc tradeList" style="margin-top: 10px">
						<div class="title">
							<img src="../../assets/trade/all.png" alt="">{{$t("trade_page.10")}}
							<el-dropdown class="choice" type="primary">
							  	<el-button type="primary">
							    	{{tradeListValue}}<i class="el-icon-arrow-down"></i>
							  	</el-button>
							  	<el-dropdown-menu slot="dropdown">
							    	<el-dropdown-item v-for="(item,index) in tradeListData" :key="item.value" @click.native='choiceTradeList(index)'>{{item.label}}</el-dropdown-item>
							  	</el-dropdown-menu>
							</el-dropdown>
						</div>
						<div class="sellList" v-if="isList" v-loading="commonLoading">
							<ul>
								<li class="sellListTitle">
									<span>{{$t("trade_page.11")}}</span>
									<span>{{$t("trade_page.12")}} ({{marketTitle}})</span>
									<span>{{$t("trade_page.13")}} ({{marketCoin}})</span>
									<span>{{$t("trade_page.14")}} ({{marketTitle}})</span>
								</li>
								<li class="item" v-for="(data,index) in sellDatas" v-if="after" @click="sellActives(index)">
									<span>{{data.name}}</span>
									<span>{{data.price}}</span>
									<span>{{data.amount}}<span>{{data.zerofillAmount}}</span></span>
									<span>{{data.sellNum}}<span>{{data.zerofillNum}}</span></span>
									<span class="item-bg" :style="{width:(data.sellWidth)}"></span>
								</li> 
								<li class="item" v-for="(data,index) in sellDatasAfter" v-if="!after" @click="sellAfterActives(index)">
									<span>{{data.name}}</span>
									<span>{{data.price}}</span>
									<span>{{data.amount}}<span>{{data.zerofillAmount}}</span></span>
									<span>{{data.sellNum}}<span>{{data.zerofillNum}}</span></span>
									<span class="item-bg" :style="{width:(data.sellWidth)}"></span>
								</li>
							</ul>
						</div>
						<div class="buyList buyListAfter" v-if="!isList" v-loading="commonLoading">
							<ul>
								<li class="buyListTitle">
									<span>{{$t("trade_page.15")}}</span>
									<span>{{$t("trade_page.12")}} ({{marketTitle}})</span>
									<span>{{$t("trade_page.13")}} ({{marketCoin}})</span>
									<span>{{$t("trade_page.14")}} ({{marketTitle}})</span>
								</li>
								<li class="item" v-for="(data,index) in buyDatasAfter" @click="buyActives(index)">
									<span>{{data.name}}</span>
									<span>{{data.price}}</span>
									<span>{{data.amount}}<span>{{data.zerofillAmount}}</span></span>
									<span>{{data.buyNum}}<span>{{data.zerofillNum}}</span></span>
									<span class="item-bg" :style="{width:(data.buyWidth)}"></span>
								</li>
							</ul>
						</div>
					</div>
					<div class="newPriceAll" v-if="isList && allList && isRise"><span class="fall">{{$t("trade_page.2")}} {{latestDealPrize}}{{marketTitle}}</span></div>
					<div class="newPriceAll" v-if="isList && allList && !isRise"><span class="rise">{{$t("trade_page.2")}} {{latestDealPrize}}{{marketTitle}}</span></div>
					<div class="buyList tradeList" v-if="isList && allList" v-loading="commonLoading">
						<ul style="padding-top: 20px;">
							<li class="item" v-for="(data,index) in buyDatas" @click="buyAfterActives(index)">
									<span>{{data.name}}</span>
									<span>{{data.price}}</span>
									<span>{{data.amount}}<span>{{data.zerofillAmount}}</span></span>
									<span>{{data.buyNum}}<span>{{data.zerofillNum}}</span></span>
								<span class="item-bg" :style="{width:(data.buyWidth)}"></span>
							</li>
						</ul>
					</div>
				</div>
				
				<div class="coin-right">
					<div class="chart-menu">
						<ul>
							<li :class="{'menu-color':iskline}" @click="iskline = true">{{$t("trade_page.16")}}</li>
							<li :class="{'menu-color':!iskline}" @click="iskline = false">{{$t("trade_page.17")}}</li>
						</ul>
					</div>
					<div class="k">
						<!-- <my-klineChart v-if="iskline"></my-klineChart> -->
						<iframe frameborder="0" border="0" width="100%" height="400px" id="klineFullScreen" src="/static/kline.html?market=1&coin=2&marketName=3&coinName=4" v-show="iskline">
							
						</iframe>
						<x-chart :id="id" :option="option" v-if="!iskline"></x-chart>
					</div>
					<div class="maimai">
						<div class="buyin">
							<div class="title">
								<p class="title-left">{{$t("trade_page.15")}} {{marketCoin}}</p>
								<p class="rate">{{latestDealPrize}}{{marketTitle}} ≈ {{cnyRate}}CNY / {{usdRate}}USD</p>
								<P class="title-right">{{$t("trade_page.18")}} {{marketBalance}} {{marketTitle}}</P>
							</div>
							<div class="item">
								<label>{{$t("trade_page.12")}}</label>
								<el-input class="item-input" v-model="sellPrice" @keypress.native="verificationFormat(sellPrice)" @keyup.native="buyCalculation">
									<span slot="append">{{marketTitle}}</span>
								</el-input>
							</div>
							<div class="item">
								<label>{{$t("trade_page.13")}}</label>
								<el-input class="item-input" v-model="sellNumber" @keypress.native="verificationFormat(sellNumber)" @keyup.native="buyCalculation">
									<span slot="append">{{marketCoin}}</span>
								</el-input>
							</div>
							<div class="item">
								<el-slider v-model="buySlider" :show-tooltip="false" @input="buySliderEvents"></el-slider>
								<span class="buySlider">{{buySlider}}%</span>
							</div>
							<div class="item">
								<label>{{$t("trade_page.43")}}</label>
								<el-input class="item-input" :disabled="true" v-model="sellTotal">
									<span slot="append">{{marketTitle}}</span>
								</el-input>
							</div>
							<el-button class="buy" type="primary" @click="buyCurrency">{{$t("trade_page.15")}}</el-button>
						</div>
						<div class="sold">
							<div class="title">
								<p class="title-left">{{$t("trade_page.11")}} {{marketCoin}}</p>
								<P class="title-right">{{$t("trade_page.18")}} {{coinBalance}} {{marketCoin}}</P>
							</div>
							<div class="item">
								<label>{{$t("trade_page.12")}}</label>
								<el-input class="item-input" v-model="buyPrice" @keypress.native="verificationFormat(buyPrice)" @keyup.native="sellCalculation">
									<span slot="append">{{marketTitle}}</span>
								</el-input>
							</div>
							<div class="item">
								<label>{{$t("trade_page.13")}}</label>
								<el-input class="item-input" v-model="buyNumber" @keypress.native="verificationFormat(buyNumber)" @keyup.native="sellCalculation">
									<span slot="append">{{marketCoin}}</span>
								</el-input>
							</div>
							<div class="item">
								<el-slider v-model="sellSlider" :show-tooltip="false" @input="sellSliderEvents"></el-slider>
								<span class="sellSlider">{{sellSlider}}%</span>
							</div>
							<div class="item">
								<label>{{$t("trade_page.43")}}</label>
								<el-input class="item-input" :disabled="true" v-model="buyTotal">
									<span slot="append">{{marketTitle}}</span>
								</el-input>
							</div>
							<el-button class="sell" type="primary" @click="sellCurrency">{{$t("trade_page.11")}}</el-button>
						</div>
					</div>
					<div class="current-entrust">
						<div class="entrust-title">
							<span v-if="!isEntrust" @click="getEntrust"><img src="../../assets/trade/entrust-icon.png" alt="" >{{$t("trade_page.19")}}</span>
							<span v-if="isEntrust" class="title-active"><img src="../../assets/trade/entrust-active.png" alt="">{{$t("trade_page.19")}}</span>
							<span v-if="isHistory" @click="getHistory"><img src="../../assets/trade/history-icon.png" alt="">{{$t("trade_page.20")}}</span>
							<span v-if="!isHistory" class="title-active"><img src="../../assets/trade/history-active.png" alt="">{{$t("trade_page.20")}}</span>
							<img class="drop-down" src="../../assets/trade/narrow.png" alt="" @click="setCurrent" ref="current">
						</div>
						<div v-if="isCurrent">
							<div class="entrust-record" v-if="isActive">
								<table>
									<thead>
										<tr>
											<td>{{$t("trade_page.21")}}</td>
											<td>{{$t("trade_page.22")}}</td>
											<td>{{$t("trade_page.12")}}（{{marketTitle}}）</td>
											<td>{{$t("trade_page.13")}}（{{marketCoin}}）</td>
											<td>{{$t("trade_page.23")}}（{{marketCoin}}）</td>
											<td>{{$t("trade_page.14")}}（{{marketTitle}}）</td>
											<td>{{$t("trade_page.24")}}</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data in entrustData" v-if="isLogin">
											<td>{{data.createTime}}</td>
											<td :class="[((data.fentrustType) == 2)  ? 'sellColor' : 'buyColor']">{{data.tradeType}}</td>
											<td>{{data.price}}</td>
											<td>{{data.amount}}</td>
											<td>{{data.yesAmount}}</td>
											<td>{{data.totalPrice}}</td>
											<td v-if="data.fentrustType == 2"><img @click="revokeEntrust" :id="(data.code)" src="../../assets/trade/revoke-sell.png" alt=""></td>
											<td v-if="data.fentrustType == 1"><img @click="revokeEntrust" :id="(data.code)" src="../../assets/trade/revoke-buy.png" alt=""></td>
										</tr>
										<tr v-if="!isLogin || entrustData.length==0">
											<td colspan="6" class="no-data-tips">{{$t("trade_page.44")}}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="trade-record" v-if="!isActive">
								<table>
									<thead>
										<tr>
											<td>{{$t("trade_page.21")}}</td>
											<td>{{$t("trade_page.22")}}</td>
											<td>{{$t("trade_page.12")}}（{{marketTitle}}）</td>
											<td>{{$t("trade_page.13")}}（{{marketCoin}}）</td>
											<td>{{$t("trade_page.14")}}（{{marketTitle}}）</td>
											<td>{{$t("trade_page.25")}}</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data in historyData" v-if="isLogin">
											<td>{{data.createTime}}</td>
											<td :class="[((data.fentrustType) == 2)  ? 'sellColor' : 'buyColor']">{{data.tradeType}}</td>
											<td>{{data.price}}</td>
											<td>{{data.amount}}</td>
											<td>{{data.totalPrice}}</td>
											<td>{{data.status}}</td>
										</tr>
										<tr v-if="!isLogin || historyData.length==0">
											<td colspan="5" class="no-data-tips">{{$t("trade_page.44")}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						
					</div>

					<div class="new-price">
						<div class="price-title">
							<img class="new-img" src="../../assets/trade/new-price.png" alt="">{{$t("trade_page.2")}}
							<img class="drop-down" src="../../assets/trade/narrow.png" alt="" @click="setNewPrice" ref="newPrice">
						</div>
						<div class="record" v-if="isNewPrice">
							<table>
								<thead>
									<tr>
										<td>{{$t("trade_page.21")}}</td>
										<td>{{$t("trade_page.22")}}</td>
										<td>{{$t("trade_page.12")}}（{{marketTitle}}）</td>
										<td>{{$t("trade_page.13")}}（{{marketCoin}}）</td>
										<td>{{$t("trade_page.14")}}（{{marketTitle}}）</td>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data in newPriceData">
										<td>{{data.createTime}}</td>
										<td :class="[((data.entrustType) == '2')  ? 'sellColor' : 'buyColor']">{{data.tradeType}}</td> 
										<td>{{data.prize}}</td>
										<td>{{data.amount}}</td>
										<td>{{data.totalPrice}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
		<my-popup :isSendTraderPassword="isSendTraderPassword" @sendTraderPaw="sendTraderPaw" @closeSendTradePassword="closeSendTradePassword"> 
			
		</my-popup>

		<my-footer></my-footer>
	</div>
</template>
<script>
import Vuex from 'vuex'
import store from '@/store/index'
import {mapState, mapMutations} from 'vuex'
import footer from '@/components/footer'
import header from '@/components/header'
import chat from './children/chat'
import {getStore,removeStore,decimalFormat,dateFormat,isEmpty,round,zeroFill} from '@/utils/common'
import {getMarketDefaultInfo,buyCoin,sellCoin,cancelEntrust,checkTradePassword,ifCheckPassword} from '@/utils/api'
import XChart from '@/components/chart'
import XTrendChart from '@/components/trendChart'
// import klineChart from '@/components/klineChart'
// import klineChart from '@/components/kline'
import options from '@/utils/options'
import klines from '@/utils/kline'
import {wsUrl} from '@/utils/env'
import {createWebSocket,heartCheck,closeSocket} from '@/utils/heartBeat'
export default {	
	name: 'hello',
	
	data() {
		let option = options.bar
		let trendOption = options.trend
		return {
			commonLoading: false, // loading
			id: 'test',
			trendId: 'test1',
     		option: option,
     		trendOption: trendOption,
			navDatas:[],
			marketCoinDatas:[],
			marketCoinDatasOne:[],
			marketCoinDatasTwo:[],
	    	navActive:'',
			checked: true,
			down:true,
			titleAll: true,  // 买卖全部
			titleSell: true, // 卖盘头部
			titleBuy: true,  // 买盘头部
			isList: true,   // 是否显示买卖盘
			allList: true,  // 是否显示全部
			buyDatas: [], // 买盘数据（15）
			sellDatas: [], // 卖盘数据（15）
			buyDatasAfter: [], // 买盘数据（30）
			sellDatasAfter: [],// 卖盘数据（30）
			after: true,  // 是否卖盘
			sellPrice: "",// 卖盘价格
			buyPrice: "",// 买盘价格
			entrustAmount24: '', // 24小时成交量
			entrustPrice24: '', // 24小时成交量
			latestDealPrize: '', // 最新成交价
			marketRose: '', // 日涨跌
			isRise: true, //是否涨 
			sellTotal: '0.00', //买 总额
			buyTotal: '0.00', //卖 总额
			sellNumber: '', //买 数量
			buyNumber: '', //卖 数量
			isEntrust: true,  //是否选中当前委托
			isHistory:true, //是否选中历史记录
			isActive: true,//是否是当前委托
			newPriceData: [], // 最新成交价数据 
			isLogin: true, // 是否登录
			isMarket: true, // 市场
			marketTitle: '', // 市场名字
			marketCoin: '', // 市场下面币的名字
			socket: '', // WebSocket
			topicCode: '', // 市场code
			coinType: '', // 币的类型
			socketLogin: '', // 登陆之后WebSocket
			entrustData: [], // 当前委托数据
			historyData: [], // 历史记录数据
			loginInfo: '', // 登陆状态
			session: '', // 登陆状态
			isSendTraderPassword: false, // 交易密码
			isSellOrBuy: '',
			marketBalance: '0.00', // 市场余额
			coinBalance: '0.00', // 市场余额
			isCurrent: true, // 是否缩小委托交易
			isNewPrice: true, // 是否缩小最新成交价
			cnyRate: 0, // 人民币汇率
			usdRate: 0, // btc汇率
			isOne: true,
			titlePriceOne: '',
			titlePriceTwo: '',
			tradeListData: [],
	        tradeListValue:'',
	        roseColor: '',
	        iskline: true,
	        buySlider: 0,
	        sellSlider: 0,
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
		"x-chart":  XChart,
		"my-trendChart": XTrendChart,
		"my-chat": chat,
		// "my-klineChart": klineChart,
	},	
	computed: {
        ...mapState([
            'userinfoList','jpMarketName','jpMarketCoin','jpMarketNameCode','jpMarketCoinCode','language'
        ]),
    },
    beforeRouteLeave(to, from, next){
		next();
		closeSocket();
	    this.socket.close();
	    this.socketLogin.close();
	   	this.JUMP_MARKET(removeStore("jqMarketData"));
	},
	created: function () {
		this.$i18n.locale = this.language;
    	this.tradeListData=[
    		{
	          value: '0',
	          label: this.$t('trade_page.45')
	        }, {
	          value: '1',
	          label: this.$t('trade_page.26')
	        }, {
	          value: '2',
	          label: this.$t('trade_page.27')
	        }
    	]
    	this.tradeListValue=this.$t('trade_page.45');
	},
	mounted: function () {
		this.commonLoading = true;
		this.webSocketLoading = true;	
		var _this = this;
		this.loginInfo = getStore("loginStatus");
		this.session = getStore("session");
		if(isEmpty(this.loginInfo)){
			this.isLogin = false;
		}
		document.getElementsByClassName("el-slider__runway")[0].style.cssText = "height: 10px;background-color:white; border:1px solid #BBCFB5;margin:4px 0;border-radius: 5px";
		document.getElementsByClassName("el-slider__bar")[0].style.cssText = "height: 8px;background-color:#CBE9C1;border-radius: 5px";
		document.getElementsByClassName("el-slider__button")[0].style.cssText = "width: 16px;height: 16px;background-color:#50B532;transform: scale(1)";
		document.getElementsByClassName("el-slider__button-wrapper")[0].style.cssText = "top:-14px;z-index:9";
		document.getElementsByClassName("el-slider__runway")[1].style.cssText = "height: 10px;background-color:white; border:1px solid #FDD1D5;margin:4px 0;border-radius: 5px";
		document.getElementsByClassName("el-slider__bar")[1].style.cssText = "height: 8px;background-color:#FFCFD3;border-radius: 5px";
		document.getElementsByClassName("el-slider__button")[1].style.cssText = "width: 16px;height: 16px;background-color:#FD5C6A;transform: scale(1)";
		document.getElementsByClassName("el-slider__button-wrapper")[1].style.cssText = "top:-14px;z-index:9";
		// this.getMarketInfo();
		
		this.socketLogin = new WebSocket(wsUrl+'/websocket/privateTradeInfoList');
	   		this.socketLogin.onmessage = function(event){
	   			let datas = JSON.parse(event.data);//所有数据
	   			let result = JSON.parse(datas.result);//当前数据
	   			let entrustData = result.entrustData; // 委托记录
	   			let historyData = result.historyData; // 委托记录
	   			let entrustDataArray=[];
	   			let historyDataArray=[];
	   			for(let i=0;i<entrustData.length;i++){
	   				let createTime = dateFormat(entrustData[i].createTime,"yy-MM-dd hh:mm:ss");
	   				let fentrustType = entrustData[i].fentrustType;
	   				let price = entrustData[i].price;
	   				let tradeType = entrustData[i].tradeType;
	   				let amount = entrustData[i].amount;
	   				let totalPrice = entrustData[i].totalPrice;
	   				let code = entrustData[i].code;
	   				let yesAmount = entrustData[i].yesAmount;
	   				entrustDataArray[i] = {"createTime":createTime,"fentrustType":fentrustType,"tradeType":tradeType,"price":price,"amount":amount,"totalPrice":totalPrice,"code":code,"yesAmount":yesAmount}
	   			}
	   			for(let i=0;i<historyData.length;i++){
	   				let createTime = dateFormat(historyData[i].createTime,"yy-MM-dd hh:mm:ss");
	   				let fentrustType = historyData[i].fentrustType;
	   				let price = historyData[i].price;
	   				let tradeType = historyData[i].tradeType;
	   				let amount = historyData[i].amount;
	   				let totalPrice = historyData[i].totalPrice;
	   				let status = historyData[i].status;
	   				historyDataArray[i] = {"createTime":createTime,"fentrustType":fentrustType,"tradeType":tradeType,"status":status,"price":price,"amount":amount,"totalPrice":totalPrice}
	   			}
	   			_this.entrustData = entrustDataArray;
	   			_this.historyData = historyDataArray;
	   			_this.marketBalance = result.marketBalance.totalNum;
	   			_this.coinBalance = result.coinBalance.totalNum;
	   		}
		
	 
		this.socket = new WebSocket(wsUrl+'/websocket/commonTradeInfoList');
			this.socket.onopen = function(){
			   	_this.getMarketInfo();
	   		}
			// 监听消息
		  	this.socket.onmessage = function(event) {
		  		var datas = JSON.parse(event.data);//所有数据
		  		var currentDatas = JSON.parse(datas.currentDatas);//当前数据
		  		var marketDatas = datas.marketDatas;//当前市场数据
		  		_this.onlineNum = datas.onlineCount;//当前在线人数
		  		_this.ONLINE_NUM(_this.onlineNum);
		  		_this.entrustAmount24 = currentDatas.entrustAmount24;
		  		_this.entrustPrice24 = currentDatas.entrustPrice24;
		  		_this.latestDealPrize = currentDatas.latestDealPrize;
		  		if(_this.marketTitle == 'BTC'){
		  			_this.cnyRate =round(_this.latestDealPrize * datas.rate[0].parameValue * datas.rate[1].parameValue,5);
		  			_this.usdRate =round(_this.latestDealPrize * datas.rate[1].parameValue,5);
		  		}else if(_this.marketTitle == 'CNYT'){
		  			_this.cnyRate =round(_this.latestDealPrize,5);
		  			_this.usdRate =round(_this.latestDealPrize/datas.rate[0].parameValue,5);
		  		}
				options.klineSmallChart = datas.klineSmallChart;
				klines.klineDatas = datas.klineAllDatas
				klines.marketTitle=_this.marketTitle;
				klines.marketCoin=_this.marketCoin;

		  		// 市场
		  		var marketTitle = [];
		  		var marketCoinDatas = [];
		  		for(var key in marketDatas){
		  			var tempMarket = [];
		  			var marketDatasKey = key;
		  			var marketDatasValue = marketDatas[key];
		  			var marketCodeInfo = marketDatasKey.split("-");
		  			marketTitle.push({"name":marketCodeInfo[1]})
		  			for (var i = 0; i < marketDatasValue.length; i++) {
		  				var d = marketDatasValue[i];
		  				var record = {"code":d.code,"chineseName":d.chineseName,"entrustAmount24":d.entrustAmount24,"entrustPrice24":d.entrustPrice24,"latelyDealPrice":d.latelyDealPrice,"marketRoseSign":d.marketRose,"marketRose":(d.marketRose>=0?'+'+d.marketRose:d.marketRose)+'%',"name":d.name,"coinloge":d.coinloge,"marketCode":marketCodeInfo[0],"marketName":marketCodeInfo[1]};
		  				tempMarket.push(record);
		  			}
		  			marketCoinDatas.push(tempMarket);
		  		}
		  		_this.navDatas = marketTitle;
		  		_this.titlePriceOne = _this.navDatas[0].name;
		  		_this.marketCoinDatas = marketCoinDatas;
		  		_this.marketCoinDatasOne = _this.marketCoinDatas[0];
		  		if(currentDatas.marketRose >= 0){
		  			_this.isRise = true;
		  			_this.marketRose = "+" + currentDatas.marketRose +"%";
		  		}else{
		  			_this.isRise = false;
		  			_this.marketRose = currentDatas.marketRose +"%";
		  		}
		  		var dataLength = 15;
		  		var dataLengthAfter = 30;

		  		// 卖盘
		  		var sellDatas=[];
		  		var sellDatasAfter=[];
		  		var sellcountNum = 0;
		  		var sellAftercountNum = 0;
		  		var sellServer = currentDatas.sell;
		  		options.sellValue = currentDatas.sell;
		  		options.buyDatas = currentDatas.buy;
		  		options.sellDatas = currentDatas.sell;
		  		
		  		if(sellServer.length<dataLength){
		  			dataLength = sellServer.length;
		  		}
		  		if(sellServer.length<dataLengthAfter){
		  			dataLengthAfter = sellServer.length;
		  		}
		  		for(var i=0;i<dataLength;i++){
		  			sellcountNum += Number(sellServer[i].noAmount);
		  		}
		  		for(var i=0;i<dataLength;i++){
		  			let price = sellServer[i].price;
		  			let amount = sellServer[i].noAmount;
		  			let num = round(sellServer[i].price*sellServer[i].noAmount,8);
		  			let sellNum = num;
		  			let sellWidth = Number(sellServer[i].noAmount)/Number(sellcountNum)*100;
		  			let zerofillAmount = zeroFill(amount,8);
		  			let zerofillNum = zeroFill(num,8);
		  			let tradeType = sellServer[i].tradeType;
		  			sellDatas.splice(0,0,{"name":tradeType+(i+1),"price":price,"amount":amount,"sellNum":sellNum,"sellWidth":sellWidth+"%","zerofillAmount":zerofillAmount,"zerofillNum":zerofillNum});
		  		}
		  		for(var i=0;i<dataLengthAfter;i++){
		  			sellAftercountNum += Number(sellServer[i].noAmount);
		  		}
		  		for(var i=0;i<dataLengthAfter;i++){
		  			let price = sellServer[i].price;
		  			let amount = sellServer[i].noAmount;
		  			let num = round(sellServer[i].price*sellServer[i].noAmount,8);
		  			let sellNum = num;
		  			let sellWidth = Number(sellServer[i].noAmount)/Number(sellAftercountNum)*100;
		  			let zerofillAmount = zeroFill(amount,8);
		  			let zerofillNum = zeroFill(num,8);
		  			let tradeType = sellServer[i].tradeType;
		  			sellDatasAfter[i]={"name":tradeType+(i+1),"price":price,"amount":amount,"sellNum":sellNum,"sellWidth":sellWidth+"%","zerofillAmount":zerofillAmount,"zerofillNum":zerofillNum};
		  		}
		  		_this.sellDatas = sellDatas;
		  		_this.sellDatasAfter = sellDatasAfter;

		  		dataLength = 15;
		  		dataLengthAfter = 30;

		  		// 买盘
		  		var buyDatas = [];
		  		var buyDatasAfter=[];
		  		var buycountNum = 0;
		  		var buyAftercountNum = 0;
		  		var buyServer = currentDatas.buy;
		  		if(buyServer.length<dataLength){
		  			dataLength = buyServer.length;
		  		}
		  		if(buyServer.length<dataLengthAfter){
		  			dataLengthAfter = buyServer.length;
		  		}
		  		for(var i=0;i<dataLength;i++){
		  			buycountNum += Number(buyServer[i].noAmount);
		  		}
		  		for(var i=0;i<dataLength;i++){
		  			let price = buyServer[i].price;
		  			let amount = buyServer[i].noAmount;
		  			let num = round(buyServer[i].price*buyServer[i].noAmount,8);
		  			let buyNum = num;
		  			let buyWidth = Number(buyServer[i].noAmount)/Number(buycountNum)*100;
		  			let zerofillAmount = zeroFill(amount,8);
		  			let zerofillNum = zeroFill(num,8);
		  			let tradeType = buyServer[i].tradeType;
		  			buyDatas[i]={"name":tradeType+(i+1),"price":price,"amount":amount,"buyNum":buyNum,"buyWidth":buyWidth+"%","zerofillAmount":zerofillAmount,"zerofillNum":zerofillNum};
		  		}
		  		for(var i=0;i<dataLengthAfter;i++){
		  			buyAftercountNum += Number(buyServer[i].noAmount);
		  		}
		  		for(var i=0;i<dataLengthAfter;i++){
		  			let price = buyServer[i].price;
		  			let amount = buyServer[i].noAmount;
		  			let num = round(buyServer[i].price*buyServer[i].noAmount,8);
		  			let buyNum = num;
		  			let buyWidth = Number(buyServer[i].noAmount)/Number(buyAftercountNum)*100;
		  			let zerofillAmount = zeroFill(amount,8);
		  			let zerofillNum = zeroFill(num,8);
		  			let tradeType = buyServer[i].tradeType;
		  			buyDatasAfter[i]={"name":tradeType+(i+1),"price":price,"amount":amount,"buyNum":buyNum,"buyWidth":buyWidth+"%","zerofillAmount":zerofillAmount,"zerofillNum":zerofillNum};
		  		}
		  		_this.buyDatas = buyDatas;
		  		_this.buyDatasAfter = buyDatasAfter;
		  		// 最新成交价
		  		var newPriceData = [];
		  		for(var i=0;i<currentDatas.entrust.length;i++){
		  			var createTime = dateFormat(currentDatas.entrust[i].createTime,"yy-MM-dd hh:mm:ss");
		  			var tradeType =currentDatas.entrust[i].tradeType;
		  			var entrustType =currentDatas.entrust[i].entrustType;
		  			var prize =currentDatas.entrust[i].prize;
		  			var amount =currentDatas.entrust[i].amount;
		  			var totalPrice =currentDatas.entrust[i].totalPrice;
		  			newPriceData[i]={"createTime": createTime,"tradeType":tradeType,"entrustType":entrustType,"prize":prize,"amount":amount,"totalPrice":totalPrice};
		  		}
		  		_this.newPriceData = newPriceData;
		  		_this.commonLoading = false;	
		  	}; 
	},
	methods: {
		...mapMutations([
            'JUMP_MARKET','ONLINE_NUM'
        ]),
        choiceTradeList(index){
        	if(index == 0){
        		this.tradeListValue = this.$t('trade_page.45');
        		this.isList = true;
        		this.allList = true; 
        		this.after = true;
        	}else if(index == 1){
        		this.tradeListValue = this.$t('trade_page.26');
        		this.isList = false;
        		this.allList = false; 
        	}else{
        		this.tradeListValue = this.$t('trade_page.27');
        		this.isList = true;
        		this.allList = false; 
        		this.after = false;
        	}
        },
		// 关闭交易密码弹窗 
		closeSendTradePassword (data) {
		    this.isSendTraderPassword = data
		},
		scrolling: function($event,dom){
			if (!$event) $event = window.event; 	
			document.querySelector(""+dom+"").scrollTop = document.querySelector(""+dom+"").scrollTop - ($event.wheelDelta ? $event.wheelDelta : -$event.detail * 10); 
			return false; 
		},
		// 是否缩小委托记录
		setCurrent: function(){
			this.isCurrent = !this.isCurrent;
			if(this.$refs.current.style.transform=='rotate(180deg)'){
				this.$refs.current.style.transform='rotate(0deg)';
			}else{
				this.$refs.current.style.transform='rotate(180deg)';
			}
		},
		// 是否缩小最新成交价记录
		setNewPrice: function(){
			this.isNewPrice = !this.isNewPrice;
			if(this.$refs.newPrice.style.transform=='rotate(180deg)'){
				this.$refs.newPrice.style.transform='rotate(0deg)';
			}else{
				this.$refs.newPrice.style.transform='rotate(180deg)';
			}
		},
		// 点击市场下面得币种
		navActives: function(index){
			this.isOne = false;
			this.navActive = index;
			this.marketCoinDatasTwo = this.marketCoinDatas[index];
			this.titlePriceTwo = this.navDatas[index].name;
		},
		// 获取卖盘价格
		sellActives(index){
			this.sellPrice = this.sellDatas[index].price;
			this.sellNumber = this.sellDatas[index].amount;
		},
		sellAfterActives(index){
			this.sellPrice = this.sellDatasAfter[index].price;
			this.sellNumber = this.sellDatasAfter[index].amount;
		},
		// 获取买盘价格
		buyActives(index){
			this.buyPrice = this.buyDatas[index].price;
			this.buyNumber = this.buyDatas[index].amount;
		},
		buyAfterActives(index){
			this.buyPrice = this.buyDatasAfter[index].price;
			this.buyNumber = this.buyDatasAfter[index].amount;
		},
		getEntrust: function(){
			this.isEntrust= true;  
			this.isHistory= true;
			this.isActive= true;
		},
		getHistory: function(){
			this.isEntrust= false;  
			this.isHistory= false;
			this.isActive= false;
		},
	    verificationFormat: function(value){
	    	var keyCode = event.keyCode;  
	    	var numValue = 0;
	    	if ((keyCode >= 48 && keyCode <= 57)|| keyCode ==46)  
	    	{
	        	event.returnValue = true;  
	     	}else{
	           event.returnValue = false;   
	    	}
	    	if(value.indexOf(".") != -1 && keyCode ==46){
	    		event.returnValue = false;
	    	}
	    	if(value.indexOf(".") != -1){
	    		if(value.split(".")[1].length >= 8){
		    		event.returnValue = false;
		    	}
	    	}

	    	if(value.indexOf(".") == -1){
	    		for(var i=0;i<value.length;i++){
	    			if(value.substr(i,1) > 0){
	    				break;
	    			}
	    			if(value.substr(i,1) == 0){
	    				numValue++;
	    			}
	    		}
	    		if(value > 0){
					event.returnValue = true; 
    			}
	    		if(numValue>=1){
	    			event.returnValue = false; 
	    		}
	    		if(keyCode ==46){
	    			 event.returnValue = true; 
	    		}
	    	}
	    },
	    // 买入总额计算
		buyCalculation: function(){
			this.sellTotal = round(this.sellPrice * this.sellNumber,8);
			if(this.sellTotal == 0){
				this.sellTotal = '0.00';
			}
		},
		 // 卖出总额计算
		sellCalculation: function(){
			this.buyTotal = round(this.buyPrice * this.buyNumber,8);
			if(this.buyTotal == 0){
				this.buyTotal = '0.00';
			}
		},
		// 发送链接
		marketActives: function(index){
			this.commonLoading = true;
			this.sellPrice = '';
			this.buyPrice = '';
			this.sellNumber = '';
			this.buyNumber = '';
			this.sellSlider=0;
			this.buySlider=0;
			this.sellTotal = '0.00';
			this.buyTotal = '0.00';
			if(this.navActive == ''){
				this.topicCode = this.marketCoinDatasOne[index].marketCode;
				this.coinType = this.marketCoinDatasOne[index].code;
				this.marketTitle = this.marketCoinDatasOne[index].marketName;
			  	this.marketCoin = this.marketCoinDatasOne[index].name;
			  	this.JUMP_MARKET(this.marketCoin+'/'+this.marketTitle+'/'+this.coinType+'/'+this.topicCode);
			}else{
				this.topicCode = this.marketCoinDatasTwo[index].marketCode;
				this.coinType = this.marketCoinDatasTwo[index].code;
				this.marketTitle = this.marketCoinDatasTwo[index].marketName;
			  	this.marketCoin = this.marketCoinDatasTwo[index].name;
			  	this.JUMP_MARKET(this.marketCoin+'/'+this.marketTitle+'/'+this.coinType+'/'+this.topicCode);
			}
			klines.klineDatas = [];
			klines.lhlc = [];
			klines.volume = [];
			var datas = {
		 		topic:this.topicCode,
		  		coinType:this.coinType,
		  		token:this.session
		 	}
		 	var datasLogin = {
		 		topic:this.topicCode,
		  		coinType:this.coinType,
		  		token:this.session,
		  		info:'send'
		 	}

			this.socket.send(JSON.stringify(datas)); 
		    if(!isEmpty(this.loginInfo) && !isEmpty(this.session)){
				this.socketLogin.send(JSON.stringify(datasLogin));
		    }
		    document.getElementById('klineFullScreen').src='static/kline.html?market='+this.topicCode+'&coin='+this.coinType+'&marketName='+this.marketTitle+'&coinName='+this.marketCoin;
		   	this.isMarket = true;
		},
		// 默认发送链接
		async getMarketInfo(){
			if(!isEmpty(this.jpMarketCoin)){
				this.topicCode = this.jpMarketNameCode;
				this.coinType = this.jpMarketCoinCode;
				this.marketTitle = this.jpMarketName;
			  	this.marketCoin = this.jpMarketCoin;
				let datas = {
			 		topic:this.jpMarketNameCode,
			  		coinType:this.jpMarketCoinCode,
			  		token:this.session
			 	}
			 	let datasLogin = {
			 		topic:this.jpMarketNameCode,
			  		coinType:this.jpMarketCoinCode,
			  		token:this.session,
			  		info:'send'
			 	}
				this.socket.send(JSON.stringify(datas)); 
			    if(!isEmpty(this.loginInfo) && !isEmpty(this.session)){
					this.socketLogin.send(JSON.stringify(datasLogin));
			    }
			}else{
				let res = await getMarketDefaultInfo();
				if(!res){
					return
				}
				let result = JSON.parse(res.result);
				this.topicCode = result.marketCode;
				this.coinType = result.coinCode;
				this.marketTitle = result.marketName;
			  	this.marketCoin = result.coinName;
			  	this.JUMP_MARKET(this.marketCoin+'/'+this.marketTitle+'/'+this.coinType+'/'+this.topicCode);
				let datas = {
			 		topic:result.marketCode,
			  		coinType:result.coinCode,
			  		token:this.session
			 	}
			 	let datasLogin = {
			 		topic:result.marketCode,
			  		coinType:result.coinCode,
			  		token:this.session,
			  		info:'send'
			 	}
				this.socket.send(JSON.stringify(datas)); 
			    if(!isEmpty(this.loginInfo) && !isEmpty(this.session)){
					this.socketLogin.send(JSON.stringify(datasLogin));
			    }
			}
			document.getElementById('klineFullScreen').src='static/kline.html?market='+this.topicCode+'&coin='+this.coinType+'&marketName='+this.marketTitle+'&coinName='+this.marketCoin;
		},
		bindSuccess() {
	        this.$alert(this.$t('trade_page.31'), this.$t('trade_page.46'), {
				confirmButtonText: this.$t('trade_page.47'),
			    callback: action => {
			  		this.$router.push({path: '/securityCenter/userinfo'});
			    }
			});
		},
		// 买币 
		async buyCurrency(){
		    if(isEmpty(this.loginInfo)){
		    	this.$router.push({path: '/login',query: {redirect: this.$route.path}});
		    	return
		    }
		    if(!this.sellPrice){
		    	this.$message.error(this.$t('trade_page.32'));
          		return
		    }
		    if(this.sellPrice<=0){
		    	this.$message.error(this.$t('trade_page.33'));
          		return
		    }
		    if(!this.sellNumber){
		    	this.$message.error(this.$t('trade_page.34'));
          		return
		    }
		    if(this.sellNumber<=0){
		    	this.$message.error(this.$t('trade_page.35'));
          		return
		    }
		    if(!this.userinfoList.isSetDealCode){
		    	this.bindSuccess();
		    	return
		    }
		    let res = await ifCheckPassword();
		    if(!res){
		    	return
		    }
		    if(res.result){
	    		let results = await buyCoin(this.topicCode,this.coinType,this.sellPrice,this.sellNumber,this.sellTotal);
	    		if(!results){
			    	return
			    }
		    	this.$message.success(this.$t('trade_page.36'));
		    	let datasLogin = {
			 		topic:this.topicCode,
			  		coinType:this.coinType,
			  		token:this.session,
			  		info:'send'
			 	}
		    	this.socketLogin.send(JSON.stringify(datasLogin));
		    }else{
		    	this.isSendTraderPassword = true;
		    }
		},
		// 验证交易密码
		async sendTraderPaw(data){
			let res = await checkTradePassword(data.sendTraderPassword);
			if(!res){
				return ;
			}
			this.isSendTraderPassword = false;
			// if(this.isSellOrBuy == 'buy'){
		 //    	let resBuy = await buyCoin(this.topicCode,this.coinType,this.sellPrice,this.sellNumber,this.sellTotal);
			//     if(!resBuy){
			//     	return
			//     }
			//     this.$message.success("委托成功!");
			//     this.isSendTraderPassword = false;
		 //    }else if(this.isSellOrBuy == 'sell'){
		 //    	let resSell = await sellCoin(this.topicCode,this.coinType,this.buyPrice,this.buyNumber,this.buyTotal);
			//     if(!resSell){
			//     	return
			//     }
			//     this.$message.success("委托成功!");
			//     this.isSendTraderPassword = false;
		 //    }
		},
		// 卖币 
		async sellCurrency(){
		    if(isEmpty(this.loginInfo)){
		    	this.$router.push({path: '/login',query: {redirect: this.$route.path}});
		    	return
		    }
		    if(!this.buyPrice){
		    	this.$message.error(this.$t('trade_page.37'));
          		return
		    }
		    if(this.buyPrice<=0){
		    	this.$message.error(this.$t('trade_page.38'));
          		return
		    }
		    if(!this.buyNumber){
		    	this.$message.error(this.$t('trade_page.39'));
          		return
		    }
		    if(this.buyNumber<=0){
		    	this.$message.error(this.$t('trade_page.40'));
          		return
		    }
		    if(!this.userinfoList.isSetDealCode){
		    	this.bindSuccess();
		    }
		    let res = await ifCheckPassword();
		    if(!res){
		    	return
		    }
		    if(res.result){
	    		let results = await sellCoin(this.topicCode,this.coinType,this.buyPrice,this.buyNumber,this.buyTotal);
	    		 if(!results){
			    	return
			    }
		    	this.$message.success(this.$t('trade_page.36'));
		    	let datasLogin = {
			 		topic:this.topicCode,
			  		coinType:this.coinType,
			  		token:this.session,
			  		info:'send'
			 	}
		    	this.socketLogin.send(JSON.stringify(datasLogin));
		    }else{
		    	this.isSendTraderPassword = true;
		    }
		},
		// 撤销委托
		async revokeEntrust(e){
			let self = e.target
	  		let code = self.getAttribute('id');
			let res = await cancelEntrust(code);
			if(!res){
				return
			}
			this.$message.success(this.$t('trade_page.41'));
			let datasLogin = {
		 		topic:this.topicCode,
		  		coinType:this.coinType,
		  		token:this.session,
		  		info:'send'
		 	}
		    this.socketLogin.send(JSON.stringify(datasLogin));
		},
		// 计算拖动价格
		buySliderEvents(){
			if(isEmpty(this.sellPrice)){
				return;
			}
			this.sellNumber = round(this.marketBalance/this.sellPrice*(this.buySlider/100),8);
			this.sellTotal = this.sellNumber*this.sellPrice;
			if(this.sellNumber == 0){
				this.sellNumber = '0.00';
			}
		},
		sellSliderEvents(){
			if(isEmpty(this.buyPrice)){
				return;
			}
			this.buyNumber = round(this.coinBalance*(this.sellSlider/100),8);
			this.buyTotal = this.buyNumber*this.buyPrice;
			if(this.buyNumber == 0){
				this.buyNumber = '0.00';
			}
		},
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.buyColor{
		color: #3eae3a;
	}
	.sellColor{
		color: #fc5d6a;
	}
	.no-data-tips{
		padding: 100px 0;
	}
	.active{
		color: #5c96e9 !important;
		span{
			opacity:1 !important;
		}
	}

	.trade-wrapper{
		width: 100%;
		background: #fff;
		min-width: 1200px;
		height: 110px;
	}
	.wrapper-top{
		max-width: 1700px;
		margin: 0 auto;
		height: 100%;	
	}
	.wrapper-top .coin-center{
		position: relative;
		height: 100%;
		padding: 25px 0;
		color: #3c3c3c;
		line-height: 50px;
		font-size: 28px;
		float: left;
		cursor: pointer;
		.market-wrapper{
			position: absolute;
			min-height: 250px;
			top: 110px;
			left: 0;
			z-index: 99999;
			background-color: #fff;
			box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.25);
			@include wh(817px,auto);
			margin: 0 auto;
			text-align: center;
			padding: 20px 20px;
			border-top: 1px solid #E5E5E5;
			overflow: hidden;
			.market-title{
				line-height: 20px;
				ul{
					// display: inline-block;
					// text-align: left;
					overflow: hidden;
					li{
						float: left;
						margin-right: 50px;
						margin-bottom: 18px;
						cursor: pointer;
						span{
							@include circular(6px,#5C96E9);
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
			.market-body{
				border: 1px solid #CACACA;
				padding: 0 20px;
				table{
					border-collapse:collapse;
					width: 100%;
					line-height: 24px;
					tr{
						text-align: left;
						td{
							padding-left: 18px;
						}
						td:nth-of-type(1){
							width: 21%;
						}
						td:nth-of-type(2),td:nth-of-type(3){
							width: 24%;
						}
						td:nth-of-type(4){
							width: 18%;
						}
					}
					thead tr{
						display:table;
						width: 730px;
						line-height: 40px;
						border-bottom: 1px solid #CACACA;
					}
					tbody tr:hover{
						background-color: #F6F6F6;
					}
					tbody{
						display:block;
						height:300px;
						overflow-x:hidden;
						overflow-y:auto;
						tr:nth-of-type(1){
							margin-top: 6px;
						}
						td{
							img{
								width: 14px;
								vertical-align: middle;
								margin-top: -3.5px;
							}
						}
					}
					tbody tr {
						display:table;
						width:100%;
						table-layout:fixed;
					}
					thead {
						// width: calc( 100% - .5em )
					}
				}
			}
		}
	}
	::-webkit-scrollbar{height: 35px;width: 5px;background: #e9e9e9;}
	::-webkit-scrollbar-thumb{background: #5c96e9;border-radius: 5px;}
	.wrapper-top .coin-center i{margin-left:23px;position:relative;top:-5px;width: 10px;height: 8px;display:inline-block;background: url('../../assets/register/icon.png') no-repeat 0 -50px}
	.wrapper-top .coin-news{
		overflow: hidden;
		height: 100%;
		padding: 25px 0;}
	.wrapper-top .coin-news li{width:20%;float: left;height: 60px;font-size: 18px;color: #6a6a6a;text-align: center}
	// .fix .coin-news li:first-of-type{margin-left: 40px;}
	.wrapper-top .coin-news li p{font-size: 20px;margin-top: 18px;}
	.wrapper-top .coin-news li .fall{
		color: #10ba08;
	}
	.wrapper-top .coin-news li .rise{
		color: #fc5d6a;
	}
	.wrapper-top .coin-news li:last-child>div{
		height: 80px;
	}
	.trade-body{
		position: relative;
		width: 100%;
		min-width: 1200px;
		background: #f6f6f6;
		padding-top: 10px;
		padding-bottom: 93px;
		min-height: 1680px;
	}
	.box-coin{max-width: 1700px;background: none;margin: 0 auto;position:relative;}
	.coin-left{position: absolute;top:0;left:0; width: 470px; float: left;background: none;margin-right: 10px;}
	.coin-right{width: 100%;max-width: 1700px;padding-left:480px; float: left;background: none;}
	.coin-right{
		.chart-menu{
			position: absolute;
			top: 6px;
			right: 20px;
			z-index: 1;
			ul{
				li{
					float: left;
					margin-left: 20px;
				}
				li:hover{
					cursor: pointer;
				}
				.menu-color{
					color: #5c96e9;
				}
			}
		}
	}

	// 卖盘
	.tradeList{
		width: 470px;
		background: #fff;
		border-bottom:1px solid #ebebeb;
		padding-bottom: 16px;
		overflow: auto;
	}
	.tradeList .title{
		width: 470px;
		height: 46px;
		background: #ebebeb;
		line-height: 46px;
		color: #5C96E9;
		font-size: 16px;
		img{
			vertical-align: middle;
			margin: 0 20px;
		}
		.choice{
			float: right;
			margin-right: 20px;
			width: 90px;
			.el-button--primary{
				background-color: #fff;
				border-color: #fff;
				color: #8f8f8f;
				padding: 8px 20px;
				transition: all .3s;
				-moz-transition: all .3s;
				-webkit-transition: all .3s;
				-o-transition: all .3s;
			}
			.el-button--primary:hover{
				border-color: #20a0ff;
				transition: all .3s;
				-moz-transition: all .3s;
				-webkit-transition: all .3s;
				-o-transition: all .3s;
			}
			.el-icon-arrow-down{
				margin-left: 10px;
			}
			.el-dropdown-menu__item{
				text-align:center;
			}
		}
	}
	.sellList{
		height: 543px;
		min-height: 543px;
		.sellListTitle{
			// background-color: #FFE4E6;
			border-bottom:1px solid #ebebeb;
			margin-bottom: 12px;
			height:51px;
			line-height: 51px;
			color: #8f8f8f;
			span{
				padding-left: 15px;
				text-align: right;
			}
		}
		.item{
			position: relative;
			color: #fc5d6a;
			height:28px;
			line-height: 28px;
			margin-bottom: 4px;
			cursor: pointer;
			>span{
				position: relative;
				z-index: 1;
				text-align: right;
				span{
					color: #8f8f8f;
				}
			}
			.item-bg{
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
				background-color: #FFE4E6;
				z-index: 0;
			}
		}
		.item:hover{
			background-color: rgba(0,0,0,.1)
		}
	}
	.newPriceAll{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		.fall{
			font-size: 16px;
			color: #10ba08;
		}
		.rise{
			font-size: 16px;
			color: #fc5d6a;
		}
	}

	.buyList{
		height: 517px;
		min-height: 517px;
		.buyListTitle{
			// background-color: #E4F3DA;
			border-bottom:1px solid #ebebeb;
			margin-bottom: 12px;
			height:51px;
			line-height: 51px;
			color: #8f8f8f;
			span{
				padding-left: 15px;
				text-align: right;
			}
		}
		.item{
			position: relative;
			color: #3eae3a;
			height:28px;
			line-height: 28px;
			margin-bottom: 4px;
			cursor: pointer;
			>span{
				position: relative;
				z-index: 1;
				text-align: right;
				span{
					color: #8f8f8f;
				}
			}
			.item-bg{
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
				background-color: #E4F3DA;
				z-index: 0;
			}
		}
		.item:hover{
			background-color: rgba(0,0,0,.1)
		}
	}
	.buyListAfter{
		height: 543px;
		min-height: 543px;
	}
	.tradeList ul li>span{float: left;text-align: center;}
	.tradeList ul li>span:nth-of-type(1){width:60px;}
	.tradeList ul li>span:nth-of-type(2){width:116px;}
	.tradeList ul li>span:nth-of-type(3){width:140px;}
	.tradeList ul li>span:nth-of-type(4){width:140px;}
	.buy{margin-top: 0px;}

	//K线
	.k{
		height: 400px;
		width: 100%;
		border-bottom: 1px solid #e3e3e3;
		background: #fff;
	}
	//买卖
	.maimai{width: 100%;padding: 20px 10px;margin-top: 10px;height: 353px;border-bottom: 1px solid #dbdbdb;background: #fff;}
	.maimai .buyin{padding-top: 10px;overflow: hidden;width: 46%;position: relative;float: left;}
	.buyin .title,.sold .title{
		overflow: hidden;
		.title-left{
			float: left;
			font-size: 18px;
		}
		.rate{
			float: left;
			margin-left: 10px;
			margin-top: 6px;
			font-size: 14px;
			color: #fc5d6a;
		}
		.title-right{
			float: right;
			color: #a6a6a6;
		}
	}
	.buyin .title{
		.title-left{
			color: #50b432;
		}
	}
	.sold .title{
		.title-left{
			color: #fc5d6a;
		}
	}
	.buyin .item,.sold .item{
		width: 100%;
		margin-top: 20px;
		overflow: hidden;
		label{
			display: inline-block;
			width: 10%;
		}
		.item-input,.el-slider{
			width: 88%;
			max-width: 485px;
		}
		.el-slider{
			float: left;
			width: 74%;
			margin-left: 12%;
		}
		.buySlider,.sellSlider{
			float: right;
			margin-right: 2%;
			margin-top: 2px;
		}

	}
	.buyin .buy,.sold .sell{
		width: 88%;
		margin-left: 11%;
		margin-top: 24px;
		max-width: 485px;
		transition: all .3s;
		-moz-transition: all .3s;
		-webkit-transition: all .3s;
		-o-transition: all .3s;
	}
	.buyin .buy{
		background: #50B432;
		border-color: #50B432;
		color: #fff;
	}
	.buyin .buy:hover{
		background: #46A527;
		border-color: #46A527;
		transition: all .3s;
		-moz-transition: all .3s;
		-webkit-transition: all .3s;
		-o-transition: all .3s;
	}
	.sold .sell{
		background: #FC5D6A;border-color: #FC5D6A;color: #fff;
	}
	.sold .sell:hover{
		background: #EA4D58;
		border-color: #EA4D58;
		transition: all .3s;
		-moz-transition: all .3s;
		-webkit-transition: all .3s;
		-o-transition: all .3s;
	}
	.sub{width: 246px;border: 1px solid #5c96e9;height: 32px;line-height: 32px;font-size: 15px;display:block;text-decoration:none;text-align:center;border-radius: 5px;margin-top: 17px;margin-left: 61px;color: #5c96e9;}
	// .buyin .buy:hover{color: #fff;background: #50B432;border-color: #50B432;transition: all .3s;}
	// .sold .sell:hover{color: #fff;background: #FC5D6A;border-color: #FC5D6A;transition: all .3s;}
	.maimai .sold{padding-top: 10px;overflow: hidden;width: 46%;position: relative;float: right;}

	//当前委托
	.current-entrust{width: 100%;background: #fff;}
	.entrust-title{
		height: 45px;
		width: 100%;
		background: #ebebeb;
		line-height: 45px;
		.drop-down{
			float: right;
			margin-right: 20px;
			margin-top: 18px;
			cursor: pointer;
		}
		span{
			cursor: pointer;
			font-size: 16px;
			img{
				vertical-align: middle;
   				margin-left: 25px;
   				margin-right: 10px;
			}
		}
		.title-active{
			color: #5c96e9;
		}
	}
	.entrust-title i{width: 19px;height: 19px;background:url('../../assets/register/icon.png') no-repeat 0 -75px;display: inline-block;margin-left: 25px;margin-right: 11px;position: relative;top: 3px;}
	.current-entrust .entrust-record,.current-entrust .trade-record{
		height: 315px;
		width: 100%;
		padding: 10px 20px;
		table{
			width: 100%;
			text-align: center;
			border-collapse:collapse;
			tr{
				height: 26px;
				td{
					text-align: right;
					padding-right: 2%;
				}
				td:first-child,td:nth-child(2){
					text-align: center;
					padding-right: 0;
				}
			}
			thead tr{
				border-bottom: 1px solid #EBEBEB;
			}
			td{
				img{
					cursor: pointer;
				}
			}
			tbody {
				display:block;
				height:255px;
				overflow-y:auto;
				tr:nth-of-type(1){
					margin-top: 6px;
				}
			}
			thead, tbody tr {
				display:table;
				width:100%;
				table-layout:fixed;
			}
			thead {
				// width: calc( 100% - 1em )
			}
		}
	}
	.current-entrust .trade-record{
		td{
			text-align: right;
			padding-right: 2% !important;
		}
		td:first-child,td:nth-child(2){
			text-align: center;
			padding-right: 0 !important;
		}
	}
	//最新成交
	.new-price{
		width: 100%;
		background: #fff;
		margin-top:10px;
		border-bottom: 1px solid #ebebeb;
	}
	.price-title{
		height: 45px;
		width: 100%;
		background: #ebebeb;
		line-height: 45px;
		font-size: 16px;
		color: #5c96e9;
		.drop-down{
			float: right;
			margin-right: 20px;
			margin-top: 18px;
			cursor: pointer;
		}
	}
	.price-title .new-img{
		width: 19px;
		display: inline-block;
		margin-left: 25px;
		margin-right: 11px;
		position: relative;
		top: 5px;
	}
	.new-price .record{
		height: 404px;
		width: 100%;
		padding: 10px 20px;
		// overflow: auto;
		table{
			width: 100%;
			text-align: center;
			border-collapse:collapse;
			tr{
				height: 26px;
				td{
					text-align: right;
					padding-right: 5%;
				}
				td:first-child,td:nth-child(2){
					text-align: center;
					padding-right: 0 !important;
				}
			}
			thead tr{
				border-bottom: 1px solid #EBEBEB;
			}
			tbody {
				display:block;
				height:355px;
				overflow-y:auto;
				tr:nth-of-type(1){
					margin-top: 6px;
				}
			}
			thead, tbody tr {
				display:table;
				width:100%;
				table-layout:fixed;
			}
			thead {
				// width: calc( 100% - 1em )
			}
		}
	}


	 .set{width: 633px;height: 266px;background: #fff;border-radius: 5px;text-align: center;}
	  .set h5{font-size: 21px;color: #686868;}
	  .passint{width: 356px;height: 40px;padding-left: 27px;margin: 0 auto;border: 1px solid #c3c3c3;border-radius: 5px;outline: none;margin-top: 55px;margin-bottom:32px;}
	  .passsub{width: 358px;height: 40px;background: #5c96e9;color: #fff;margin: 0 auto;text-align: center;line-height: 40px;display: block;border-radius: 5px;text-decoration: none;}
	@media screen and (max-width:1600px){
		 .buyin .rate{
		 	display: none;
		 }
	}
	.market-wrapper{
	    opacity: 1;
	}
	.fold-enter-active, .fold-leave-active {
	    transition: all .3s;
	}
	.fold-enter, .fold-leave-active {
	    opacity: 0;
	}
	.el-dropdown-menu{
		min-width: 88px;
		text-align: center;
	}
</style>