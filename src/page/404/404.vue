<template>
  <div>
  	<div class="errorPage">
  		<img src="../../assets/common/404.png" alt="">
  		<p>
  			页面出错了，点击下面按钮返回首页吧。
  		</p>
  		<router-link to="/"><el-button class="confirm" type="primary">返回首页</el-button></router-link>
  	</div>
  </div>
</template>

<script>

export default {
	name: 'hello',
	data() {
		return {
		}
	},
	components: {

	},
	mounted: function () {

	},
	methods:{

	}
}
</script>

<style>
*{
	margin: 0;
	padding: 0;
	font-size: 14px;
}
.errorPage{
	width: 1200px;
	margin: 0 auto;
	text-align: center;
	margin-top: 200px; 

}
.errorPage p{
	margin-top: 30px; 
}
.errorPage .confirm{
	margin-top: 50px; 
	padding: 16px 46px;
	font-size: 16px;
}
</style>
