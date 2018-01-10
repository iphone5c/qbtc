function getCookie(name,defaultValue) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
    return unescape(arr[2]);
  }
  	
  else{
  	console.log(defaultValue)
  	return defaultValue;
  }
    
}

export {
  getCookie
}