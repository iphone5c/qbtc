<template>

	<div class="recharge">
		<div class="title">
			<p>{{$t("history_page.44")}}</p>
			<div class="line"></div>
		</div>
		<table cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<td>{{$t("history_page.11")}}</td>
					<td>{{$t("history_page.13")}}</td>
					<td>{{$t("history_page.14")}}</td>
					<td>{{$t("history_page.15")}}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-if="!isList" v-for="data in rechargeList">
					<td>{{data.createTime}}</td> 
					<td>{{data.shortName}}</td>
					<td>{{data.amount}}</td>
					<td>{{data.status}}</td>
				</tr>
				<tr v-if="isList">
					<td colspan="5" class="no-data-tips">{{$t("history_page.9")}}</td>
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
import {getChargeList} from '@/utils/api'
	export default {
	  	data () {
	    	return {
	    		isList: false,
	    		total: 1,
				pageIndex: 1,
				rechargeList: [],
				isPage: false,
	    	}
	  	},
	  	mounted: function () {
	  		this.getRecharge();
	  	},
	  	methods: {
	  		// 获得交易记录
	  		async getRecharge(){
	  			let res = await getChargeList(this.pageIndex,10);
	  			if(!res){
	  				return
	  			}
	  			var datas = JSON.parse(res.result);
	  			if(datas.list.length == 0){
	  				this.isList = true;
	  			}else{
	  				this.isPage = true;
	  			}
	  			this.rechargeList = datas.list;
	  			this.total =parseInt(datas.pageCount) * 10;
	  		},
	  		async nextPage(val){
				this.pageIndex = val;
				this.getRecharge();
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
	.recharge{
		width: 1200px;
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
