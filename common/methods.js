import * as config from '@/common/config.js'
const baseUrl = "http://localhost:9999"

function obj2params(obj) {
  var result = '';
  var item;
  for (item in obj) {
    result += '&' + item + '=' + encodeURIComponent(obj[item]);
  }
  if (result) {
    result = result.slice(1);
  }
  return result;
}
// 封装get方法
export function get(url,params){
  return new Promise((resolve,reject)=>{
    uni.request({
		url: baseUrl+url,
		data: params,
		method:"GET",
		header : {'content-type':'application/json'},
    }).then(res=>{
      resolve(res);
    },err=>{
      console.info(err);
      reject(err);
    })
  })
}

//封装post方法
export function post(url,params){
  return new Promise((resolve,reject)=>{
    uni.request({
			url:  baseUrl+url,
			data: params,
			method:"POST",
			header : {'content-type':'application/json'},
		}).then(res=>{
      resolve(res);
    },err=>{
      console.info(err);
      reject(err);
    })
  })
}