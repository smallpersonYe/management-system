import axios from 'axios';
import { message } from 'antd';
export default function ajax(url, data, method = 'GET') {
	method = method.toUpperCase();
	/*	try {
			if (method === 'GET') {
				//GET请求
				return axios.get(url, {
					params: data
				})
			} else {
				return axios.post(url, data)
			}
		} catch (e) {
			console.log('请求失败',e);
			message.error('破电脑不好使,赶紧换一个',2)
		}
	}*/

	let promise = null;
	if (method === 'GET') {
		//GET请求
		promise = axios.get(url, {
			params: data
		})
	} else {
		promise = axios.post(url, data)
	}

	return promise
		.then(res => {
			return res.data;
		})
		.catch(err => {
			console.log('请求失败', err);
			message.error('破电脑不好使,赶紧换一个', 2)
		})
}