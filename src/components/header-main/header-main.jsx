import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Row, Col, Modal} from 'antd';

import MyButton from '../my-button/my-button';
import {removeItem} from "../../utils/storage-utils";
import memory from '../../utils/memory-utils';
import menuList from '../../config/menu-config'

import './header-main.less';
import Sky from './sky'

/*
头部组件
 */
@withRouter
class HeaderMain extends Component {

	logout = () => {
		Modal.confirm({
			title: '您确认要退出登录吗,真的要退吗',
			onOk: () => {
				//清空用户信息
				memory.user = {};
				removeItem();
				this.props.history.replace('/login');
			},
			okText: '退出',
			cancelText: '没事,点错了'
		})
	};



	getTitle = () => {
		//获取path
		const {pathname} = this.props.location;

		for (let i=0;  i < menuList.length; i++) {
			const children = menuList[i].children;
			if (children) {
				for (let j = 0; j < children.length; j++) {
					const item = children[j];
					if (item.key === pathname) {
						return item.title;
					}
				}
			} else {
				if (pathname === menuList[i].key) {
					console.log('1111');
					return menuList[i].title;
				}
			}
		}
	};

	render() {
		const title = this.getTitle();
		const {username} = memory.user;
		return (
			<div className='header-main'>
				<Row className='header-main-top'>
					<span>欢迎, {username}</span>
					<MyButton onClick={this.logout}>退出</MyButton>
				</Row>
				<Row className="header-main-bottom">
					<Col className="header-main-left" span={6}>
						{title}
					</Col>
					<Col className="header-main-right" span={18}>
						<Sky/>
					</Col>
				</Row>
			</div>
		)
	}
}
export default HeaderMain;