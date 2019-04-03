/*
* 	包含n个请求函数模块
* */
import jsonp from 'jsonp';
import ajax from './ajax';
//请求登录函数
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
export const reqLogin = (username, password) => {
	return ajax(prefix + '/login', {username, password}, 'POST')
};

//请求天气函数
export const reqWeather = (city) => {
	return new Promise((resolve, reject) => {
		jsonp(
			`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
			(err, data) => {
				// console.log(err, data);
				if (!err) {
					const {dayPictureUrl, weather, temperature} = data.results[0].weather_data[0];
					resolve({weather, weatherImg: dayPictureUrl, temperature})
				} else {
					reject('请求失败, 网络不稳定')
				}
			}
		)
	})
};