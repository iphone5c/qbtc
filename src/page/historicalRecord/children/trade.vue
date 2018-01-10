<template>

	<div class="trade">
		<div class="title">
			<p>{{$t("history_page.45")}}</p>
			<div class="line"></div>
		</div>
		<table cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<td>{{$t("history_page.18")}}</td>
					<td>{{$t("history_page.19")}}</td>
					<td>{{$t("history_page.20")}}</td>
					<td>{{$t("history_page.21")}}</td>
					<td>{{$t("history_page.22")}}</td>
					<td>{{$t("history_page.23")}}</td>
					<td>{{$t("history_page.24")}}</td>
					<td>{{$t("history_page.25")}}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="data in tradeList" v-if="!isList">
					<td>{{data.createTime}}</td>
					<td>{{data.fentrustType}}</td>
					<td>{{data.coinAndMarket}}</td>
					<td>{{data.price}}</td>
					<td>{{data.amount}}</td>
					<td>{{data.yesAmount}}</td>
					<td>{{data.yesPrice}}</td>
					<td>{{data.status}}</td>
				</tr>
				<tr v-if="isList">
					<td colspan="8" class="no-data-tips">{{$t("history_page.9")}}</td>
				</tr>
			</tbody>
		</table>
		<div class="pagingStrip"  v-if="isPage">
			<el-pagination
				layout="prev, pager, next"
				:total="total"
				@current-change="nextPage"
				:current-page="pageIndex">
			</el-pagination>
		</div>
	</div>

</template>

<script>
import {getTradeList} from '@/utils/api'
	export default {
	  	data () {
	    	return {
	    		isList: false,
	    		total: 1,
				pageIndex: 1,
				tradeList: [],
				isPage: false,
	    	}
	  	},
	  	mounted: function () {
	  		this.getTrade();
	  	},
	  	methods: {
	  		// 获得交易记录
	  		async getTrade(){
	  			let res = await getTradeList(this.pageIndex,10);
	  			if(!res){
	  				return
	  			}
	  			var datas = JSON.parse(res.result);
	  			if(datas.rows.length == 0){
	  				this.isList = true;
	  			}else{
	  				this.isPage = true;
	  			}
	  			this.tradeList = datas.rows;
	  			this.total =parseInt(datas.totalPage) * 10;
	  		},
	  		async nextPage(val){
				this.pageIndex = val;
				this.getTrade();
			},
	  	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../../style/mixin';
	.pagingStrip{
		padding: 30px 0 10px 0;
		text-align: center;
	}
	.trade{
		width: 1200px;
		min-height: 412px;
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
				width: 1000px;
				height: 1px;
				background-color: #EEEEEE;
				margin-top: 10px;
			}
		}
		table{
			width: 100%;
			text-align: center;
			border: 1px solid #EBEBEB;
			@include borderRadius(10px);
			thead tr{
				background-color: #F9F9F9;
			}
			tr{
				height: 40px;
			}
			.no-data-tips{
				padding: 100px 0;
			}
		}
	}
</style>
