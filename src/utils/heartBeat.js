import {wsUrl} from '@/utils/env'
var ws;//websocket实例
var lockReconnect = false;//避免重复连接
var wsUrls = wsUrl+'/websocket/chat';
var callbacks = {};
export const createWebSocket =(callback)=> {
    var url = wsUrls;
    try {
        ws = new WebSocket(url);
        initEventHandle();
        callbacks = callback;
        callbacks(ws);
    } catch (e) {
        reconnect(url);
    }     
}

export const closeSocket =()=> {
      lockReconnect = true;
      heartCheck.reset();
      ws.close();
}

function initEventHandle() {
    ws.onclose = function () {
        reconnect(wsUrls);
    };
    ws.onerror = function () {
        reconnect(wsUrls);
    };
    ws.onopen = function () {
        //心跳检测重置
        heartCheck.reset().start();
    };
}

function reconnect(url) {
    if(lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        createWebSocket(callbacks);
        lockReconnect = false;
    }, 2000);
}


//心跳检测
export const heartCheck = {
    timeout: 50000,//60秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            ws.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, 50000)
        }, this.timeout)
    }
}