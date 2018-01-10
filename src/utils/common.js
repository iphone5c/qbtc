/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
// 转换时间
export const dateFormat = (date,fmt) =>{
	var d = new Date(date);
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	return d.Format(fmt);
}
// 保留小数位数
export const  decimalFormat = (money,digit) => {
		if (typeof (digit) == 'undefined') {
			digit = 6;
		}
		if (money != null && money.toString().split(".") != null && money.toString().split(".")[1] != null) {
			var end = money.toString().split(".")[1];
			if (end.length > digit) {
				end = end.substring(0, digit);
			} else if (end.length < digit) {
				for ( var i = 0; i <= digit - end.length; i++) {
					end += "0";
				}
			}
			money = money.toString().split(".")[0] + "." + end;
		} else {
			money = money.toString() + ".";
			for ( var i = 0; i < digit; i++) {
				money += "0";
			}
		}
		if (digit == 0) {
			money = money.substring(0, money.length - 1);
		}
		return money;
	}
//  判空
export const  isEmpty = (data) => {
	if(data != undefined && data != 'undefined' && data != null && data != "" && data != 'null'){
	    return false;
    }
    return true;
}
// 保留小数
export const round = (v,e) =>{
	var t=1;
	for(;e>0;t*=10,e--);
	for(;e<0;t/=10,e++);
	return Math.round(v*t)/t;
}
// 补零
export const zeroFill = (num,digit) =>{
	var numAfter = '';
	if(num.toString().indexOf(".") != -1){
		if(num.toString().split(".")[1].length < digit-1){
    		for(var j=0;j<digit-num.toString().split(".")[1].length;j++){
    			numAfter += '0';
    		}
    	}
	}else{
		numAfter =".";
		for(var j=0;j<digit;j++){
			numAfter += '0';
		}
	}
	return numAfter;
}