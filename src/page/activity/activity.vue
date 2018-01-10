<template>
	<div class="activity">
	<my-header></my-header>
	<div class="activity-wrapper">
		<div class="banner">
			<div class="share" @click="isShare = true"><i class="el-icon-share"></i> {{$t("activity_page.activity_share")}}</div>
		</div>
		<div class="details">
			<div class="item" v-for="(data,index) in activitiesLsit">
				<div class="item-state" v-if="data.status != 3">{{data.status_CH}}</div>
				<div class="item-state end-receive" v-if="data.status == 3">{{data.status_CH}}</div>
				<img :src="(data.picture)" alt="">
				<div class="item-details">
					<div class="item-task" :title="(data.activityName)">
						{{$t("activity_page.activity_distribute")}}{{data.activityName}}
					</div>
					<div class="item-rule">
						{{$t("activity_page.activity_rule")}}{{data.ruleDesc}}
					</div>
					<div class="item-reward">
						<p :title="(data.amount+data.giveCoinName)">{{$t("activity_page.activity_receive")}} <span>{{data.amount}}{{data.giveCoinName}}</span></p>
						<p v-if="data.restReward != -1">{{$t("activity_page.activity_surplus")}}<span>{{data.restReward}}{{data.giveCoinName}}</span></p>
					</div>
					<div class="item-time" v-if="data.status == 1" style="color:#23DEB3">
						{{$t("activity_page.activity_startTime")}}{{data.opentime}}
					</div>
					<div class="item-time" v-if="data.status != 1">
						{{$t("activity_page.activity_endTime")}}{{data.stoptime}}
					</div>
					<div class="receive no-receive" v-if="data.buttonStatus == 1">
						{{$t("activity_page.activity_notStarted")}}
					</div>
					<div class="receive" v-if="data.buttonStatus == 2" @click="getReceiveReward(index)">
						{{$t("activity_page.candy_get")}}
					</div>
					<div class="receive already-receive" v-if="data.buttonStatus == 3">
						{{$t("activity_page.candy_getAlready")}}
					</div>
					<div class="receive end-receive" v-if="data.buttonStatus == 4">
						{{$t("activity_page.activity_finished")}}
					</div>
				</div>
				
			</div>
		</div>
		<div class="myReward">
			<div class="title">{{$t("activity_page.my_candy")}}</div>
			<div class="item" v-for="data in userRewardList">
				<div class="item-task" :title="(data.missionName)">
					{{$t("activity_page.activity_distribute")}}{{data.missionName}}
				</div>
				<div class="item-time">{{$t("activity_page.activity_completeTime")}}{{data.completeTime}}</div>
				<div class="item-reward">
					<p :title="(data.rewardAmount+data.giveCoin)">{{$t("activity_page.candy_get")}} <span>{{data.rewardAmount}}{{data.giveCoin}}</span></p>
				</div>
				<div class="receive">
					{{$t("activity_page.candy_account")}}
				</div>
			</div>
			<div class="no-reward" v-if="!isDisplay">
				{{$t("activity_page.candy_notAvailable")}}
			</div>
			<div style="clear:both"></div>
			<div class="tips">
				<p>{{$t("activity_page.activity_explain")}}</p>
				<p>{{$t("activity_page.activity_explain_one")}}</p>
				<p>{{$t("activity_page.activity_explain_two")}}</p>
				<p>{{$t("activity_page.activity_explain_three")}}</p>
				<p>{{$t("activity_page.activity_explain_four")}}</p>
			</div>
		</div>
	</div>
	<div class="share-wrapper" v-if="isShare"></div>
	<transition name="fold">
		<div class="shareBox" v-if="isShare">
			<p>{{$t("activity_page.activity_share_local")}}</p>
			<div class="copyShare">
				<input id="addressCode" type="text" v-model="shareValue">
				<div class="copy" @click="addressCopy">{{$t("activity_page.activity_share_copy")}}</div>
			</div>
			<div class="close" @click="isShare = false">{{$t("activity_page.activity_share_back")}}</div>
		</div>
	</transition>
	<my-footer></my-footer>
	</div>
</template>

<script>
import footer from '@/components/footer'
import header from '@/components/header'
import {getActivitiesAll,getUserReward,userActivities,receiveReward} from '@/utils/api'
import {getStore,isEmpty} from '@/utils/common'
export default {
	name: 'hello',
	data() {
		return {
			shareValue: 'https://www.qbtc.com/register',
			isShare: false,
			activitiesLsit:[],
			userRewardList:[],
			isDisplay: false,
			loginInfo: '',
		}
	},
	components: {
		"my-footer": footer,
		"my-header": header,
	},
	mounted: function () {
		this.loginInfo = getStore("loginStatus");
		if(!isEmpty(this.loginInfo)){
			this.getUserActivities();
			this.getUserRewardList();
		}else{
			this.getActivitiesLsit();
		}
	},
	methods: {
		// 复制地址
		addressCopy:function(){
    		var e = document.getElementById("addressCode"); //对象是content
            e.select(); //选择对象
            var isCopy = document.execCommand("Copy"); //执行浏览器复制命令
            this.$message({
	          message: this.$t('activity_page.activity_share_success'),
	          type: 'success'
	        });
    	},
    	// 获取活动列表（登陆之前）
    	async getActivitiesLsit(){
    		let res = await getActivitiesAll();
    		if(!res){
    			return;
    		}
    		this.activitiesLsit = res.result;
    	},
    	// 获取活动列表（登陆之后）
    	async getUserActivities(){
    		let res = await userActivities();
    		if(!res){
    			return;
    		}
    		this.activitiesLsit = res.result;
    	},
    	// 获取用户奖励列表
    	async getUserRewardList(){
    		let res = await getUserReward();
    		if(!res){
    			return;
    		}
    		this.userRewardList = res.result;
    		if(res.result.length>0){
    			this.isDisplay = true;
    		}
    	},
    	// 领取奖励
    	async getReceiveReward(index){
    		if(isEmpty(this.loginInfo)){
    			this.$router.push({path: '/login',query: {redirect: this.$route.path}});
		    	return
    		}
    		var code = this.activitiesLsit[index].code;
    		let res = await receiveReward(code);
    		if(!res){
    			return;
    		}
    		this.$message.success(this.$t('activity_page.activity_receive_success'));
    		this.getUserRewardList();
    		this.getUserActivities();
    	}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../style/mixin';
	.activity{
		background-color: #ECF3F6;
	}
	.activity-wrapper{
		width: 100%;
		.banner{
			@include wh(100%,450px);
			background: url("../../assets/activity/banner.png") no-repeat center top;
			text-align: center;
			padding-top: 300px;
			.share{
				@include wh(260px,50px);
				@include borderRadius(50px);
				border: 1px solid #CBCBCB;
				margin: 0 auto;
				color: #fff;
				line-height: 50px;
				background-color: #484CDD;
				cursor: pointer;
			}
		}
		.details{
			width: 1200px;
			margin: 0 auto;
			overflow: hidden;
			padding-bottom: 5px;
			.item{
				float: left;
				width: 32%;
				margin-left: 2%;
				margin-top: 20px;
				border: 1px solid #E2E3FA;
				position: relative;
				background-color: #FFF;
				.item-state{
					position: absolute;
					top: 20px;
					width: 100px;
					height: 30px;
					background-color: #F6AA18;
					color: #fff;
					@include borderRadius(0 30px 30px 0);
					line-height: 30px;
					text-align: center;
				}
				.end-receive{
					background: #C4C4C4;
				}
				.item-details{
					width: 100%;
					padding: 10px;
					color: #848484;
					.item-task{
						color: #5458de;
						width: 100%;
						overflow: hidden;
		 				white-space: nowrap;/*不换行*/
		            	text-overflow:ellipsis;
					}
					.item-rule{
						margin-top: 6px;
						height: 40px;
					}
					.item-reward{
						margin-top: 6px;
						overflow: hidden;
						p{
							float: left;
							width: 50%;
							overflow: hidden;
			 				white-space: nowrap;/*不换行*/
			            	text-overflow:ellipsis;
							span{
								color: #3ea6f2;
							}
						}
						img{
							vertical-align: middle;
						}
						
					}
					.item-time{
						margin-top: 6px;
					}
					.receive{
						margin: 20px auto;
						@include wh(260px,46px);
						@include borderRadius(46px);
						background: linear-gradient(to right, #3686FF , #5054E2);
						text-align: center;
						line-height: 46px;
						color: #fff;
						cursor: pointer;
					}
					.no-receive{
						background: #23DEB3;
					}
					.already-receive{
						background: #3CAFFF;
					}
					.end-receive{
						background: #C4C4C4;
					}
				}
				>img{
					width: 100%;
					height: 239px;
				}
			}
			.item:hover{
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
				-moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
				-webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
			.item:first-child{
				margin-left: 0;
			}
			.item:nth-child(3n+1){
				margin-left: 0;
			}
		}
		.myReward{
			width: 1200px;
			margin: 0 auto;
			margin-top: 20px;
			background-color: #fff;
			padding-top: 30px;
			overflow: hidden;
			.title{
				width: 160px;
				height: 40px;
				background-color: #F6AA18;
				color: #fff;
				@include borderRadius(0 40px 40px 0);
				line-height: 40px;
				text-align: center;
                background: linear-gradient(to right, #F6B914 , #F6D314);
			}
			.no-reward{
				width: 100%;
				text-align:center;
				padding: 60px 0;
			}
			.item{
				float: left;
				width: 20%;
				margin-left: 4%;
				background-color: #F9F9F9;
				@include borderRadius(5px);
				border: 1px solid #E2E3FA;
				margin-top: 30px;
				padding: 20px;
				.item-task{
					color: #5458de;
					width: 100%;
					overflow: hidden;
	 				white-space: nowrap;/*不换行*/
	            	text-overflow:ellipsis;
				}
				.item-time{
					margin-top: 6px;
				}
				.item-reward{
					margin-top: 6px;
					p{
						width: 100%;
						overflow: hidden;
		 				white-space: nowrap;/*不换行*/
		            	text-overflow:ellipsis;
						span{
							color: #3ea6f2;
						}
					}
					img{
						vertical-align: middle;
					}
				}
				.receive{
					@include wh(160px,26px);
					@include borderRadius(26px);
					background-color: #3DAFFF;
					text-align: center;
					line-height: 26px;
					color: #fff;
					margin-top: 6px;
					cursor: pointer;
				}
			}
			.tips{
				width: 100%;
				margin: 30px 0;
				padding-top: 30px;
				border-top: 1px solid #F1F1F1;
				padding-left: 4%;
				p:first-child{
					font-size: 16px;
					color: #000;
				}
				p{
					margin-top: 6px;
					color: #575757;
				}
			}
		}
	}
	.share-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
		z-index: 10;
	}
	.shareBox{
		position: fixed;
		top: 50%;
		left: 50%;
		@include wh(640px,240px);
		@include borderRadius(5px);
		transform: translate(-50%, -60%);
		background-color: #fff;
		padding: 50px 20px;
		opacity: 0;
		z-index: 10;
		.copyShare{
			margin-top: 20px;
			overflow: hidden;
			input{
				float: left;
				width: 500px;
				height: 40px;
				outline: none;
				border: 1px solid #BAB3D7;
				padding-left: 20px;
			}
			.copy{
				float: left;
				@include wh(100px,40px);
				background: linear-gradient(to right, #5F60EE , #383BE4);
				color: #fff;
				text-align: center;
				line-height: 40px;
				cursor: pointer;
			}
		}
		.close{
			@include wh(200px,40px);
			margin: 0 auto;
			background-color: #AEAEF6;
			@include borderRadius(40px);
			margin-top: 20px;
			text-align: center;
			line-height: 40px;
			color: #fff;
			cursor: pointer;
		}
	}
	.shareBox{
 		transform: translate(-50%, -50%);
	    opacity: 1;
	}
	.fold-enter-active, .fold-leave-active {
	    transition: all .5s;
	}
	.fold-enter, .fold-leave-active {
	    transform: translate(-50%, -60%);
	    opacity: 0;
	}
</style>
