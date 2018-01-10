<template>
	<div>
	<my-header></my-header>
		<div class="help-wrapper">
			<div class="banner">
				<div class="title">
					{{$t("help_page.1")}}
				</div>
				<div class="text">
					<span></span>
					<ul>
						<li @click="registerJump">{{$t("help_page.2")}}</li>
						<li @click="findpawJump">{{$t("help_page.3")}}</li>
						<li @click="rechargeJump">{{$t("help_page.4")}}</li>
						<li @click="withdrawalsJump">{{$t("help_page.5")}}</li>
						<li @click="googleJump">{{$t("help_page.6")}}</li>
					</ul>
					<span></span>
				</div>
			</div>
			<div class="step-wrapper" id="register">
				<div class="step-title">
					<div class="line-left"></div>
					<span>{{$t("help_page.7")}}</span>
					<div class="line-right"></div>
				</div>
				<div class="item">
					<p class="item-title"><span>1</span> {{$t("help_page.8")}}</p>
					<img src="../../assets/help/register1.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>2</span> {{$t("help_page.9")}}</p>
					<img src="../../assets/help/register2.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>3</span> {{$t("help_page.10")}}</p>
					<img src="../../assets/help/register3.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>4</span> {{$t("help_page.11")}}</p>
					<img src="../../assets/help/register4.png" alt="">
				</div>
			</div>
			<div class="step-wrapper" id="findpaw">
				<div class="step-title">
					<div class="line-left"></div>
					<span>{{$t("help_page.12")}}</span>
					<div class="line-right"></div>
				</div>
				<div class="item">
					<p class="item-title"><span>1</span> {{$t("help_page.13")}}</p>
					<img src="../../assets/help/findpaw1.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>2</span> {{$t("help_page.14")}}</p>
					<img src="../../assets/help/findpaw2.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>3</span> {{$t("help_page.15")}}</p>
					<img src="../../assets/help/findpaw3.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>4</span> {{$t("help_page.16")}}</p>
					<img src="../../assets/help/findpaw4.png" alt="">
				</div>
			</div>
			<div class="step-wrapper" id="recharge">
				<div class="step-title">
					<div class="line-left"></div>
					<span>{{$t("help_page.19")}}</span>
					<div class="line-right"></div>
				</div>
				<div class="item">
					<p class="item-title"><span>1</span> {{$t("help_page.18")}}</p>
					<img src="../../assets/help/recharge1.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>2</span> {{$t("help_page.19")}}</p>
					<img src="../../assets/help/recharge2.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>3</span> {{$t("help_page.20")}}</p>
					<img src="../../assets/help/recharge3.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>4</span> {{$t("help_page.21")}}</p>
					<img src="../../assets/help/recharge4.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>5</span> {{$t("help_page.22")}}</p>
					<img src="../../assets/help/recharge5.png" alt="">
				</div>
			</div>
			<div class="step-wrapper" id="withdrawals">
				<div class="step-title">
					<div class="line-left"></div>
					<span>{{$t("help_page.23")}}</span>
					<div class="line-right"></div>
				</div>
				<div class="item">
					<p class="item-title"><span>1</span> {{$t("help_page.24")}}</p>
					<img src="../../assets/help/recharge1.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>2</span> {{$t("help_page.25")}}</p>
					<img src="../../assets/help/recharge2.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>3</span> {{$t("help_page.26")}}</p>
					<img src="../../assets/help/recharge3.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>4</span> {{$t("help_page.27")}}</p>
					<img src="../../assets/help/recharge4.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>5</span> {{$t("help_page.28")}}</p>
					<img src="../../assets/help/withdrawals5.png" alt="">
				</div>
			</div>
			<div class="step-wrapper" id="google">
				<div class="step-title">
					<div class="line-left"></div>
					<span>{{$t("help_page.29")}}</span>
					<div class="line-right"></div>
				</div>
				<div class="item">
					<p class="item-title"><span>1</span> {{$t("help_page.30")}}</p>
					<img src="../../assets/help/google1.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>2</span> {{$t("help_page.31")}}</p>
					<img src="../../assets/help/google2.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>3</span> {{$t("help_page.32")}}</p>
					<img src="../../assets/help/google3.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>4</span> {{$t("help_page.33")}}</p>
					<img src="../../assets/help/google4.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>5</span> {{$t("help_page.34")}}</p>
					<img class="google1" src="../../assets/help/google5(1).png" alt="">
					<img class="google2" src="../../assets/help/google5(2).png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>6</span> {{$t("help_page.35")}}</p>
					<img src="../../assets/help/google6.png" alt="">
				</div>
				<div class="item">
					<p class="item-title"><span>7</span> {{$t("help_page.36")}}</p>
					<img src="../../assets/help/google7.png" alt="">
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
		registerJump(){
			require ('@/utils/jquery-3.2.1.min.js');
	        $('html, body').animate({  
	            scrollTop: $('#register').offset().top},{duration: 500,easing: "swing"}
	        );
        },
        findpawJump(){
			require ('@/utils/jquery-3.2.1.min.js');
	        $('html, body').animate({  
	            scrollTop: $('#findpaw').offset().top},{duration: 500,easing: "swing"}
	        );
        },
        rechargeJump(){
			require ('@/utils/jquery-3.2.1.min.js');
	        $('html, body').animate({  
	            scrollTop: $('#recharge').offset().top},{duration: 500,easing: "swing"}
	        );
        },
        withdrawalsJump(){
			require ('@/utils/jquery-3.2.1.min.js');
	        $('html, body').animate({  
	            scrollTop: $('#withdrawals').offset().top},{duration: 500,easing: "swing"}
	        );
        },
        googleJump(){
			require ('@/utils/jquery-3.2.1.min.js');
	        $('html, body').animate({  
	            scrollTop: $('#google').offset().top},{duration: 500,easing: "swing"}
	        );
        },
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.help-wrapper{
		width: 100%;
		background-color: #fff;
		.banner{
			@include wh(100%,300px);
			background: url("../../assets/help/banner.jpg") no-repeat center top;
			text-align: center;
			padding-top: 80px;
			text-align: center;
			color: #fff;
			.title{
				width: 1200px;
				margin: 0 auto;
				font-size: 42px;
			}
			.text{
				display: inline-block;
				overflow: hidden;
				margin-top: 30px;
				ul{
					float: left;
				}
				li{
					float: left;
					padding: 0 8px;
					cursor: pointer;
				}
				span{
					float: left;
					@include circular(6px,#fff);
					opacity: 1;
					margin-top: 7px;
				}
			}
		}
		.step-title{
			width: 100%;
			padding: 50px 0;
			overflow: hidden;
			.line-left{
				float: left;
				margin-top: 10px;
				width: 42%;
				height: 1px;
				background-color: #A1C2F2;
			}
			span{
				float: left;
				font-size: 16px;
				color: #5c96e9;
				display: inline-block;
				width: 16%;
				text-align: center;
			}
			.line-right{
				float: left;
				margin-top: 10px;
				width: 42%;
				height: 1px;
				background-color: #A1C2F2;
			}
		}
		.step-wrapper{
			width: 100%;
			.item{
				width: 1200px;
				margin: 0 auto;
				padding-bottom: 20px;
				overflow: hidden;
				.item-title{
					color: #f61616;
					span{
						@include circular(16px,#f61616);
						opacity: 1;
						color: #fff;
						text-align: center;
						line-height: 16px;
						font-size: 12px;
					}
				}
				img{
					margin-top: 20px;
					max-width: 100%;
				}
				.google1{
					float: left;
					width: 40%;
				}
				.google2{
					float: right;
					width: 40%;
				}
			}

		}
	}
</style>
