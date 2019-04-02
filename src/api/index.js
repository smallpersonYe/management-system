/*
* 	包含n个请求函数模块
* */
import ajax from './ajax'
//请求登录函数
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
export const reqLogin = (username, password) => {
	return ajax(prefix + '/login', {username, password}, 'POST')
};