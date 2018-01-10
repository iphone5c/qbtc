<template>
  <div id="app" v-cloak>
    <router-view></router-view>
    <div v-wechat-title="$route.meta.title"></div>
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
		//if (!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1){
		//	alert("为了您的账户安全，建议您不使用此浏览器");
		//	this.$router.push({path: '/error'});
		//}
		if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){
	        alert("为了您的账户安全，建议您不使用此浏览器");
			this.$router.push({path: '/error'});
	    }
	},
	methods:{
	}
}
</script>

<style>
[v-cloak]{
	display: none !important;
}
*{
	margin: 0;
	padding: 0;
	font-size: 14px;
	-moz-box-sizing: border-box;  /*Firefox3.5+*/
	-webkit-box-sizing: border-box; /*Safari3.2+*/
	-o-box-sizing: border-box; /*Opera9.6*/
	-ms-box-sizing: border-box; /*IE8*/
	box-sizing: border-box;
}
html,body{
		width: 100%;
		min-width: 1200px;
	}
body{
	background-color: #F6F6F6;
}
@font-face {
    font-family: 'LatoWeb';
    src: url('fonts/Lato-Regular.eot'); /* IE9 Compat Modes */
    src: url('fonts/Lato-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('fonts/Lato-Regular.woff2') format('woff2'), /* Modern Browsers */
         url('fonts/Lato-Regular.woff') format('woff'), /* Modern Browsers */
         url('fonts/Lato-Regular.ttf') format('truetype');
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
}
#app {
   font-family: 'LatoWeb';
}
li{
	list-style: none;
}
[v-cloak] {
    display: none !important;
}
</style>
