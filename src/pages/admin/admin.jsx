/*
后台管理主路由组件
 */
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {
	Layout
} from 'antd';

import {getItem} from "../../utils/storage-utils";
import memory from '../../utils/memory-utils';
import LeftNav from '../../components/left-nav/left-nav.jsx';
import HeaderMain from '../../components/header-main/header-main.jsx';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie'
import './admin.less'

const {
	Header, Content, Footer, Sider,
} = Layout;
export default class Admin extends Component {
	/*
	*   1. 要持久化存储用户信息
	*   2. 性能优化 ( 反复使用这些getItem等方法, 性能不好, 所以保存在内存中
	* */
	constructor(props) {
		super(props);
		const user = getItem();
		// console.log(user);
		this.createRef = React.createRef();
		if (!user || !user._id) {
			//说明用户没有登录过, 跳转到登录界面
			return this.props.history.replace('/login');
		}
		memory.user = user;
	}
	state = {
		collapsed: false,
	};

	onCollapse = (collapsed) => {
		// console.log(collapsed);
		this.setState({ collapsed });
	};

	render() {
		const { collapsed } = this.state;
		const opacity = collapsed ? 0 : 1;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<LeftNav opacity={opacity}/>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0,height: 100 }}>
						<HeaderMain/>
					</Header>
					<Content style={{ margin: '20px 16px 0' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: '100%' , position: 'relative'}}>
							<Switch>
								<Route path="/home" component={Home}/>
								<Route path="/category" component={Category}/>
								<Route path="/product" component={Product}/>
								<Route path="/user" component={User}/>
								<Route path="/role" component={Role}/>
								<Route path="/charts/bar" component={Bar}/>
								<Route path="/charts/line" component={Line}/>
								<Route path="/charts/pie" component={Pie}/>
								<Redirect to="/login"/>
							</Switch>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						使用谷歌浏览器体验更佳哦!<br/>
						电话: 18883722362
					</Footer>
				</Layout>
			</Layout>
		)
	}
}