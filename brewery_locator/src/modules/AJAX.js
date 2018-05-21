import axios from 'axios';
import Vue from 'vue';

let url = 'http://localhost:5000';

let comm = new Vue();

let ajax = (key, options)=>{
	console.log("KEY ", key)
	if(options){
		var ajx = axios({
			method: options.method,
			url: url+key,
			data: options.data
		})
	}else{
		var ajx = axios({
			url: url+key
		})
	}
	return ajx;
}

export default{
	comm: comm,
	ajax: ajax
}

