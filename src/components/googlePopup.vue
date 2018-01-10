<template>
	<div>
		<!-- 修改谷歌验证弹窗 -->
		<div class="google-popup">
			<div class="popup">
				<div class="close"><i class="el-icon-close"></i></div>
				<p class="title">修改谷歌验证器</p>
				<div class="qrCode">
					<div class="qrCode-left">
						<div class="qrCode-box">
							<img src="./../assets/safetyCenter/googleQR.png" alt="">
						</div>
						<p>若未安装谷歌验证器请扫码下载</p>
					</div>
					<div class="qrCode-right">
						<div class="qrCode-box" id="code">
							<!-- <img src="./../assets/safetyCenter/googleQR.png" alt=""> -->
						</div>
						<p>
							请扫码或手工输入密
							钥将手机上生成的动
							态验证码填到下边输
							入框
						</p>
					</div>
				</div>
				<div class="google-form">
					<div class="item">
						<label>密匙</label>
						<!-- <span>{{googleInfo.secret}}</span> -->
					</div>
					<div class="item">
						<label>设备名称</label>
						<!-- <span>{{googleInfo.code}}</span> -->
					</div>
					<div class="item"> 
						<label>谷歌验证码</label>
						<el-input placeholder="请输入谷歌验证码" class="googleCode"></el-input>
					</div>
					<el-button class="confirm" type="primary">确认提交</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'hello',
	  data () {
	    return {
	    	// isGooglePopup: true,
	    }
	  },
	  components: {
	    
	  },
	  methods: {
	  	closeGooglePopup:function(){
				this.$emit('closeGooglePopup', true)
			},
	  }
	}
</script>

<style lang="scss" scoped="" type="text/css">
 @import '../style/mixin';
	// 修改谷歌验证弹窗
	.google-popup{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
		.popup{
			position: absolute;
			top: 50%;
			left: 50%;
			// @include wh(530px,620px);
			width: 530px;
			@include borderRadius(12px 12px 10px 10px);
			transform: translate(-50%, -50%);
			background-color: #fff;
    		.close{
    			position: absolute;
    			top: 15px;
    			right: 15px;
    			color: #fff;
    			cursor: pointer;
    		}
    		.title{
    			padding: 30px 0;
    			text-align: center;
    			font-size: 16px;
    			color: #fff;
    			background-color: #2A71D7;
    			@include borderRadius(10px 10px 0 0);
    		}
    		.qrCode{
    			padding: 30px 80px;
    			background-color: #F7F7F7;
    			overflow: hidden;
    			 >div{
    				width: 138px;
    				.qrCode-box{
    					@include borderRadius(5px);
    					border: 1px solid #5591E6;
    					padding: 10px;
    					background-color: #fff;
    				}
    				p{
    					margin-top: 15px;
    					color: #a9a9a9;
    				}
    			}
    			.qrCode-left{
    				float: left;
    			}
    			.qrCode-right{
    				float: right;
    			}
    		}
    		.google-form{
    			padding: 10px 80px;
    			.item{
    				margin-top: 20px;
    				label{
    					display: inline-block;
    					width: 80px;
    					text-align: right;
    				}
    				span{
    					display: inline-block;
    					margin-left: 10px;
    				}
    				.googleCode{
    					width: 270px;
    					margin-left: 10px;
    				}
    			}
    			.confirm{
					margin-top: 30px;
					background-color: #5C96E9;
					border-color: #5C96E9;
					padding: 12px 30px;
					margin-left: 90px;
	    		}
    		}
    		
		}
	}
</style>