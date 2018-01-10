<template>
	<div>
		<my-header></my-header>
		<div class="findPassword">
			<p class="title">{{$t("findpaw_page.1")}}</p>
			<router-link to="/findPasswordPhone"><el-button class="findPasswordPhone">{{$t("findpaw_page.2")}}</el-button></router-link>
			<router-link to="/findPasswordEmail"><el-button class="findPasswordEmail">{{$t("findpaw_page.3")}}</el-button></router-link>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import {mapState, mapMutations} from 'vuex'
import {loginUser} from '@/utils/api'
export default {
	name: 'hello',
	data() {
		return {
			accountValue:'',
			passwordValue: ''
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
	},
	methods:{
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
@import '../../style/mixin';
	a{
		color: #000;
		text-decoration: none;
	}
	.findPassword{
		@include wh(560px,400px);
		@include borderRadius(10px);
		background-color: #fff;
		padding: 40px 100px;
		margin: 130px auto;
		.title{
			text-align: center;
			font-size: 18px;
			padding-bottom: 15px;
		}
		.findPasswordPhone{
			margin-top: 80px;
		}
		button{
			width: 100%;
			margin-left: 0;
			color: #1d90e6;
   			border-color: #1d90e6;
   			margin-top: 50px;
		}
		
	}
</style>
