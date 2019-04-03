import React, { Component, Fragment } from 'react';
import dayjs from "dayjs";
import {reqWeather} from "../../../api";


export default class Sky extends Component {
	state = {
		sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png',
		weather: '晴',
		temperature: '20 ~ 13℃'
	};
	componentDidMount () {
		this.intervalId = setInterval(() => {
			this.setState({
				sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			})
		},1000);
		//请求天气数据
		reqWeather('漠河')
			.then(res => {
				this.setState({
					weatherImg: res.weatherImg,
					weather: res.weather,
					temperature: res.temperature
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	componentWillUnmount () {
		clearInterval(this.intervalId)
	}
	render() {
		const {weatherImg, weather, temperature, sysTime} = this.state;

		return <Fragment>
			<span>{sysTime}</span>
			<img src={weatherImg} alt="天气"/>
			<span>{weather}</span>&nbsp;
			<span>{temperature}</span>
		</Fragment>
	}
}