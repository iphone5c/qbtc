<template>
	<div>
		<my-header></my-header>
		<div class="wiki-wrapper">
			<div class="banner">
				<p>{{$t("wiki_page.1")}}</p>
			</div>
			<div class="apiItem">
				<p class="text">{{$t("wiki_page.2")}}</p>
				<div class="list">
					<div class="listTitle">
						<span>{{$t("wiki_page.3")}}</span>
						<span>{{$t("wiki_page.4")}}</span>
					</div>
					<div class="list-list">
						<div class="list-list-title" @click="listOne = !listOne"> 
							<span>POST /json/topQuotations.do</span>
							<span>{{$t("wiki_page.5")}}</span>
						</div>
						<div class="list-detail" v-if="listOne">
							<p>POST http://www.qbtc.com/json/topQuotations.do?tradeMarket=BTC&symbol=HSR</p>
							<div class="title mini">{{$t("wiki_page.6")}}</div>
							<pre># Request 
http://www.qbtc.com/json/topQuotations.do?tradeMarket=BTC&symbol=HSR
# Response
{
	"statusCode":200,
	"message":"{{$t("wiki_page.1")}}",
	"result":{
			"last":0.00167,
			"high":0.00172,
			"low":0.00165,
			"volume":2011.21,
			"buyone":0.00166,
			"sellone":0.00167
		}
}
							</pre>
							<div class="title mini">{{$t("wiki_page.8")}}</div>
							<pre>
statusCode : {{$t("wiki_page.9")}}
message : {{$t("wiki_page.10")}}

last : {{$t("wiki_page.11")}}
hight : {{$t("wiki_page.12")}}
low : {{$t("wiki_page.13")}}
volume : {{$t("wiki_page.14")}}
buyone : {{$t("wiki_page.15")}}
sellone : {{$t("wiki_page.16")}}
							</pre>
							<div class="title mini">{{$t("wiki_page.17")}}</div>
							<div class="list-title">
								<span>{{$t("wiki_page.18")}}</span>
								<span>{{$t("wiki_page.19")}}</span>
							</div>
							<div class="list-list-list">
								<span>tradeMarket</span>
								<span>{{$t("wiki_page.20")}}</span>
							</div>
							<div class="list-list-list">
								<span>symbol</span>
								<span>{{$t("wiki_page.21")}}</span>
							</div>
						</div>
					</div>
					<div class="list-list">
						<div class="list-list-title" @click="listTwo = !listTwo">
							<span>POST /json/depthTable.do</span>
							<span>{{$t("wiki_page.22")}}</span>
						</div>
						<div class="list-detail" v-if="listTwo">
							<p>POST http://www.qbtc.com/json/depthTable.do?tradeMarket=BTC&symbol=HSR</p>
							<div class="title mini">{{$t("wiki_page.6")}}</div>
							<pre># Request 
POST http://www.qbtc.com/json/depthTable.do?tradeMarket=BTC&symbol=HSR
# Response
{
	"statusCode":200,
	"message":"{{$t("wiki_page.7")}}",
	"result":{
		"buy":[
				{"amount":"10","price":"0.00166"},
				{"amount":"11","price":"0.00165"},
				{"amount":"23","price":"0.00164"},
				{"amount":"23","price":"0.00161"}
			],
		"sell":[
				{"amount":"20","price":"0.00167"},
				{"amount":"16.42","price":"0.00169"},
				{"amount":"42.15","price":"0.0017"}
			]
	}
}
							</pre>
							<div class="title mini">{{$t("wiki_page.8")}}</div>
							<pre>
statusCode : {{$t("wiki_page.9")}}
message : {{$t("wiki_page.10")}}

buy : {{$t("wiki_page.23")}}
sell : {{$t("wiki_page.24")}}
amount : {{$t("wiki_page.28")}}
price : {{$t("wiki_page.29")}}
							</pre>
							<div class="title mini">{{$t("wiki_page.17")}}</div>
							<div class="list-title">
								<span>{{$t("wiki_page.18")}}</span>
								<span>{{$t("wiki_page.19")}}</span>
							</div>
							<div class="list-list-list">
								<span>tradeMarket</span>
								<span>{{$t("wiki_page.20")}}</span>
							</div>
							<div class="list-list-list">
								<span>symbol</span>
								<span>{{$t("wiki_page.21")}}</span>
							</div>
						</div>
					</div>
					<div class="list-list">
						<div class="list-list-title" @click="listThree = !listThree">
							<span>POST /json/recentDealList.do</span>
							<span>{{$t("wiki_page.25")}}</span>
						</div>
						<div class="list-detail" v-if="listThree">
							<p>POST http://www.qbtc.com/json/recentDealList.do?tradeMarket=BTC&symbol=HSR</p>
							<div class="title mini">{{$t("wiki_page.6")}}</div>
							<pre># Request 
POST http://www.qbtc.com/json/recentDealList.do?tradeMarket=BTC&symbol=HSR
# Response
{
"statusCode":200,
"message":"{{$t("wiki_page.7")}}",
"result":[
		{"amount":"3","totalPrice":"0.00501","createTime":1509088825180,"price":"0.00167","entrustType":2},
		{"amount":"20","totalPrice":"0.0334","createTime":1509088798679,"price":"0.00167","entrustType":1},
		{"amount":"12","totalPrice":"0.02004","createTime":1509088764107,"price":"0.00167","entrustType":2},
		{"amount":"11","totalPrice":"0.01848","createTime":1509088719184,"price":"0.00168","entrustType":2}
	]
}
							</pre>
							<div class="title mini">{{$t("wiki_page.8")}}</div>
							<pre>
statusCode : {{$t("wiki_page.9")}}
message : {{$t("wiki_page.10")}}

amount : {{$t("wiki_page.28")}}
totalPrice : {{$t("wiki_page.30")}}
createTime : {{$t("wiki_page.26")}}
price : {{$t("wiki_page.29")}}
entrustType : {{$t("wiki_page.27")}}
							</pre>
							<div class="title mini">{{$t("wiki_page.17")}}</div>
							<div class="list-title">
								<span>{{$t("wiki_page.18")}}</span>
								<span>{{$t("wiki_page.19")}}</span>
							</div>
							<div class="list-list-list">
								<span>tradeMarket</span>
								<span>{{$t("wiki_page.20")}}</span>
							</div>
							<div class="list-list-list">
								<span>symbol</span>
								<span>{{$t("wiki_page.21")}}</span>
							</div>
						</div>
					</div>
			    </div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
export default {
	name: 'hello',
	data() {
		return {
			listOne: false,
			listTwo: false,
			listThree: false,
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
	},
	methods: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.wiki-wrapper{
		.banner{
			position: relative;
			z-index: 0;
			width: 100%;
			height: 282px;
			background: url("../../assets/wiki/banner.png") no-repeat center top;
			p{
				text-align: center;
				color: #fff;
				line-height: 282px;
				font-size: 32px;
			}
		}
		.apiItem{
			position: relative;
			z-index: 2;
			width: 1200px;
			margin: 100px auto;
			border-radius: 10px;
		    font-size: 12px;
		    padding: 60px 20px;
		    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    		-moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    		-webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    		margin-top: -30px;
    		background-color: #fff;
		    .title {
			    height: 40px;
			    line-height: 40px;
			    font-size: 20px;
			    color: #333;
			    font-weight: bold;
			    color: #333;
			}
			.text {
			    margin-top: 20px;
			    margin-bottom: 10px;
			    color: #656d78;
			}
			.listTitle {
			    width: 100%;
			    background: #f1f1f1;
			    line-height: 18px;
			    color: #333333;
			    text-align: left;
			    vertical-align: top;
			    border-top: 1px solid #dee0e0;
			    border-bottom: 1px solid #dee0e0;
			    padding: 8px 20px;
			    font-weight: bold;
			    margin-top: 30px;
			}
			.list span {
			    display: inline-block;
			    width: 48%;
			}
			.list-list {
			    width: 100%;
			    padding: 8px 20px;
			    border-bottom: 1px solid #dee0e0;
			    line-height: 20px;
			    color: #434a54;
			    .list-list-title:hover{
			    	cursor: pointer;
					color: #5c96e9;
				}
			    .list-detail {
				    width: 100%;
				    padding-top: 10px;
				    .title.mini {
					    font-size: 16px;
					}
					pre {
					    display: block;
					    padding: 8px;
					    margin: 0 0 8.5px;
					    font-size: 11px;
					    line-height: 1.42857143;
					    word-break: break-all;
					    word-wrap: break-word;
					    color: #333333;
					    background-color: #f5f5f5;
					    border: 1px solid #cccccc;
					    border-radius: 4px;
					}
					.list-title {
					    padding: 8px 20px;
					    border-bottom: 1px solid #dee0e0;
					    line-height: 20px;
					    color: #434a54;
					}
					.list-list-list {
					    padding: 8px 20px;
					    border-bottom: 1px solid #dee0e0;
					    line-height: 20px;
					    color: #434a54;
					}
					
				}
			}
		}
	}
</style>
