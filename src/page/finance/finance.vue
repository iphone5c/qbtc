<template>
	<div v-loading.fullscreen.lock="fullscreenLoading || webSocketLoading" element-loading-text="Loading..." class="body">
		<my-header></my-header>
		<div style="position:relative;">
		<div class="top-box">
			<div class="top">
				<ul>
					<li v-for="data in headLeftList" class="coinMarket">
						<p>{{data.name}}</p>
						<span :class="[((data.marketRose) >= 0)  ? 'riseColor' : 'fallColor']">
							{{data.price}}
						</span>
						<img v-if="data.marketRose<0" src="../../assets/finance/fall.png" alt="">
						<img v-if="data.marketRose>=0" src="../../assets/finance/rise.png" alt="">
						<div class="chart"><my-trendChart :id="(data.name)" :option="(data.option)"></my-trendChart></div>
					</li>
					<li v-for="data in rateData" class="exchangeRate">
						<p>{{data.key}}</p>
						<span>{{$t("finance_page.rate")}}</span>
						<b>{{data.parameValue}}</b>
					</li>
				</ul>
			</div>
		</div>
		<div class="nr-box">
			<div class="finance">
				<div class="qb-left">
					<dl>
						<dt v-if="false">
							<el-dropdown :hide-on-click="false">
							  	<span class="el-dropdown-link">
							    	CNY<i class="el-icon-caret-bottom el-icon--right"></i>
							  	</span>
							 	<el-dropdown-menu slot="dropdown">
								    <el-dropdown-item>BTC</el-dropdown-item>
								    <el-dropdown-item>ETC</el-dropdown-item>
								    <el-dropdown-item>ETH</el-dropdown-item>
							 	</el-dropdown-menu>
							</el-dropdown>
							<br>
							<div class="valuation">
								<img src="../../assets/finance/finance.png" alt="">
								<span>账户估价</span>
							</div>
							<div class="balance">
								<p>2458268.00</p>
								<span>可用：123</span>
								<span>冻结：666</span>
							</div>
						</dt>
						<dd v-if="false">
							<b><span>BTC</span> {{$t("finance_page.finance")}}</b>
							<div class="dd-right">
								<p class="balance">2586 CNY</p>
								<p class="cny-operation"><span>{{$t("finance_page.recharge")}}</span> | <span>{{$t("finance_page.withdrawals")}}</span></p>
							</div>
						</dd>
						<dd v-for="(data,index) in walletList" @mouseleave="rechargeShow = false">
							<div class="operation" :style="{background:data.logocolor}">
								<div @click="recharge(index)"><i></i>{{$t("finance_page.recharge")}}</div>
								<div @click="withdrawalsPopup(index)"><i></i>{{$t("finance_page.withdrawals")}}</div>
							</div>
							<div class="dd-left">
								<img :src="(data.coinlogo)" alt="">
								<span>{{data.shortName}}</span> {{$t("finance_page.finance")}}
							</div>
							
							<div class="dd-right">
								<p class="balance">{{data.totalCount}} {{data.shortName}}</p>
								<p class="valuation">{{$t("finance_page.finance_frozen_balance")}} {{data.blockBalance}} {{data.shortName}}&nbsp; {{$t("finance_page.finance_available_balance")}} {{data.balance}} {{data.shortName}}</p>
							</div>
							<transition name="fade">
								<div v-if="rechargeShow && rechargeActive === index && gxsIndex !== index && tvcIndex !== index && bdsIndex !== index && bdscnyIndex !== index" class="save">
									<p>{{$t("finance_page.recharge_user")}}{{data.shortName}}{{$t("finance_page.recharge_address")}}</p>
									<p>{{data.rechargeAddress}}</p>
									<div class="qrCode-box" id="code">

									</div>
								</div>
							</transition>
							<transition name="fade">
								<div v-if="rechargeShow && rechargeActive === index && (gxsIndex === index || bdsIndex === index || bdscnyIndex === index)" class="gxsSave">
									<p>{{$t("finance_page.recharge_user_account")}}{{data.shortName}}{{$t("finance_page.recharge_account")}}<span> {{data.account}}</span></p>
									<p>{{$t("finance_page.recharge_remark")}}<span> {{data.rechargeAddress}}</span> <label> {{$t("finance_page.tips_info")}}</label></p>
									<div class="qrCode-box" id="code">

									</div>
								</div>
							</transition>
							<transition name="fade">
								<div v-if="rechargeShow && rechargeActive === index && tvcIndex === index" class="tvcSave">
									<p>{{$t("finance_page.recharge_user_account")}}{{data.shortName}}{{$t("finance_page.recharge_account")}}<span> {{data.account}}</span></p>
									<p>{{$t("finance_page.recharge_remark")}}<span> {{data.rechargeAddress}}</span> <label> {{$t("finance_page.tips_info")}}</label></p>
									<div class="qrCode-box" id="code">

									</div>
								</div>
							</transition>
						</dd>
						<dd class="addFinance" @click="getAllCoin">
							<div class="operation">
							</div>
							<i></i><span>{{$t("finance_page.finance_add")}}</span>
						</dd>
					</dl>
					<div class="add-box" v-if="addFinance"></div>
					<transition name="fold">
						<div class="add-tab" v-if="addFinance">
							<div class="close"  @click="addFinance = false"><i class="el-icon-close"></i></div>
							<div class="had">
								<h5>{{$t("finance_page.finance_already")}}</h5>
								<ul>
									<li v-for="(data,index) in collectedWallet" @click="removeCoin(index)">
										<img :src="(data.coinlogo)" alt="">
										<span>{{data.shortName}} {{$t("finance_page.finance")}}</span>
										<i></i>
									</li>
								</ul>
							</div>
							<div class="need">
								<h5>{{$t("finance_page.finance_rest")}}</h5>
								<ul>
									<li v-for="(data,index) in unCollectedWallet" @click="addCoin(index)">
										<img :src="(data.coinlogo)" alt="">
										<span>{{data.shortName}} {{$t("finance_page.finance")}}</span>
										<i></i>
									</li>
								</ul>
							</div>
							<el-button class="confirm" type="primary" @click="preservationCoin">{{$t("finance_page.finance_conserve")}}</el-button>
						</div>
					</transition>
				</div>
				<div class="qb-right">
					<h5><i></i> {{$t("finance_page.coin_market")}}</h5>
					<dl>
						<table>
							<thead>
								<tr>
									<td>{{$t("finance_page.coin")}}</td>
									<td>{{$t("finance_page.coin_price")}}</td>
									<td>{{$t("finance_page.coin_volume")}}</td>
									<td>{{$t("finance_page.coin_rose")}}</td>
								</tr>
							</thead>
							<tbody>
								<router-link to="/trade">
									<tr v-for="(data,index) in coinQuotationData" @click="jumpMarket(index)">
										<td><img :src="(data.coinloge)" alt="">{{data.name}}</td>
										<td>{{data.latelyDealPrice}}</td>
										<td>{{data.entrustAmount24}}</td>
										<td v-if="data.marketRose>=0" :class="[((data.marketRose) >= 0)  ? 'riseColor' : 'fallColor']">+{{data.marketRose}}%</td>
										<td v-if="data.marketRose<0" :class="[((data.marketRose) >= 0)  ? 'riseColor' : 'fallColor']">{{data.marketRose}}%</td>
									</tr>
								</router-link>
							</tbody>
						</table>
					</dl>
				</div>
				<div class="qb-mid">
					<ul class="title">
						<li><i></i><span>{{$t("finance_page.coin_recharge_record")}}</span></li>
						<router-link  to="historicalRecord/trade"><li class="tradeRecord"><i></i><span>{{$t("finance_page.coin_trade_record")}}</span></li></router-link>
						<router-link  to="historicalRecord/entrust"><li class="entrustRecord"><i></i><span>{{$t("finance_page.coin_entrust_record")}}</span></li></router-link>
					</ul>

					<dl>
						<table>
							<thead>
								<tr>
									<td>{{$t("finance_page.time")}}</td>
									<td>{{$t("finance_page.coin_type")}}</td>
									<td>{{$t("finance_page.coin_num")}}</td>
									<td>{{$t("finance_page.coin_status")}}</td>
									<td>{{$t("finance_page.coin_fee")}}</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="data in chargeAndWithdrawListData">
									<td>{{data.createTime}}</td>
									<td>{{data.tradeType}}</td>
									<td>{{data.amount}} {{data.shortName}}</td>
									<td>{{data.status}}</td>
									<td>{{data.fee}} {{data.shortName}}</td>
								</tr>
								<tr v-if="isRecord">
									<td colspan="5" class="no-data-tips">{{$t("finance_page.no_record")}}</td>
								</tr>
							</tbody>
						</table>
					</dl>
					<div class="more" @click="getChargeAndWithdrawList" v-if="!isRecord">{{$t("finance_page.more_record")}}</div>
				</div>
			</div>
		</div>
		<div class="mask"></div>
		</div>
		<my-footer></my-footer>
		<div class="cnytRechargeBox" v-if="cntyShow && withdrawalsData.shortName == txCnty"></div>
		<transition name="folds">
			<div class="cnytRecharge popup" v-if="cntyShow && withdrawalsData.shortName == txCnty">
				<div class="close" @click="cntyShow = false"><i class="el-icon-close"></i></div>
				<div class="popup-head">
					<div class="popup-head-left">
						<img :src="(withdrawalsData.coinlogo)" alt="">
						<span>{{withdrawalsData.shortName}} {{$t("finance_page.recharge")}}</span>
					</div>
				</div>
				<div class="line"></div>
				<div class="popup-body">
					<div class="address">
						{{$t("finance_page.recharge_user")}}CNYT{{$t("finance_page.recharge_address")}}
						<span>{{withdrawalsData.rechargeAddress}}</span>
					</div>
					<div class="agent">
						<p class="title">
							{{$t("finance_page.agent_recharge")}}
							<span>{{$t("finance_page.agent_window")}}</span>
						</p>
						<div class="item">
							<a  href="http://wpa.qq.com/msgrd?v=3&uin=284547287&site=qq&menu=yes" target="_blank">
								<div class="agentName">
									<img src="../../assets/finance/agent.png" alt="">
									<span>{{$t("finance_page.recharge")}}-嘀嗒</span>
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_qq")}}284547287
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_name")}}翁明坦
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_aplay")}}180****2002
								</div>
							</a>
						</div>
						<div class="item" v-if="false">
							<a  href="http://wpa.qq.com/msgrd?v=3&uin=252653178&site=qq&menu=yes" target="_blank">
								<div class="agentName">
									<img src="../../assets/finance/agent.png" alt="">
									<span>{{$t("finance_page.recharge")}}-燕子</span>
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_qq")}}252653178
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_name")}}张巧艳
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_aplay")}}136****7002
								</div>
							</a>
						</div>
						<div class="item">
							<a  href="http://wpa.qq.com/msgrd?v=3&uin=444845443&site=qq&menu=yes" target="_blank">
								<div class="agentName">
									<img src="../../assets/finance/agent.png" alt="">
									<span>{{$t("finance_page.recharge")}}-豆豆</span>
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_qq")}}444845443
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_name")}}伍涛
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_aplay")}}139****3961
								</div>
							</a>
						</div>
						<div class="item">
							<a  href="http://wpa.qq.com/msgrd?v=3&uin=420278154&site=qq&menu=yes" target="_blank">
								<div class="agentName">
									<img src="../../assets/finance/agent.png" alt="">
									<span>{{$t("finance_page.recharge")}}-可乐</span>
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_qq")}}420278154
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_name")}}姜强
								</div>
								<div class="agentAccount">
									{{$t("finance_page.agent_aplay")}}138****4659
								</div>
							</a>
						</div>
					</div>
					<div class="explain">
						<div class="explainName">
							<img src="../../assets/finance/explain.png" alt="">
							<span>{{$t("finance_page.CNYT_explain")}}</span>
						</div>
						<div class="text">
							{{$t("finance_page.CNYT_explain_info")}}<span>{{$t("finance_page.CNYT_explain_tips")}}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div class="withdrawalsPopupBox" v-if="isPopup && withdrawalsData.shortName != txCnty"></div>
		<transition name="folds">
			<div class="popup withdrawalsPopups"  v-if="isPopup && withdrawalsData.shortName != txCnty">
				<div class="close" @click="closePopupCoin"><i class="el-icon-close"></i></div>
				<div class="popup-head">
					<div class="popup-head-left">
						<img :src="(withdrawalsData.coinlogo)" alt="">
						<span>{{withdrawalsData.shortName}} {{$t("finance_page.withdrawals")}}</span>
					</div>
					<div class="popup-head-right">{{$t("finance_page.withdrawals_money")}} {{withdrawalsData.balance}} {{withdrawalsData.shortName}}</div>
				</div>
				<div class="line"></div>
				<div class="popup-body">
					<div class="item">
						<label>{{$t("finance_page.select_address")}}</label>
						<el-select v-model="addressValue" :placeholder="($t('finance_page.select'))" class="select" :no-data-text="($t('finance_page.no_data'))">
						    <el-option
						      v-for="item in addressData"
						      :key="item.code"
						      :label="item.extractCashAddress"
						      :value="item.code">
						    </el-option>
						</el-select>
						<router-link :to="(coinUrl)"><el-button class="confirm" type="primary" @click="isPopup = false">{{$t("finance_page.add_address")}}</el-button></router-link>
					</div>
					<div class="item">
						<label>{{$t("finance_page.withdrawals_num")}}</label>
						<el-input placeholder="" class="input" v-model="coinNum" @keypress.native="verificationFormat(coinNum)" @keyup.native="calculationFee"></el-input>
						<span>{{$t("finance_page.fee")}} {{fee}}{{withdrawalsData.shortName}}</span>
					</div>
					<div class="item">
						<label>{{$t("finance_page.trade_password")}}</label>
						<el-input placeholder="" type="password" class="input" v-model="tradePassword"></el-input>
					</div>
					<div class="item">
						<label>{{$t("finance_page.google_code")}}</label>
						<el-input placeholder="" class="input" v-model="googlePassword"></el-input>
					</div>
					<div class="tips" v-if="false">
						因{{withdrawalsData.shortName}}钱包特殊性！请勿使用第三方交易所冲币地址为钱包地址，务必提取到本地钱包！否则将无法到账！
					</div>
					<el-button class="confirm" type="primary" @click="withdrawalsCoin">{{$t("finance_page.new_withdrawals")}}</el-button>
				</div>
			</div>
		</transition>
		<div class="cnytWithdrawalsPopupBox" v-if="isPopup && withdrawalsData.shortName == txCnty"></div>
		<transition name="folds">
			<div class="popup cnytWithdrawalsPopups"  v-if="isPopup && withdrawalsData.shortName == txCnty">
				<div class="close" @click="closePopupCoin"><i class="el-icon-close"></i></div>
				<div class="popup-head">
					<div class="popup-head-left">
						<img :src="(withdrawalsData.coinlogo)" alt="">
						<span>{{withdrawalsData.shortName}} {{$t("finance_page.withdrawals")}}</span>
					</div>
					<div class="popup-head-right">{{$t("finance_page.withdrawals_money")}} {{withdrawalsData.balance}} {{withdrawalsData.shortName}}</div>
				</div>
				<div class="line"></div>
				<div class="popup-body">
					<div class="item">
						<label>{{$t("finance_page.select_address")}}</label>
						<el-select v-model="addressValue" :placeholder="($t('finance_page.select'))" class="select" :no-data-text="($t('finance_page.no_data'))">
						    <el-option
						      v-for="item in addressData"
						      :key="item.code"
						      :label="item.extractCashAddress"
						      :value="item.code">
						    </el-option>
						</el-select>
						<router-link :to="(coinUrl)"><el-button class="confirm" type="primary" @click="isPopup = false">{{$t("finance_page.add_address")}}</el-button></router-link>
					</div>
					<div class="item">
						<label>{{$t("finance_page.withdrawals_num")}}</label>
						<el-input placeholder="" class="input" v-model="coinNum" @keypress.native="verificationFormat(coinNum)" @keyup.native="calculationFee"></el-input>
						<span>{{$t("finance_page.fee")}} {{fee}}{{withdrawalsData.shortName}}</span>
					</div>
					<div class="item">
						<label>{{$t("finance_page.trade_password")}}</label>
						<el-input placeholder="" type="password" class="input" v-model="tradePassword"></el-input>
					</div>
					<div class="item">
						<label>{{$t("finance_page.google_code")}}</label>
						<el-input placeholder="" class="input" v-model="googlePassword"></el-input>
					</div>
					<el-button class="confirm" type="primary" @click="withdrawalsCoin">{{$t("finance_page.new_withdrawals")}}</el-button>
				</div>
				<div class="popup-explain">
					<div class="explainName">
						<img src="../../assets/finance/explain.png" alt="">
						<span>{{$t("finance_page.CNYT_withdrawals_explain")}}</span>
					</div>
					<div class="text">
						{{$t("finance_page.CNYT_withdrawals_explain_info")}}
					</div>
				</div>
				<div class="lines"></div>
				<div class="agent">
					<p class="title">
						{{$t("finance_page.agent_withdrawals")}}
						<span>{{$t("finance_page.agent_window")}}</span>
					</p>
					<div class="item" v-if="false">
						<a  href="http://wpa.qq.com/msgrd?v=3&uin=284547287&site=qq&menu=yes" target="_blank">
							<div class="agentName">
								<img src="../../assets/finance/agent.png" alt="">
								<span>{{$t("finance_page.withdrawals")}}-嘀嗒</span>
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_qq")}}284547287
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_name")}}翁明坦
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_aplay")}}180****2002
							</div>
						</a>
					</div>
					<div class="item">
						<a  href="http://wpa.qq.com/msgrd?v=3&uin=78326427&site=qq&menu=yes" target="_blank">
							<div class="agentName">
								<img src="../../assets/finance/agent.png" alt="">
								<span>{{$t("finance_page.withdrawals")}}-悠悠</span>
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_qq")}}78326427
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_name")}}王碧隆
							</div>
						</a>
					</div>
					<div class="item">
						<a  href="http://wpa.qq.com/msgrd?v=3&uin=252653178&site=qq&menu=yes" target="_blank">
							<div class="agentName">
								<img src="../../assets/finance/agent.png" alt="">
								<span>{{$t("finance_page.withdrawals")}}-燕子</span>
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_qq")}}252653178
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_name")}}张巧艳
							</div>
						</a>
					</div>
					<div class="item" v-if="false">
						<a  href="http://wpa.qq.com/msgrd?v=3&uin=420278154&site=qq&menu=yes" target="_blank">
							<div class="agentName">
								<img src="../../assets/finance/agent.png" alt="">
								<span>{{$t("finance_page.withdrawals")}}-可乐</span>
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_qq")}}420278154
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_name")}}姜强
							</div>
							<div class="agentAccount">
								{{$t("finance_page.agent_aplay")}}138****4659
							</div>
						</a>
					</div>
				</div>
			</div>
			
		</transition>
	</div>
</template>


<script>
import footer from '@/components/footer'
import header from '@/components/header'
import XTrendChart from '@/components/trendChart.vue'
import options from '@/utils/options'
import {round} from '@/utils/common'
import {privateWalletList,collectWalletList,operatePrivateWallet,chargeAndWithdrawList,selectCoinAddressList,coinWithdraw,virtualShowALL,legalCoinList} from '@/utils/api'
import {wsUrl} from '@/utils/env'
import {mapState, mapMutations} from 'vuex'
export default {	
	name: 'hello',
	data() {
		return {
			fullscreenLoading: false, // loading
			webSocketLoading: false, // loading
			id: 'test1',
			checked: true,
			rechargeShow:false,
			addFinance: false,
			walletList: [],
			rechargeActive:'',
			urlData: [],
			collectedWallet:[], // 已收藏数组
			unCollectedWallet:[], // 可添加数组
			variable:'',
			chargeAndWithdrawListData: [], //充值提现记录
			isPopup: false, //币种提现框
			withdrawalsData: [], //币种提现数据
			addressValue: '', //币种地址
			coinNum: '', //币种地址
			tradePassword: '', //交易密码
			googlePassword: '', //谷歌验证码
			addressData: '', //币种地址数据
			coinCode: '', //币种code
			socketFin: '', //市场socket
			coinQuotationData: [], //币行情数据
			headLeftList: [], //头部左侧数据
			isRecord:false,
			fee: '0.00', // 手续费
			rate: 0, // 费率
			rateData:[],
			judge: 0, //充值提现页码
			gxsIndex: '',
			bdsIndex: '',
			bdscnyIndex: '',
			tvcIndex: '',
			cntyShow: false,
			txCnty: 'CNYT',
			// coinUrl: '/securityCenter/address/currency/',
			coinUrl: '/securityCenter/address/bank',
			legalCoinListList: [],
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
		"my-trendChart": XTrendChart,
	},	
	beforeRouteLeave(to, from, next){
		next();
	    this.socketFin.close();
	},
	mounted: function () {
		this.fullscreenLoading = true;
		this.webSocketLoading = true;
		// this.getAccountList();
		var _this = this;
		this.socketFin = new WebSocket(wsUrl+'/websocket/walletInfoSocket');	
		this.socketFin.onmessage = function(event){
			var datas = JSON.parse(event.data);
			_this.rateData = datas.rate;
			_this.coinQuotationData = datas.coinList;
			_this.headLeftList = [];
			for(var i =0;i<datas.headInfo.length;i++){
				var record = datas.headInfo[i];
				var option = options.initKline({seriesColor:'#FADDB9'});
				options.updateChartDatas(option,record.klineSmallChart)

				_this.headLeftList.push({'name':record.name,'price':record.price,'klineSmallChart':record.klineSmallChart,'option':option,"marketRose":record.marketRose});
			}
			_this.webSocketLoading = false;
		}
		this.getWalletList();
		this.getChargeAndWithdrawList();
		// setTimeout(() => {
	 //        this.fullscreenLoading = false;
	 //    }, 500);
	},
	methods: {
		...mapMutations([
            'JUMP_MARKET'
        ]),
	 	bindSuccess() {
	        this.$alert(this.$t('finance_page.operation_success'), this.$t('finance_page.tips'), {
				confirmButtonText: this.$t('finance_page.confirm'),
			    callback: action => {
			  		this.$router.go(0)
			    }
			});
		},
		// 获取币种列表
		async getAccountList(){
	  		let res = await virtualShowALL();
	  		if(!res){
	  			return
	  		}
	  		this.coinUrl = this.coinUrl +res.result[0].shortName +'_'+ res.result[0].code;
	  	},
		// 获取充值二维码
		getRechargeCode(index){
			this.$nextTick(function () {
           		require ('@/utils/jquery-3.2.1.min.js');
            	require ('@/utils/jquery.qrcode.min.js');
            	this.qrcode(index);
            })
		},
		qrcode(index){
            $("#code").qrcode({
                text: this.walletList[index].rechargeAddress,
                width:80,
                height:80
            });
        },
		// 获取用户收藏的钱包
		async getWalletList(){
			// 获取法币
			let legalCoin = await legalCoinList();
			if(!legalCoin){
				return
			}
			let res = await privateWalletList();
			if(!res){
				return
			}
			this.legalCoinListList = legalCoin.result;
			this.walletList=legalCoin.result.concat(res.result);
			for(var i=0;i<this.walletList.length;i++){
				if(this.walletList[i].shortName == 'GXS'){
					this.gxsIndex = i;
				}
				if(this.walletList[i].shortName == 'BDS'){
					this.bdsIndex = i;
				}
				if(this.walletList[i].shortName == 'BDSCNY'){
					this.bdscnyIndex = i;
				}
				if(this.walletList[i].shortName == 'TV'){
					this.tvcIndex = i;
				}
			}
			this.fullscreenLoading = false;
		},
		// 打开充值
		recharge(index){
			this.rechargeActive = index;
			this.rechargeShow = !this.rechargeShow;
			this.withdrawalsData = this.walletList[index];
			if(this.withdrawalsData.shortName == this.txCnty){
				this.cntyShow = true;
			}
			if(this.rechargeShow){
				this.getRechargeCode(index);
			}
		},
		// 获取所有币种信息
		async getAllCoin(){
			let res = await collectWalletList();
			if(!res){
				return
			}
			this.addFinance = true;
			this.collectedWallet = res.result.collectedWallet;
			this.unCollectedWallet = res.result.unCollectedWallet;
		},
		// 移除币种
		removeCoin(index){
			this.variable = this.collectedWallet[index];
			this.collectedWallet.splice(index,1);
			this.unCollectedWallet.push(this.variable);
		},
		// 添加币种
		addCoin(index){
			this.variable = this.unCollectedWallet[index];
			this.unCollectedWallet.splice(index,1);
			this.collectedWallet.push(this.variable);
		},
		// 保存存放的币种
		async preservationCoin(){
			var coinData = '';
			for(var i = 0;i < this.collectedWallet.length;i++){
				if(i==this.collectedWallet.length-1){
					coinData+=this.collectedWallet[i].code;
				}else{
					coinData+=this.collectedWallet[i].code+',';
				}
			}
			let res = await operatePrivateWallet(coinData);
			if(!res){
				return
			}
			this.walletList = this.legalCoinListList.concat(this.collectedWallet);
			for(var i=0;i<this.walletList.length;i++){
				if(this.walletList[i].shortName == 'GXS'){
					this.gxsIndex = i;
				}
				if(this.walletList[i].shortName == 'BDS'){
					this.bdsIndex = i;
				}
				if(this.walletList[i].shortName == 'BDSCNY'){
					this.bdscnyIndex = i;
				}
				if(this.walletList[i].shortName == 'TV'){
					this.tvcIndex = i;
				}
			}
			this.addFinance = false;
		},
		// 打开提现框
		async withdrawalsPopup(index){
			this.coinCode = this.walletList[index].virtualCoinCode;
			this.rate = this.walletList[index].fee;
			let res = await selectCoinAddressList(this.coinCode);
			if(!res){
				return
			}
			this.addressData = res.result;
			this.withdrawalsData = this.walletList[index];
			this.isPopup = true;
		},
		// 提现
		async withdrawalsCoin(){
			if(!this.addressValue){
				this.$message.error(this.$t('finance_page.select_withdrawals_address'));
				return
			}
			if(!this.coinNum){
				this.$message.error(this.$t('finance_page.fillin_withdrawals_num'));
				return
			}
			if(!this.tradePassword){
				this.$message.error(this.$t('finance_page.fillin_trade_password'));
				return
			}
			if(!this.googlePassword){
				this.$message.error(this.$t('finance_page.fillin_google_code'));
				return
			}
			let res = await coinWithdraw(this.coinCode,this.coinNum,this.tradePassword,this.googlePassword,this.addressValue);
			if(!res){
				return
			}
			this.isPopup = false;
			this.bindSuccess();
		},
		// 关闭提现
		closePopupCoin(){
			this.isPopup = false;
			this.addressValue = '';
			this.coinNum = '';
			this.tradePassword = '';
			this.googlePassword ='';
			this.fee = '0.00';
		},
		// 充值提现记录
		async getChargeAndWithdrawList(){
			this.judge++;
			var res = await chargeAndWithdrawList(this.judge,10);
			if(!res){
				return
			}
			if(res.result.totalSize == 0){
				this.isRecord = true;
			}
			if(this.judge>res.result.pageCount && res.result.pageCount != 0){
				this.$message(this.$t('finance_page.no_more_record'));
				return
			}
			this.chargeAndWithdrawListData=this.chargeAndWithdrawListData.concat(res.result.list);
		},
		verificationFormat: function(value){
	    	var keyCode = event.keyCode;   
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
	    },
	    // 计算费用
	    calculationFee(){
	    	this.fee = round(Number(this.coinNum) * Number(this.rate),8);
			if(this.fee == 0){
				this.fee = '0.00';
			}
	    },
	    jumpMarket(index){
	    	this.JUMP_MARKET(this.coinQuotationData[index].name+'/'+this.coinQuotationData[index].code+'/'+this.coinQuotationData[index].marketCode);
	    }
  	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
@import '../../style/mixin';
.body{
 	min-width: 1700px;
}
.no-data-tips{
	padding: 100px 0;
}
.fallColor{
	color: #f2d008;
}
.riseColor{
	color: #10ba08;
}
.top-box{width: 100%;min-width: 1700px;background: #fff;}
.top{height: 117px;width: 1700px;margin: 0 auto;}
.top ul{overflow: hidden;}
.top ul li{float: left;height: 67px;border-right: 1px solid #dedede;overflow: hidden;margin-top: 25px;color: #000;}
.coinMarket{
	width: 18%;
}
.coinMarket .chart{
	float: left;
	width: 30%;
	margin-top: 20px;
	margin-left:3px;
}
.coinMarket span,.coinMarket img{
	float: left;
}
.coinMarket .chart>div{
	height: 20px;
}
.exchangeRate{
	width: 14%;
}
.top ul li:last-of-type{border: none;}
.top ul li p{margin-left: 20px;font-size: 15px;margin-top: 4px;}
.top ul .coinMarket span{
	display: inline-block;
	max-width: 55%;
	margin-left: 20px;
	position: relative;
	top: 20px;
	font-size: 20px;
	overflow: hidden;
}
.top ul .coinMarket img{
	position: relative;
	top: 22px;
	font-size: 18px;
	margin-left: 2px;
}
.top ul .exchangeRate span{font-size: 14px;margin-left: 20px;}
.top ul .exchangeRate b{font-size: 14px;font-weight: normal;color: #5c96e8;margin-top: 20px;display: inline-block;}
.nr-box{width: 100%;min-width: 1200px;background: #f6f6f6;}
.finance{width: 1700px;background: none;margin: 0 auto;padding: 23px 0;overflow: hidden;}
a{text-decoration: none;}
.qb-left{
	float: left;
	// position: relative;
	.dd-left{
		float: left;
		margin-left: 50px;
		line-height: 96px;
		font-size: 18px;
		img{
			width: 30px;
			vertical-align: middle;
			margin-right: 5px;
			margin-top: -6px;
		}
		span{
			font-size: 20px;
		}
	}
	.dd-right{
		float: right;
		width: 360px;
		text-align: right;
		margin-right: 20px;
		p{	
			margin-top: 4px;
		}
		.balance{
			font-size: 20px;
			margin-top: 36px;
		}
		.valuation{
			position: absolute;
			right: 20px;
			top: 56px;
			width: 100%;
			color: #A1A2A5;
			font-size: 14px;
		}
		.cny-operation{
			span{
				font-size: 14px;
				cursor: pointer;
			}
			span:hover{
				color: #5c96e9;
			}
		}
	}
}
.qb-left dt{
	padding: 20px;
	background: #D6E1F2;
	@include borderRadius(10px);
	overflow: hidden;
	.el-dropdown{
		float: left;
		width: 100px;
	}
	.valuation{
		float: left;
		margin-top: 10px;
		img{
			vertical-align: middle;
			margin-top: -6px;
		}
		span{
			font-size: 24px;
			margin-left: 10px;
		}
	}
	.balance{
		float: right;
		text-align: right;
		p{
			font-size: 24px;
		}
		span{
			color: #606060;
		}
	}
}
.qb-left .addFinance{
	cursor: pointer;
	.operation{
		background-color: #4DE1E6;
	}
}
//chongzhi
.qb-left dl dd{
	position: relative;
}
.qb-left dl dd .save,.qb-left dl dd .gxsSave,.qb-left dl dd .tvcSave{position: absolute;top: 0;left: 0;z-index: 3;width: 600px;height: 96px;border-radius: 10px;background: #fff;}
.qb-left dl dd .save p,.qb-left dl dd .gxsSave p{
	display: inline-block;
	width: 58%;
	margin-left: 126px;
	font-size: 18px;
	color: #545454;
	margin-top: 20px;
}
.qb-left dl dd .gxsSave p{
	display: inline-block;
	width: 58%;
	margin-left: 126px;
	font-size: 16px;
	color: #545454;
	margin-top: 20px;
}
.qb-left dl dd .tvcSave p{
	display: inline-block;
	width: 58%;
	margin-left: 126px;
	font-size: 16px;
	color: #545454;
	margin-top: 14px;
}
.qb-left dl dd .gxsSave p:nth-of-type(2){
	margin-top: 14px;
}
.qb-left dl dd .tvcSave p:nth-of-type(2){
	margin-top: 6px;
}
.qb-left dl dd .gxsSave p span,.qb-left dl dd .tvcSave p span{
	font-size: 16px;
	color: #5c96e9;
}
.qb-left dl dd .gxsSave p label,.qb-left dl dd .tvcSave p label{
	font-size: 12px;
	color: red;
}
.qb-left dl dd .save p:nth-of-type(2){
	font-size: 16px;
	margin-top: 10px;
	color: #5c96e9;
}
.cnytRechargeBox{
	position: fixed;
	top: 0;
	left: 0;
	@include wh(100%,100%);
	background-color: rgba(0,0,0,.5);
	z-index: 10;
}
.cnytRecharge{
	position: fixed;
	top: 50%;
	left: 50%;
	@include wh(800px,470px);
	@include borderRadius(10px);
	transform: translate(-50%, -60%);
	background-color: #fff;
	padding: 30px 30px;
	z-index: 10;
	opacity: 0;
	.close{
		position: absolute;
		top: 15px;
		right: 15px;
		cursor: pointer;
	}
	.popup-head{
		padding: 10px 0 20px 0;
		overflow: hidden;
		.popup-head-left{
			float: left;
			img{
				vertical-align: middle;
				width: 26px;
				margin-top: -6px;
			}
			span{
				font-size: 20px;
			}
		}
		.popup-head-right{
			float: right;
			color:#7E7E7E;
			margin-top: 5px;
		}
	}
	.line{
		position: absolute;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #EBEBEB;
	}
	.popup-body{
		.address{
			margin-top: 20px;
			span{
				color: #86aeee;
			}
		}
		.agent{
			margin-top: 20px;
			overflow: hidden;
			.title{
				span{
					color: #949494;
				}
			}
			div:nth-of-type(5n){
				margin-left: 0;
			}
			div:nth-of-type(1){
				margin-left: 0;
			}
			.item{
				a{
					display: inline-block;
					@include wh(100%,100%);
					color: #000;
				}
			}
			.item{
				float: left;
				width: 26%;
				margin-left: 5%;
				border: 1px solid #AEAEAE;
				margin-top: 20px;
				padding: 10px 12px;
				@include borderRadius(5px);
				.agentName{
					img{
						vertical-align: middle;
					}
					span{
						margin-left: 10px;
					}
				}
				.agentAccount{
					text-align: left;
					margin-top: 6px;
				}
			}
			.item:hover{
				background-color: #1CBCFA;
				border-color: #1CBCFA;
				color: #fff;
				cursor: pointer;
				a{
					color: #fff;
				}
			}
		}
		.explain{
			margin-top: 20px;
			padding: 20px;
			background-color: #F6F6F6;
			.explainName{
				img{
					vertical-align: middle;
				}
				span{
					margin-left: 10px;
				}
			}
			.text{
				margin-top: 10px;
				span{
					color: #F59090;
					font-size: 16px;
					font-weight: 600;
				}
			}
		}
	}
}
.qb-left dl dd .save img{background:#000;width:78px;height:78px;display: block;position: absolute;right: 20px;top: 8px;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.qrCode-box{
	position: absolute;
	@include borderRadius(5px);
	padding: 10px;
	background-color: #fff;
	top: -2px;
	right: 20px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
b{font-weight: normal;}
.qb-left dl dd{width: 580px;height: 96px;border-radius: 10px;background-color: #ffffff;border: solid 1px #b7e1f1;margin-bottom: 20px;position: relative;overflow: hidden;}
.qb-left dl dd .operation{width: 150px;height: 150px;border-radius: 50%;background: #ff8e49;position: absolute;left: -130px;top: -27px;z-index: 5;}
.qb-left dl dd:hover .operation{
	left:-30px;
	transition: left 1s;
	-moz-transition: left 1s;
	-webkit-transition: left 1s;
	-o-transition: left 1s;
}
.qb-left dl dd b:nth-of-type(1){position: absolute;top: 36px;left: 80px; font-size: 20px;color: #06244f;}
.qb-left dl dd b:nth-of-type(2){font-size: 14px;color: #4f4f4f;position: absolute;right: 70px;top: 55px;}
.qb-left dl dd b:nth-of-type(2)>span{font-size: 14px;color: #4f4f4f;}
.qb-left dl dd .operation div{position: absolute;width: 100px;font-size: 14px;color: #ffffff;text-align: center;height: 22px;line-height: 22px;right: 20px;cursor: pointer;}
.qb-left dl dd .operation div:nth-of-type(1){top: 46px;}
.qb-left dl dd .operation div:nth-of-type(2){top: 82px;}
.qb-left dl dd .operation div i{width: 22px;height: 23px;background: url('../../assets/finance/qianbao.png') no-repeat;float: left;;margin-left: 10px;margin-top: -2px;}
.qb-left dl dd .operation div:nth-of-type(1) i{background-position-x: -73px;}
.qb-left dl dd .operation div:nth-of-type(2) i{background-position-x: -115px;}
.qb-left dl dd:last-of-type i{width: 28px;height: 28px;background: url('../../assets/finance/qianbao.png') no-repeat -157px 0;}
.qb-left dl dd:last-of-type span{ font-size: 20px;position: absolute;top: 32px;left: 80px;
  color: #06244f;}
  .qb-left dl dd:last-of-type:hover .operation{left: -130px;}
//添加钱包
.add-box{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,.5);
	z-index: 10;
}
h5{font-weight: normal;}
.add-tab{
	width: 1200px;
	padding: 20px 50px;
	position: absolute;
	top: -100px;
	left: 50%;
	z-index: 11;
	margin-left: -600px;
	border-radius: 10px;
	background: #ffffff;
	border: solid 1px #bde3e4;
	opacity: 0;
	.close{
		position: absolute;
		right: 10px;
		top: 10px;
		cursor: pointer;
	}
}
.add-tab .confirm{
	display: block;
	margin: 0 auto;
	padding: 12px 50px;
	margin-bottom: 30px;
}
.add-tab .had{width: 100%;border-bottom: solid 1px #e5e5e5;margin: 0 auto;}
.add-tab .had h5{font-size: 20px;color: #3d3d3d;margin-top: 27px;margin-bottom: 13px;}
.add-tab  ul{width: 100%;overflow: hidden;padding-top: 25px;padding-bottom: 45px;padding-right: 12px;}
.add-tab  ul li{
	width: 152px;
	height: 42px;
	line-height: 42px;
	border-radius: 5px;
	background: #ffffff;
	border: solid 1px #dadada;
	position: relative;
	float: left;
	margin: 0 14px;
	cursor: pointer;
	margin-bottom: 20px;
	text-align: center;
}
.add-tab  ul li span{font-size: 16px;color: #06244f;}
.add-tab  ul li img{
	width: 24px;
	vertical-align: middle;
	margin-top: -4px;
}
.add-tab .had ul li:hover{border-color: #5c96e9;}
.add-tab .had ul li:hover i{display: block;}
.add-tab .had ul li i{display: none;width: 21px;height: 21px;background: url('../../assets/finance/qianbao.png') -155px -33px;position: absolute;right: -10px;top: -10px;}

.add-tab .need{width: 100%;margin: 0 auto;}
.add-tab .need h5{font-size: 20px;color: #3d3d3d;margin-top: 37px;margin-bottom: 12px;}
.add-tab .need ul li:hover{border-color: #5c96e9;}
.add-tab .need ul li:hover i{display: block;}
.add-tab .need ul li i{display: none;width: 21px;height: 21px;background: url('../../assets/finance/qianbao.png') -176px -33px;position: absolute;right: -10px;top: -10px;}

.mask{width: 100%;height: 100%;background:rgba(204,204,204,0.4) ;position: absolute;top: 0;left: 0;display: none;z-index: 6}

.qb-right{
	float: right;
	width: 460px;
	height: 780px;
	border-radius: 10px;
	background-color: #ffffff;
	border: solid 1px #e4e4e4;
}
.qb-right dl{
	height: 685px;
}
.qb-right td img{
	vertical-align: middle;
	margin-right: 5px;
	width: 20px;
	margin-top:-2px;
}
::-webkit-scrollbar{height: 35px;width: 5px;background: #e9e9e9;}
::-webkit-scrollbar-thumb{background: #5c96e9;border-radius: 5px;}
.qb-right h5{margin-top: 28px;padding-bottom: 34px;font-size: 20px;color: #06244f;padding-left: 18px;border-bottom: 1px solid #d8d8d8;}
.qb-right h5 i{display: inline-block;width: 25px;height: 25px;background: url('../../assets/finance/qianbao.png') no-repeat -125px -34px;position: relative;top: 5px;}
.qb-right dt{display: flex;justify-content:space-around;align-items:center;height: 59px;background: #f9f9f9;margin-bottom: 13px;}
.qb-right span{font-size: 15px;color: #686868;}
.qb-right .more{ width: 314px;background:#6399e6;color: #fff;}
.more{height: 51px;border-radius: 5px;background: #ffffff;border: solid 1px #6399e6;text-align: center;line-height: 51px;display: block; font-size: 17px;color: #3578d7;margin: 0 auto;margin-bottom:57px;margin-top: 34px; }
.more:hover{background:#7EAFF5;color: #fff;}

.qb-mid{width: 620px;min-height: 780px;border-radius: 10px;background: #ffffff;border: solid 1px #ebebeb;float: left;margin-left: 20px;}
.qb-mid .title{display: flex;justify-content:space-around;align-items:center;height: 93px;border-bottom: 1px solid #d8d8d8;}
.qb-mid .title li{color: #676767;}
.qb-mid .title span{font-size: 18px;}
.qb-mid .more{ width: 80%;background:#6399e6;color: #fff;font-size:14px;cursor: pointer;}
.qb-mid .more:hover{background:#7EAFF5;}
.qb-mid .title i{display: inline-block;width: 25px;height: 25px;background: url('../../assets/finance/qianbao.png') no-repeat;position: relative;top: 7px;margin-right: 11px;}
.qb-mid .title li:nth-of-type(1) i{background-position: 0 -33px;}
.qb-mid .title .tradeRecord i{background-position: -43px -33px !important;}
.qb-mid .title .entrustRecord i{background-position: -87px -33px !important;}
.qb-mid table thead,.qb-right table thead{
	width: 100%;
	height: 59px;
	background: #f9f9f9;
}
.qb-mid table thead tr{height: 59px;}
.qb-mid table tbody tr{height: 44px;}
,.qb-right table tr{height: 36px;}
.qb-mid span,.qb-right span{font-size: 14px;color: #686868;}
.qb-mid table,.qb-right table{
	border-collapse:collapse;
	width: 100%;
	text-align: center;
}
.qb-right table{
	tbody{
		a{
			line-height: 36px;
			color: #000;
		}
		tr{
			td:nth-of-type(1){
				width: 30%;
				text-align: left;
				img{
					margin-left: 10px;
				}
			}
		}
		tr:hover{
			cursor: pointer;
			background-color: rgba(0,0,0,.1);
		}
	}
	thead tr{
		td:nth-of-type(1){
			width: 29%;
		}
	}
	tbody {
		display:block;
		height:605px;
		overflow-y:auto;
	}
	thead, tbody tr {
		display:table;
		width:100%;
		table-layout:fixed;
	}
}
//B体现
.withdrawalsPopupBox,.cnytWithdrawalsPopupBox{
	position: fixed;
	top: 0;
	left: 0;
	@include wh(100%,100%);
	background-color: rgba(0,0,0,.5);
	z-index: 10;
}
.withdrawalsPopups{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(560px,410px);
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 80px;
		z-index: 10;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.popup-head{
			padding: 10px 0 20px 0;
			overflow: hidden;
			.popup-head-left{
				float: left;
				img{
					vertical-align: middle;
					width: 26px;
					margin-top: -6px;
				}
				span{
					font-size: 20px;
				}
			}
			.popup-head-right{
				float: right;
				color:#7E7E7E;
				margin-top: 5px;
			}
		}
		.line{
			position: absolute;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: #EBEBEB;
		}
		.popup-body{
			.item{
				margin-top: 20px;
				label{
					display: inline-block;
					width: 80px;
					color:#7E7E7E;
				}
				.input{
					width: 150px;
				}
				.select{
					width: 240px;
				}
				.confirm{
					margin: 0;
					padding: 10px 20px;
				}
				span{
					font-size: 12px;
					color:#7E7E7E;
				}
			}
		}
		.email,.oldemail,.newemail{
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
		.tips{
			position: absolute;
			top: 220px;
			right: 80px;
			width: 160px;
			padding: 10px;
			background-color: #F6F6F6;
		}
		.confirm{
			margin-top: 20px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
			margin-left: 83px;
		}
	}
.cnytWithdrawalsPopups{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(760px,620px);
		@include borderRadius(10px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 30px 30px;
		z-index: 10;
		overflow: hidden;
		opacity: 0;
		.close{
			position: absolute;
			top: 15px;
			right: 15px;
			cursor: pointer;
		}
		.popup-head{
			padding: 10px 0 20px 0;
			overflow: hidden;
			.popup-head-left{
				float: left;
				img{
					vertical-align: middle;
					width: 26px;
					margin-top: -6px;
				}
				span{
					font-size: 20px;
				}
			}
			.popup-head-right{
				float: right;
				color:#7E7E7E;
				margin-top: 5px;
			}
		}
		.line{
			position: absolute;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: #EBEBEB;
		}
		.popup-body{
			float: left;
			.item{
				margin-top: 20px;
				label{
					display: inline-block;
					width: 80px;
					color:#7E7E7E;
				}
				.input{
					width: 150px;
				}
				.select{
					width: 240px;
				}
				.confirm{
					margin: 0;
					padding: 10px 20px;
				}
				span{
					font-size: 12px;
					color:#7E7E7E;
				}
			}
		}
		.popup-explain{
			float: left;
			@include wh(270px,264px);
			margin-top: 20px;
			margin-left: 30px;
			background-color: #F6F6F6;
			padding: 20px;
			.explainName{
				img{
					vertical-align: middle;
				}
				span{
					margin-left: 10px;
					font-size: 16px;
				}
			}
			.text{
				margin-top: 10px;
			}
		}
		.lines{
			float: left;
			margin-top: 20px;
			width: 100%;
			height: 1px;
			background-color: #EBEBEB;
		}
		.agent{
			float: left;
			width: 100%;
			margin-top: 20px;
			overflow: hidden;
			.title{
				span{
					color: #949494;
				}
			}
			div:nth-of-type(5n){
				margin-left: 0;
			}
			div:nth-of-type(1){
				margin-left: 0;
			}
			.item{
				a{
					display: inline-block;
					@include wh(100%,100%);
					color: #000;
				}
			}
			.item{
				float: left;
				width: 27%;
				margin-left: 5%;
				border: 1px solid #AEAEAE;
				margin-top: 20px;
				padding: 10px 8px;
				@include borderRadius(5px);
				.agentName{
					img{
						vertical-align: middle;
					}
					span{
						margin-left: 10px;
					}
				}
				.agentAccount{
					text-align: left;
					margin-top: 6px;
				}
			}
			.item:hover{
				background-color: #1CBCFA;
				border-color: #1CBCFA;
				color: #fff;
				cursor: pointer;
				a{
					color: #fff;
				}
			}
		}
		.email,.oldemail,.newemail{
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
			margin-left: 83px;
		}
	}
//C提现
.ctx{ width: 633px;
  height: 447px;
  border-radius: 10px;display: none;
  background: #ffffff;position: fixed;top: 50%;left: 50%;margin-left: -316px;margin-top:-224px;z-index: 8}
.ctx .hd{border-bottom: 1px solid #c1c1c1;overflow: hidden;}
.ctx .hd p:nth-of-type(1){float: left;font-size: 24px;color: #000;display: flex;justify-content:center;align-items:center;height: 72px;margin-left: 51px;}
.ctx .hd p:nth-of-type(1) span{font-size: 24px;}
.ctx .hd p:nth-of-type(2){float: right;}
.ctx .hd p:nth-of-type(2){font-size: 16px;color: #707070;margin-right: 30px;margin-top: 41px;}
.ctx .selector{width: 343px;height: 41px;margin-top: 32px;}
.ctx .fm>span{margin-left: 66px;margin-right: 26px;font-size: 16px;color: #7e7e7e;}
.ctx .fm .inp{width: 187px;height: 41px!important;margin-top: 21px;}
.ctx .fm p{font-size: 14px;color: #999999;position: absolute;top: 176px;left: 354px;}
.ctx .fm span:nth-of-type(1){margin-left:51px;}
.ctx .fm span:last-of-type{margin-left:51px;}
.ctx .fm .inp:last-of-type{width: 343px;}
.ctx .fm .ti{margin-left: 160px;margin-top: 26px;}
//充值
.qcz{  width: 849px;
  height: 669px;
  border-radius: 10px;display: none;
  background-color: #ffffff;position: fixed;top: 50%;left: 50%;margin-left: -425px;margin-top:-335px;z-index: 8}
.qcz .hd{border-bottom: 1px solid #c1c1c1;overflow: hidden;margin-bottom: 25px;}
.qcz .hd p{font-size: 22px;color: #000;height: 81px;margin-left: 30px;line-height: 81px;}
.qcz ul{overflow: hidden}
.qcz ul li{width: 195px;height: 50px;border-radius: 3px;background-color: #cacaca;border: solid 1px #cacaca;float: left;margin-left: 30px;color:#cacaca;cursor: pointer;margin-bottom: 23px;}
.qcz ul li i{display: inline-block;width: 45px;height: 33px;float: left;background:url('../../assets/finance/qianbao.png')}
.qcz ul li:nth-of-type(1) i{background-position: -392px 0;margin-top: 8px;margin-left: 5px;}
.qcz ul li p{width: 133px;height: 48px;line-height: 48px;text-align: center;background: #fff;margin-left:50px;font-size: 18px}

.qcz ul li:nth-of-type(2) i{background-position: -397px -54px;margin-top: 8px;margin-left: 5px;}
.qcz .in{color: #5c96e9;background:#5c96e9;border: solid 1px #5c96e9; }

.qcz .cz{width: 790px;height: 462px;background-color: #f1f1f1;margin: 0 auto;position: relative;}
.qcz .cz .zfb{display: none;}
.qcz .cz .zfb span{font-size: 18px;color: #686868;}
.qcz .cz .zfb span:nth-of-type(1){margin-left: 38px;}
.qcz .cz .zfb span:nth-of-type(2){margin-left: 21px;}
.qcz .cz .zfb .inu{width: 322px;height: 44px!important;margin-top: 28px;margin-left: 17px;}
.qcz .cz .zfb b{font-size: 18px;color: #072450;margin-left: 19px;}
.qcz .cz .zfb p{font-size: 18px;color: #072450;}
.qcz .cz .zfb p b{margin-left: 0;color: #5c96e9;}
.qcz .cz .zfb p i{display: inline-block;width: 23px;height: 23px;background: url('../../assets/finance/qianbao.png') -398px -93px;position: relative;top: 5px;margin-right: 9px;margin-left: 128px;}
.qcz .cz .zfb img{width:125px;height: 125px;background: #000;display: block;margin-left: 126px;margin-top: 36px;}
.qcz .cz .zfb span:nth-of-type(3){position: relative;top: -116px;left: 286px;color: #072450;}
.qcz .cz .zfb .tobig{  width: 121px;height: 38px;position: relative;top:-75px;left: 127px;font-size: 16px;}
.qcz .cz .zfb .yessave{width: 185px;height: 38px;margin-top: 41px;margin-left: -165px;}
.qcz .cz .zfb a{display: block;width: 167px;height: 158px;position: absolute;top: 92px;right: 39px;}
.qcz .cz .zfb a i{display: inline-block;width: 167px;height: 127px;background: url('../../assets/finance/qianbao.png') -203px 0px;}
.qcz .cz .zfb a p{width: 167px;font-size: 14px;color: #828282;text-align: center;}
.qcz .cz .zfb p:nth-of-type(2){position: absolute;bottom: 21px;right: 40px; font-size: 18px;color: #3a3a3a;cursor: pointer;}
.qcz .cz .zfb p:last-of-type i{background-position:-427px -93px;}

.qcz .cz .yhk1{display: none;}
// .qcz .cz .yhk2{display: none;}
.qcz .cz .yhk3{display: none;}
.qcz .cz .yhk4{display: none;}

.qcz .cz .step .boder{width: 745px;height: 2px;background-color: #c8c8c8;position: absolute;top: 45px;left:50%;margin-left: -373px;z-index: 2}
.qcz .cz .sp{position: absolute;top: 29px;z-index: 4}
.qcz .cz .sp li{width: 32px;height: 32px;border-radius:50%;border:none;background-color: #5c96e9;color: #fff;text-align: center;line-height: 32px;font-size: 18px;margin-left: 150px;}
.qcz .cz .sp li:nth-of-type(1){margin-left: 106px;}
.qcz .cz .step .line{width: 152px;height: 2px;background-color: #5c96e9;position: absolute;top: 45px;z-index: 3}
.qcz .cz .yhk1 .step .line{left:46px;}
.qcz .cz .yhk2 .step .line{left:228px;}
.qcz .cz .yhk3 .step .line{left:407px;}
.qcz .cz .yhk4 .step .line{left:591px;}

.yhk4 i{display: inline-block;width: 192px;height: 155px;background: url('../../assets/finance/qianbao.png') -204px -143px;position: absolute;top: 150px;left: 117px;}
.yhk4 span{font-size: 24px;color: #5c96e9;position: absolute;top: 207px;left: 340px;}
.yhk4 p{font-size: 16px;color: #9e9e9e;position: absolute;top: 264px;left: 338px;}
.yhk4 a{font-size: 16px;color: #5c96e9;position: absolute;top: 214px;left:498px;}

.yhk1 a{display: block;width: 167px;height: 158px;position: absolute;top: 25px;right: 39px;}
.yhk1 a i{display: inline-block;width: 167px;height: 127px;background: url('../../assets/finance/qianbao.png') -203px 0px;}
.yhk1 a p{width: 167px;font-size: 14px;color: #828282;text-align: center;}
.yhk1 .fom>p{position: absolute;bottom: -130px;right: 40px; font-size: 18px;color: #3a3a3a;cursor: pointer;}
.yhk1 .fom>p i{display: inline-block;width: 23px;height: 23px;background: url('../../assets/finance/qianbao.png') -427px -93px;position: relative;top: 5px;margin-right: 9px;margin-left: 128px;}
.yhk1 span{font-size: 18px;color: #686868;margin-left: 22px;}
.yhk1 .inu{width: 322px;height: 44px!important;margin-top: 28px;margin-left: 17px;}
.yhk1 .fom{position: relative;top: 92px;}
.yhk1 b{font-size: 18px;color: #072450;margin-left: 19px;}
.yhk1 .in{width: 185px;height: 41px;color: #fff;font-size: 16px;margin-left: 110px;margin-top: 30px;}

.yhk3 .inu{width: 294px;height: 44px!important;margin-top: 20px;margin-left: 16px;}
.yhk3 a{display: block;width: 167px;height: 158px;position: absolute;top: 54px;right: 39px;}
.yhk3 a i{display: inline-block;width: 167px;height: 127px;background: url('../../assets/finance/qianbao.png') -203px 0px;}
.yhk3 a p{width: 167px;font-size: 14px;color: #828282;text-align: center;}
.yhk3 .fom>p{position: absolute;bottom: -40px;right: 40px; font-size: 18px;color: #3a3a3a;cursor: pointer;}
.yhk3 .fom>p i{display: inline-block;width: 23px;height: 23px;background: url('../../assets/finance/qianbao.png') -427px -93px;position: relative;top: 5px;margin-right: 9px;margin-left: 128px;}
.yhk3 .fom{position: relative;top: 70px;}
.yhk3 span{font-size: 18px;color: #686868;}
.yhk3 span:nth-of-type(1){margin-left: 21px;}
.yhk3 span:nth-of-type(2){margin-left: 57px;}
.yhk3 span:nth-of-type(3){margin-left: 75px;}
.yhk3 span:nth-of-type(4){margin-left: 55px;}
.yhk3 .mit{width: 202px;height: 41px;color: #fff;font-size: 16px;margin-left: 144px;margin-top: 32px;background: #5c96e9;border-color:#5c96e9;}



.yhk2 a{display: block;width: 167px;height: 158px;position: absolute;top: 68px;right: 39px;}
.yhk2 a i{display: inline-block;width: 167px;height: 127px;background: url('../../assets/finance/qianbao.png') -203px 0px;}
.yhk2 a p{width: 167px;font-size: 14px;color: #828282;text-align: center;}
.yhk2 .fom>p{position: absolute;bottom: 0px;right: 40px; font-size: 18px;color: #3a3a3a;cursor: pointer;}
.yhk2 .fom>p i{display: inline-block;width: 23px;height: 23px;background: url('../../assets/finance/qianbao.png') -427px -93px;position: relative;top: 5px;margin-right: 9px;margin-left: 128px;}
.yhk2 .fom{position: relative;top: 92px;}
.yhk2 .fom>span{  font-size: 15px;color: #6b6b6b;margin-left: 22px;}
.yhk2 .fom>span:nth-of-type(2){position: relative;top: 10px;}
.yhk2 .fom .li{ width: 415px;height: 231px;border-radius: 5px;background-color: #ffffff;border: solid 1px #f0f0f0;margin-top:25px;margin-left: 22px;position: relative;}
.yhk2 .fom .li p:nth-of-type(1){margin-top: 26px;margin-left: 86px;}
.yhk2 .fom .li p{margin-top: 18px;color: #8e8e8e;font-size: 15px;}
.yhk2 .fom .li p:nth-of-type(4) span,.yhk2 .fom .li p:nth-of-type(5) span,.yhk2 .fom .li p:nth-of-type(6) span{color: #5c96e9;}
.yhk2 .fom .li p:nth-of-type(2){margin-left: 72px;}
.yhk2 .fom .li p:nth-of-type(3){margin-left: 27px;}
.yhk2 .fom .li p:nth-of-type(4){margin-left: 73px;}
.yhk2 .fom .li p:nth-of-type(5){margin-left: 36px;}
.yhk2 .fom .li p:nth-of-type(6){color: #072450;font-size: 15px;width: 135px;position: absolute;top: 160px;left: 249px;}
.yhk2 .fom .li p:nth-of-type(6) span{margin: 0;}
.yhk2 .fom .li p span{margin-left: 21px}
.yhk2 .fom .li i{display: inline-block;width: 23px;height:23px;background: url('../../assets/finance/qianbao.png') -398px -93px;position: absolute;top: 180px;left: 220px;}
.yhk2 .yi{width: 202px;height: 41px;color: #fff;font-size: 16px;margin-left: 24px;margin-top: 15px;background: #5c96e9;border-color:#5c96e9;}
.add-tab{
	transform: translate3d(0,120px, 0);
    opacity: 1;
}
.fold-enter-active, .fold-leave-active {
    transition: all .5s;
}
.fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.popup{
	transform: translate(-50%, -50%);
    opacity: 1;
}
.folds-enter-active, .folds-leave-active {
    transition: all .5s;
}
.folds-enter, .folds-leave-active {
    transform: translate(-50%, -60%);
    opacity: 0;
}
</style>
