/*
后台管理主路由组件
 */
import React, {Component} from 'react'
import {getItem} from "../../utils/storage-utils";
import memory from '../../utils/memory-utils'

export default class Admin extends Component {
	/*
	*   1. 要持久化存储用户信息
	*   2. 性能优化 ( 反复使用这些getItem等方法, 性能不好, 所以保存在内存中
	* */
	constructor(props) {
		super(props);
		const user = getItem();
		console.log(user);
		if (!user || !user._id) {
			//说明用户没有登录过, 跳转到登录界面
			return this.props.history.replace('/login');
		}
		memory.user = user;
	}

	render() {
		return (
			<div>Admin</div>
		)
	}
}