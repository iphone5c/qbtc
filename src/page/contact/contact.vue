<template>
	<div>
	<my-header></my-header>
		<div class="contact-wrapper">
			<div class="wrapper-body" v-html="contactInfo">
				
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
			contactInfo:'',
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
		this.getContactInfo();
	},
	methods: {
		async getContactInfo(){
			let res = await getAbountInfo(3);
			if(!res){
				return
			}
			this.contactInfo = res.result[0].link;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.contact-wrapper{
		padding: 50px 0;
		.wrapper-body{
			width: 1200px;
			min-height: 560px;
			margin: 0 auto;
			padding: 50px;
			background-color: #fff;
		}
	}
</style>
