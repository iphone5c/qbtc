<template>
	<div>
	<my-header></my-header>
		<div class="rate-wrapper">
			<div class="banner">
				<p>{{$t("rate_page.1")}}</p>
			</div>
			<div class="head"></div>
			<table>
				<thead>
					<tr>
						<td>{{$t("rate_page.2")}}</td>
						<td>{{$t("rate_page.3")}}</td>
						<td>{{$t("rate_page.4")}}</td>
						<td>{{$t("rate_page.5")}}</td>
						<td>{{$t("rate_page.6")}}</td>
						<td>{{$t("rate_page.7")}}</td>
						<td>{{$t("rate_page.8")}}</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in rateInfo">
						<td><img :src="(data.coinlogo)" alt="">{{data.shortName}}</td>
						<td>{{data.name}}</td>
						<td>{{data.tradefee}}%</td>
						<td>{{data.withdrawfee}}%</td>
						<td>{{data.leastWithdraw}} {{data.shortName}}</td>
						<td>{{data.minwithdrawfee}} {{data.shortName}}</td>
						<td>{{data.donate}}%</td>
					</tr>
				</tbody>
			</table>
		</div>
	<my-footer></my-footer>
	</div>

</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import {getAbountInfo} from '@/utils/api'
export default {
	name: 'hello',
	data() {
		return {
			rateInfo:[],
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
		this.getRateInfo();
	},
	methods: {
		async getRateInfo(){
			let res = await getAbountInfo(5);
			if(!res){
				return
			}
			this.rateInfo = res.result;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.rate-wrapper{
		.banner{
			@include wh(100%,239px);
			background: url('../../assets/rate/banner.png') no-repeat center top;
			text-align: center;
			line-height: 239px;
			color: #fff;
			p{
				font-size: 32px;
			}
			
		}
		.head{
			position: absolute;
			width: 100%;
			height: 50px;
			background-color: #F0F0F0;
			z-index: 0;
			border-bottom: 1px solid #7C7C7C;
		}
		table{
			position: relative;
			z-index: 1;
			width: 1200px;
			margin: 0 auto;
			border-collapse:collapse;
			thead{
				tr{
					width: 100%;
					height: 50px;
					color: #5f5f5f;
				}
			}
			tbody{
				tr{
					width: 100%;
					height: 50px;
					border-bottom: 1px solid #E3E3E3;
					td{
						color: #5f5f5f;
						img{
							width: 14px;
							margin-top: -3px;
							margin-right: 20px;
							vertical-align: middle;
						}
					}
					td:last-child{
						color: #fd5c6b;
					}
				}
			}
		}
	}
</style>
