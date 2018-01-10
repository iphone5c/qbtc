<template>
	<div>
	<div class="chat">
		<div class="chat-title">
			<img class="chatimg" src="../../../assets/trade/chat.png" alt="">
			<span>{{$t("trade_page.6")}} {{$t("trade_page.7")}} {{onlineNums}}</span>
			<div class="chaticon">
				<a href="https://qbtc.qiyukf.com/client?k=dbdd9315f8216916046c23e9e49b98f2&wp=1" target="_blank"><img class="customerService" src="../../../assets/trade/customerService.png" alt="" @mouseenter="customerServic = true" @mouseleave="customerServic = false" ></a>
				<img class="eliminate" src="../../../assets/trade/eliminate.png" alt="" @click="cleanChat">
				<img class="narrow" src="../../../assets/trade/narrow.png" @click="setNarrow" ref="narrow" alt="">	
				<div class="customerServiceBox" v-if="customerServic">
					{{$t("trade_page.8")}}
				</div>
			</div>
		</div>
		<div class="chat-narrow" v-if="!isNarrow">
			<p v-for="data in chatDataLst"><span>{{data.userName}}: </span> {{data.message}}</p>
		</div>
		<div class="chat-show" v-if="isNarrow">
			<div class="chat-left" v-loading="chatLoading">
				<div class="chat-old" @resize="scrollBottom"   @wheel.prevent="scrolling($event,'.chat-old')">
					<p v-for="(data,index) in chatData"><span>{{data.userName}}:</span> {{data.message}} <span class="delete" @click="deleteChat(index)" v-if="isUserInfo">{{$t("trade_page.48")}}</span></p>
				</div>
				<el-input :placeholder="($t('trade_page.9'))" class="chat" v-model="chat" @keyup.enter.native="sendChat"></el-input>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
import Vuex from 'vuex'
import {mapState, mapMutations,mapActions} from 'vuex'
import store from '@/store/index'
import {getChatAdmin} from '@/utils/api'
import {removeStore,getStore,isEmpty} from '@/utils/common'
import {wsUrl} from '@/utils/env'
import {createWebSocket,heartCheck,closeSocket} from '@/utils/heartBeat'
	export default {
	    name: 'hello',
	    data () {
		    return {
		    	chatLoading: false, // loading
		    	socketChat: '', // 聊天室WebSocket
		    	onlineNums: '',
		    	customerServic: false,
		    	chat: '', // 输入聊天内容
				isNarrow: true, // 是否缩小聊天室
				chatData: [], // 聊天室数据
				chatDataLst: [], // 聊天室数据最后一条
				isUserInfo: false,
		    }
		},
		computed: {
			...mapState([
	            'userinfoList','onlineNum'
	        ]),
        },
        mounted: function () {
        	this.onlineNums = this.onlineNum;
    	 	setInterval(() => {
                this.onlineNums = this.onlineNum;
            }, 1000)
        	this.onlineNums = this.onlineNum;
        	this.loginInfo = getStore("loginStatus");
			this.session = getStore("session");
        	this.getAdmin();
        	var _this = this;
        	this.chatLoading = true;
        	this.socketChat = new WebSocket(wsUrl+'/websocket/chat');
        	createWebSocket(function(nawSocket){
				_this.socketChat = nawSocket;
				_this.socketChat.onmessage = function(event) {
					heartCheck.reset().start();
					if(event.data == 'reconnect'){
						return;
					}
					let datas = JSON.parse(event.data);//所有数据
					if(!isEmpty(datas.deleteCode)){
						for(var i=0;i < _this.chatData.length;i++){
							if(_this.chatData[i].code == datas.deleteCode){
								_this.chatData.splice(i,1);
							}
						}
						return;
					}
					_this.chatData = _this.chatData.concat(datas);
					if(Array.isArray(datas)){
						_this.chatDataLst = [datas[datas.length - 1]];
					}else{
						_this.chatDataLst = [datas];
					}
					_this.chatLoading = false;
					if(_this.isNarrow == true){
						setTimeout(() => {
				        	document.querySelector(".chat-old").scrollTop = document.querySelector(".chat-old").scrollHeight;
				    	}, 100);
					}
				}
			});
		},
	    methods: {
	    	// 清除聊天室内容
			cleanChat(){
				this.chatData = [];
			},
			// 是否缩小聊天室
			setNarrow: function(){
				this.isNarrow = !this.isNarrow;
				if(this.$refs.narrow.style.transform=='rotate(180deg)'){
					this.$refs.narrow.style.transform='rotate(0deg)';
				}else{
					this.$refs.narrow.style.transform='rotate(180deg)';
				}
				if(this.isNarrow == true){
					setTimeout(() => {
			        	document.querySelector(".chat-old").scrollTop = document.querySelector(".chat-old").scrollHeight;
			    	}, 10);
				}
			},
			// 获取删除聊天权限
			async getAdmin(){
				let res = await getChatAdmin();
				if(!res){
					return
				}
				for(var i=0;i<res.result.length;i++){
					if(this.userinfoList.code == res.result[i]){
						this.isUserInfo = true;
					}
				}
			},
			scrollBottom: function(){
				if(this.isNarrow == true){
					document.querySelector(".chat-old").scrollTop = document.querySelector(".chat-old").scrollHeight;
				}
			},
	    	scrolling: function($event,dom){
				if (!$event) $event = window.event; 	
				document.querySelector(""+dom+"").scrollTop = document.querySelector(""+dom+"").scrollTop - ($event.wheelDelta ? $event.wheelDelta : -$event.detail * 10); 
				return false; 
			},
			// 发送聊天信息
			sendChat: function(){
				if(isEmpty(this.loginInfo) || isEmpty(this.session)){
					this.$message.error(this.$t('trade_page.28'));
					return
				}
				if(!this.chat){
			    	this.$message.error(this.$t('trade_page.29'));
	          		return
			    }else if(!/^.{0,120}$/.test(this.chat)){
					this.$message.error(this.$t('trade_page.30'));
	          		return
			    }
				let datas = {
			 		chat: this.chat,
			  		token:this.session
			 	}
			 	this.socketChat.send(JSON.stringify(datas)); 
			    this.chat = '';
			},
			// 删除聊天记录
			async deleteChat(index){
				let code = this.chatData[index].code;
				let datas = {
			 		delete: code
			 	}
			 	this.socketChat.send(JSON.stringify(datas)); 
				this.$message.success(this.$t('trade_page.49'));
			}
        }
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../../style/mixin';
// 聊天室
	.chat{background: #ebebeb;max-height: 440px;}
	.chat-title{padding:12px 0;font-size: 18px;color: #5c96e9;}
	.chat-title img{
		vertical-align: middle;
	}
	.chat-title .chatimg{
		padding: 0 5px 0 15px; 
	}
	.chat-title .chaticon{
		position: relative;
		float: right;
		padding: 0 10px;
		img{
			padding: 0 5px;
			cursor: pointer;
		}
		.customerServiceBox{
			position: absolute;
			top: -48px;
			left: -35px;
			z-index: 8;
			@include wh(120px,48px);
			text-align: center;
			line-height: 38px;
			background-image: url('../../../assets/trade/customerServiceBox.png');
		}
	}

	.chat-left{width: 470px;background: #fff;float: left;position: relative;margin-bottom: 10px;padding-bottom: 5px;}
	.chat-left .chat{
		padding: 0 15px;
		background-color:#fff;
		margin-top: 10px;
		margin: 12px 0;
		border-color: #20a0ff ;
	}
	.chat .chat-narrow{
		background-color: #FFF;
		padding: 15px;
		p{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			span{
				color: #5c96e9;
			}
		}
	}
	.chat-left p span{color: #5c96e9;}
	.chat-left p{margin-left: 15px;margin-top: 17px;overflow: hidden;}
	.chat-left .int{margin-top:10px;margin-bottom:15px;width: 438px;height: 38px;border: 1px solid #5c96e9;padding-left: 10px;}
	.chat-left .chat-old{
		height: 289px;
		overflow-y: auto;
		p{
			word-break:break-all;
		}
		.delete{
			cursor: pointer;
		}
	}
	::-webkit-scrollbar{height: 35px;width: 5px;background: #e9e9e9;}
	::-webkit-scrollbar-thumb{background: #5c96e9;border-radius: 5px;}
	.zhe{width: 5px;height: 80px;background: #e9e9e9;position: absolute;right: 0;top: 311px;}
	.suoxiao{height: 51px!important;overflow: hidden!important;}
	.clc{display:none;}
	.clk{background-position-y: -28px!important;}
</style>