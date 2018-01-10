<template>
	<div>
	<my-header></my-header>
		<div class="wrapper">
			<div class="banner">
				<div class="title">
					{{$t("shareholder_page.1")}}
				</div>
			</div>
			<div class="wrapper-item">
				<div class="item">
					<div class="logo">
						<img src="../../assets/shareholder/qbtc.jpg" alt="">
					</div>
					<p class="title">Cupid Network Technology Ltd</p>
					<p class="text">
						{{$t("shareholder_page.2")}}
					</p>
				</div>
				<div class="item">
					<div class="logo">
						<img src="../../assets/shareholder/btc123.jpg" alt="">
					</div>
					<p class="title">{{$t("shareholder_page.3")}}</p>
					<p class="text">
						{{$t("shareholder_page.4")}}
					</p>
				</div>
				<div class="item">
					<div class="logo">
						<img src="../../assets/shareholder/zytz.jpg" alt="">
					</div>
					<p class="title">{{$t("shareholder_page.5")}}</p>
					<p class="text">
						{{$t("shareholder_page.6")}}
					</p>
				</div>
			</div>
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
			aboutInfo:'',
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
		// this.getAboutInfo();
	},
	methods: {
		// async getAboutInfo(){
		// 	let res = await getAbountInfo(2);
		// 	if(!res){
		// 		return
		// 	}
		// 	this.aboutInfo = res.result[0].link;
		// }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.wrapper{
		width: 100%;
		letter-spacing: 2.6px;
		background-color: #fff;
		padding-bottom: 60px;
		.banner{
			@include wh(100%,409px);
			background: url("../../assets/shareholder/banner.jpg") no-repeat center top;
			text-align: center;
			padding-top: 180px;
			div{
				width: 930px;
				margin: 0 auto;
				color: #fff;
				
			}
			.title{
				font-size: 42px;
			}
		}
		.wrapper-item{
			width: 1200px;
			margin: 0 auto;
			text-align: center;
		}
		.wrapper-item .item{
			position: relative;
			padding: 30px 20px;
			border: 1px dashed #92B7F5;
			margin-top: 120px;
			padding-top: 100px;
		}
		.wrapper-item .item .logo{
			position: absolute;
			top: -55px;
			left: 50%;
			margin-left: -160px;
			padding: 0 40px;
			background-color: #fff;
		}
		.wrapper-item .item .title{
			font-size: 16px;
		}
		.wrapper-item .item .text{
			color: #6f6f6f;
			margin-top: 26px;
		}
	}
</style>
