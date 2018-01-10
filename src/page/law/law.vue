<template>
	<div>
	<my-header></my-header>
		<div class="wrapper">
			<div class="law-wrapper">
				<div class="title">
					<div class="left-line"></div>
					<p>{{$t("law_page.1")}}</p>
					<div class="right-line"></div>
				</div>
				<div class="tips">
					<p>{{$t("law_page.2")}}</p>
					<p>
						{{$t("law_page.3")}}
					</p>
				</div>
				<div class="item">
					<p>{{$t("law_page.4")}}</p>
					<p>{{$t("law_page.5")}}</p>
					<p>{{$t("law_page.6")}}</p>
					<p>{{$t("law_page.7")}}</p>
				</div>
				<div class="item item1">
					<div class="title">
						{{$t("law_page.8")}}
					</div>
					<p>{{$t("law_page.9")}}</p>
					<p>{{$t("law_page.10")}}</p>
					<p>{{$t("law_page.11")}}</p>
					<p>{{$t("law_page.12")}}</p>
					<p>{{$t("law_page.13")}}</p>
					<p>{{$t("law_page.14")}}</p>
					<p>{{$t("law_page.15")}}</p>
					<p>{{$t("law_page.16")}}</p>
					<p>{{$t("law_page.17")}}</p>
					<p>{{$t("law_page.18")}}</p>
					<p>{{$t("law_page.19")}}</p>
				</div>
				<div class="item item2">
					<div class="title">
						{{$t("law_page.20")}}
					</div>
					<p>
						{{$t("law_page.21")}}
					</p>
					<p>
						{{$t("law_page.22")}}
					</p>
					<p>
						{{$t("law_page.23")}}
					</p>
					<p>
						{{$t("law_page.24")}}
					</p>
					<p>
						{{$t("law_page.25")}}
					</p>
				</div>
				<div class="item item1">
					<div class="title">
						{{$t("law_page.26")}}
					</div>
					<p>
						{{$t("law_page.27")}}
					</p>
					<p>
						 {{$t("law_page.28")}}
					</p>
				</div>
				<div class="item item2">
					<div class="title">
						{{$t("law_page.29")}}
					</div>
					<p>
						{{$t("law_page.30")}}{{$t("law_page.31")}}
					</p>
					<p>{{$t("law_page.32")}}</p>
					<p>
						{{$t("law_page.33")}}
					</p>
					<p>
						{{$t("law_page.34")}}
					</p>
					<p>
						{{$t("law_page.35")}}
					</p>
					<p>
						{{$t("law_page.36")}}
					</p>
					<p>
						{{$t("law_page.37")}}
					</p>
					<p>
						{{$t("law_page.38")}}
					</p>
					<p>
						{{$t("law_page.39")}}
					</p>
				</div>
				<div class="item item1">
					<div class="title">
						{{$t("law_page.40")}}
					</div>
					<p>
						{{$t("law_page.41")}}
					</p>
					<p>
						{{$t("law_page.42")}}
					</p>
					<p>
						{{$t("law_page.43")}}{{$t("law_page.44")}}
					</p>
					<p>
						{{$t("law_page.45")}}
					</p>
					<p>
						{{$t("law_page.46")}}
					</p>
					<p>
						{{$t("law_page.47")}}
					</p>
				</div>
				<div class="item item2">
					<div class="title">
						{{$t("law_page.48")}}
					</div>
					<p>
						{{$t("law_page.49")}}
					</p>
				</div>
				<div class="item item1">
					<div class="title">
						{{$t("law_page.50")}}
					</div>
					<p>
						{{$t("law_page.51")}}
					</p>
					<p>
						{{$t("law_page.52")}}
					</p>
					<p>
						{{$t("law_page.53")}}
					</p>
					<p>
						{{$t("law_page.54")}}
					</p>
					<p>
						{{$t("law_page.55")}}
					</p>
					<p>
						{{$t("law_page.56")}}
					</p>
				</div>
				<div class="item item2">
					<div class="title">
						{{$t("law_page.57")}}
					</div>
					<p>
						{{$t("law_page.58")}}
					</p>
					<p>
						{{$t("law_page.59")}}
					</p>
					<p>
						{{$t("law_page.60")}}
					</p>
					<p>
						{{$t("law_page.61")}}
					</p>
					<p>
						{{$t("law_page.62")}}
					</p>
					<p>
						{{$t("law_page.63")}}
					</p>
					<p>
						{{$t("law_page.64")}}
					</p>
					<p>
						{{$t("law_page.65")}}
					</p>
					<p>
						{{$t("law_page.66")}}
					</p>
					<p>
						{{$t("law_page.67")}}
					</p>
					<p>
						{{$t("law_page.68")}}
					</p>
					<p>
						{{$t("law_page.69")}}
					</p>
					<p>
						{{$t("law_page.70")}}
					</p>
				</div>
				<div class="item item1">
					<div class="title">
						{{$t("law_page.71")}}
					</div>
					<p>
						{{$t("law_page.72")}}
					</p>
					<p>
						{{$t("law_page.73")}}
					</p>
				</div>
				<div class="item item2">
					<div class="title">
						{{$t("law_page.74")}}
					</div>
					<p>
						{{$t("law_page.75")}}
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
			lawInfo:'',
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
		// this.getLawInfo();
	},
	methods: {
		async getLawInfo(){
			let res = await getAbountInfo(4);
			if(!res){
				return
			}
			this.lawInfo = res.result[0].link;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.wrapper{
		width: 100%;
		min-height: 4000px;
		background: url('../../assets/law/banner.jpg') no-repeat center top;
		padding-bottom: 50px;
	}
	.law-wrapper{
		width: 1200px;
		margin: 0 auto;
		color: #fff;
		>.title{
			overflow: hidden;
			padding-top: 50px;
			.left-line,.right-line{
				float: left;
				margin-top: 6px;
				width: 40%;
				height: 12px;
				border-top: 1px solid #FFFFFF;
				border-bottom: 1px solid #FFFFFF;
			}
			p{
				float: left;
				width: 20%;
				text-align: center;
				font-size: 18px;
			}
		}
		.tips{
			margin-top: 20px;
			padding: 0 200px;
			p:first-child{
				text-align: center;
			}
			p:last-child{
				margin-top: 12px;
			}
		}
		.item{
			position: relative;
			padding: 40px 30px;
			border: 1px solid #266CE3;
			border-radius: 5px;
			margin: 60px 0;
			p{
				margin-top: 6px;
			}
			.title{
				position: absolute;
				width: 140px;
				height: 40px;
				background-color: #3C7DEB;
				border-radius: 40px;
				text-align: center;
				line-height: 40px;
				top: -20px;
			}
		}
		.item1 .title{
			left: -20px;
		}
		.item2 .title{
			right: -20px;
		}
	}
</style>
