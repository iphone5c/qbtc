<template>
	<div class="withdrawals">
		<div class="title">
			<p>{{$t("history_page.46")}}</p>
			<div class="line"></div>
		</div>
		<table cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<td>{{$t("history_page.28")}}</td>
					<td>{{$t("history_page.29")}}</td>
					<td>{{$t("history_page.31")}}</td>
					<td>{{$t("history_page.32")}}</td>
					<td>{{$t("history_page.33")}}</td>
					<td>{{$t("history_page.34")}}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-if="!isList" v-for="(data,index) in withdrawalsList">
					<td>{{data.createTime}}</td>
					<td>{{data.shortName}}</td>
					<td>{{data.amount}}</td>
					<td :class="{statusColor:((data.status) == 5)}">{{data.statusMessage}} <el-button v-if="(data.status) == 5" class="cancel" type="primary" @click="cancelWithdrawals(index)">{{$t("history_page.35")}}</el-button></td>
					<td>{{data.fee}}</td>
					<td>{{data.withdrawAddress}}</td>
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
import {getWithdrawList,cancelVirtualWithdraw} from '@/utils/api'
	export default {
	  	data () {
	    	return {
	    		findpaw_page: [this.$t('history_page.37'),this.$t('history_page.38'),this.$t('history_page.39'),this.$t('history_page.40'),this.$t('history_page.41')],
	    		isList: false,
	    		total: 1,
				pageIndex: 1,
				withdrawalsList: [],
				isPage: false,
	    	}
	  	},
	  	mounted: function () {
	  		this.getWithdrawals();
	  	},
	  	methods: {
	  		// 获得交易记录
	  		async getWithdrawals(){
	  			let res = await getWithdrawList(this.pageIndex,10);
	  			if(!res){
	  				return
	  			}
	  			var datas = JSON.parse(res.result);
	  			if(datas.list.length == 0){
	  				this.isList = true;
	  			}else{
	  				this.isPage = true;
	  			}
	  			this.withdrawalsList = datas.list;
	  			this.total = parseInt(datas.pageCount) * 10;
	  		},
	  		async nextPage(val){
				this.pageIndex = val;
				this.getWithdrawals();
			},
			// 取消提现
			async cancelWithdrawals(index){
				var code = this.withdrawalsList[index].code;
				const h = this.$createElement;
		        this.$msgbox({
		        	title: this.findpaw_page[0],
		        	message: h('p', null, [
		            	h('span', null, this.findpaw_page[1]),
		            ]),
		          	showCancelButton: true,
		          	confirmButtonText: this.findpaw_page[2],
		          	cancelButtonText: this.findpaw_page[3],
		         	beforeClose: async(action, instance, done) => {
		            if (action === 'confirm') {
		                let res = await cancelVirtualWithdraw(code);
		            	if(!res){
			  				return
			  			}
			  			this.getWithdrawals();
			  			this.$message.success(this.findpaw_page[4]);
			    		done();
		            }else{
				      	done();
				    }
		          }
		        })
			}
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
	.withdrawals{
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
			.statusColor{
				color: #5C96E9;
			}
			.cancel{
				padding: 4px 6px;
				border-radius: 0;
				background-color: #fff;
				color: #5C96E9;
				margin-left: 5px;
			}
			.cancel:hover{
				background-color: #5C96E9;
				color: #fff;
			}
		}
	}
</style>
