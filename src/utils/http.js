'use strict'
import axios from 'axios'
import qs from 'qs'
import { Loading, Message } from 'element-ui'
import Vuex from 'vuex'
import store from '@/store/index'
import {removeStore,getStore,isEmpty,setStore} from '@/utils/common'
import {baseUrl} from '@/utils/env'
import {SAVE_LOGINSTATUS,SAVE_USERINFO,SAVE_TOKEN} from '@/store/mutation-types.js'
import {saveToken} from '@/utils/api'
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if(response.data.statusCode==101  || response.data.statusCode==102){
      removeStore("session");
      store.commit(SAVE_TOKEN, removeStore("session"));
      window.location.href="/index";
      return
    }
    if(response.data.statusCode==9999){
      removeStore("loginStatus");
      removeStore("userinfoList");
      store.commit(SAVE_LOGINSTATUS, removeStore("loginStatus"));
      store.commit(SAVE_USERINFO, removeStore("userinfoList"));
      window.location.href="/login";
      return
    }
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }

  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
  // alert("网络异常")
}
function checkCode(res){
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    Message.error(res.msg);
    return
  }
  if (res && (res.statusCode != 200)) {
    Message.error(res.errorMessage)
    return
  }
  return res
}
export default {
  post (url, data) {
    var session = getStore("session");
    data.token=session;
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  async get (url, params) {
    var session = getStore("session");
     if(isEmpty(session)){
          const res = await saveToken();
          if(!res){
            return
          }
          store.commit(SAVE_TOKEN,res.result);
          session = res.result;
      }
    params.token=session;
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) =>{
         return checkStatus(response)
      }
    ).then(
      (res) =>{
         return checkCode(res)
      }
    )
  },
  getTokens (url, params) {
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) =>{
         return checkStatus(response)
      }
    ).then(
      (res) =>{
         return checkCode(res)
      }
    )
  }
}