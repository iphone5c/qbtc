<template>
	<div>
		<footer>
			<div class="footer-top">
				<ul>
					<li><a href="https://qbtc.qiyukf.com/client?k=dbdd9315f8216916046c23e9e49b98f2&wp=1" target="_blank">{{$t("footer_page.1")}}</a></li>
					<li><router-link to="/law">{{$t("footer_page.2")}}</router-link></li>
					<li><router-link to="/wiki">{{$t("footer_page.3")}}</router-link></li>
					<li><router-link to="/rate">{{$t("footer_page.4")}}</router-link></li>
					<li><router-link to="/shareholder">{{$t("footer_page.5")}}</router-link></li>
				</ul>
			</div>
			<p class="text">©2017-2018 qbtc.com Cupid Network Technology Ltd All Rights Reserved. | QBTC | </p>
		</footer>
	</div>
</template>

<script>
	export default {
	  name: 'hello',
	  data () {
	    return {
	    }
	  },
	  	methods: {
    	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import './../style/mixin';
	footer{
		@include wh(100%,170px);
		background-color:#041732;
		color:#fff;
		min-width:1200px;
	}
	.footer-top{
		padding-top: 50px;
		text-align: center;
		ul{
			display: inline-block;
		}
		ul li{
			float: left;
			width: 160px;
			border-right: 1px solid #fff;
			cursor: pointer;
		}
		a{
			color: #FFF;
			text-decoration: none;
		}
		ul li:last-child{
			border-right:none;
		}
	}
	footer .text{
		text-align: center;
		margin-top: 30px;
	}
</style>
