<template>
	<div>
		<div class="details-wrapper" >
			<div class="title">{{detailsTitle}}</div>
			<div v-html="detailsInfo"></div>
		</div>
	</div>
</template>

<script>
import {getArticleDetails} from '@/utils/api'
export default {
	name: 'hello',
	data() {
		return {
			detailsInfo:'',
			detailsTitle:'',
		}
	},
	mounted: function () {
		let fullPaths = this.getStatus(this.$route.path).split("/");
	    var currencyCode = fullPaths[fullPaths.length-1].split("_")[1]
		this.getDetailsInfo(currencyCode);
	},
	methods: {
		getStatus (urlStr) {
			var urlStrArr = urlStr.split('/')
			return urlStrArr[urlStrArr.length - 1]
		},
		async getDetailsInfo(currencyCode){
			let res = await getArticleDetails(currencyCode);
			if(!res){
				return
			}
			this.detailsTitle = res.result.title;
			this.detailsInfo = res.result.content;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../../style/mixin';
	.details-wrapper{
		background-color: #fff;
		margin: 20px 0;
		padding: 50px;
		min-height: 460px;
		.title{
			text-align: center;
			font-size: 20px;
			font-weight: 600;
			margin-bottom: 20px;
		}
	}
</style>
