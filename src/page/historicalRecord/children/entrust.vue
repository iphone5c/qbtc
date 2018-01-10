<template>
	<div class="entrust">
		<div class="title">
			<p>{{$t("history_page.43")}}</p>
			<div class="line"></div>
		</div>
		<table cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<td>{{$t("history_page.2")}}</td>
					<td>{{$t("history_page.3")}}</td>
					<td>{{$t("history_page.4")}}</td>
					<td>{{$t("history_page.5")}}</td>
					<td>{{$t("history_page.6")}}</td>
					<td>{{$t("history_page.7")}}</td>
					<td>{{$t("history_page.8")}}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-if="!isList" v-for="data in entrustList">
					<td>{{data.createTime}}</td>
					<td>{{data.fentrustType}}</td>
					<td>{{data.status}}</td>
					<td>{{data.coinAndMarket}}</td>
					<td>{{data.price}}</td>
					<td>{{data.amount}}</td>
					<td>{{data.yesAmount}}</td>
				</tr>
				<tr v-if="isList">
					<td colspan="7" class="no-data-tips">{{$t("history_page.9")}}</td>
				</tr>
			</tbody>
		</table>
		<div class="pagingStrip" v-if="isPage">
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
import {getEntrustList} from '@/utils/api'
	export default {
	  	data () {
	    	return {
	    		isList: false,
	    		total: 1,
				pageIndex: 1,
				entrustList: [],
				isPage: false,
	    	}
	  	},
	  	mounted: function () {
	  		this.getEntrust();
	  	},
	  	methods: {
	  		// 获得委托记录
	  		async getEntrust(){
	  			let res = await getEntrustList(this.pageIndex,10);
	  			if(!res){
	  				return
	  			}
	  			var datas = JSON.parse(res.result);
	  			this.entrustList = datas.rows;
	  			if(datas.rows.length == 0){
	  				this.isList = true;
	  			}else{
	  				this.isPage = true;
	  			}
	  			this.total =parseInt(datas.totalPage) * 10;
	  		},
	  		async nextPage(val){
				this.pageIndex = val;
				this.getEntrust();
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
	.entrust{
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