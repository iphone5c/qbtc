<template>
	<div>
	<my-header></my-header>
		<div class="about-wrapper">
			<div class="banner">
				<div class="title">
					{{$t("about_page.about_title")}}
				</div>
				<div class="text">
					{{$t("about_page.about_info")}}
				</div>
			</div>
			<div class="guarantee">
				<div class="title">
					{{$t("about_page.guarantee_title")}}
				</div>
				<div class="text">
					{{$t("about_page.guarantee_major")}}<br/>
					{{$t("about_page.guarantee_security")}}<br/>
					{{$t("about_page.guarantee_user")}}
				</div>
				<div class="graphical">
					<img src="../../assets/about/major.png" alt="">
					<img src="../../assets/about/security.png" alt="">
					<img src="../../assets/about/user.png" alt="">
				</div>
			</div>
			<div class="idea">
				<div class="title">
					{{$t("about_page.idea_title")}}
				</div>
				<div class="text">
					{{$t("about_page.idea_info")}}
				</div>
			</div>
			<div class="btc-data">
				<div class="title">
					{{$t("about_page.data_title")}}
				</div>
				<div class="text">
					{{$t("about_page.data_info_one")}}<br/>
					<br/>

					{{$t("about_page.data_info_two")}}<br/>
					<br/>
					{{$t("about_page.data_info_three")}}<br/>
					{{$t("about_page.data_info_four")}}<br/>
					{{$t("about_page.data_info_five")}}<br/>
					{{$t("about_page.data_info_six")}}<br/>
					{{$t("about_page.data_info_seven")}}<br/>
					{{$t("about_page.data_info_eight")}}<br/>
					<br/>
					{{$t("about_page.data_info_nine")}}


				</div>
			</div>
			<div class="wrapper-body">
				
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
	.about-wrapper{
		width: 100%;
		background-color: #fff;
		.banner{
			@include wh(100%,482px);
			background: url("../../assets/about/banner.jpg") no-repeat center top;
			text-align: center;
			padding-top: 120px;
			div{
				width: 930px;
				margin: 0 auto;
				color: #fff;
				
			}
			.title{
				font-size: 42px;
			}
			.text{
				margin-top: 30px;
				line-height: 26px;
			}
		}
		.guarantee{
			width: 930px;
			margin: 0 auto;
			text-align: center;
			padding: 80px 0;
			.title{
				font-size: 42px;
				color: #30a5d4;
			}
			.text{
				line-height: 26px;
				margin-top: 30px;
			}
			.graphical{
				margin-top: 50px;
				img:first-child{
					float: left;
					margin-left: 100px;
				}
				img:last-child{
					float: right;
					margin-right: 100px;
				}
			}
		}
		.idea{
			@include wh(100%,404px);
			background: url("../../assets/about/idea.jpg") no-repeat center top;
			text-align: center;
			padding-top: 120px;
			color: #fff;
			div{
				width: 930px;
				margin: 0 auto;
			}
			.title{
				font-size: 42px;
			}
			.text{
				margin-top: 30px;
				line-height: 26px;

			}
		}
		.btc-data{
			width: 930px;
			margin: 0 auto;
			padding: 80px 0;
			.title{
				font-size: 42px;
				color: #30a5d4;
				text-align: center;
			}
			.text{
				line-height: 26px;
				margin-top: 30px;
			}
		}
		.wrapper-body{
			width: 1200px;
			margin: 0 auto;

		}
	}
</style>
