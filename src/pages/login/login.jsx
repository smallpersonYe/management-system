/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {Form, Icon, Input, Button, message } from 'antd';
import {reqLogin} from '../../api/index';
import {setItem} from "../../utils/storage-utils";
import logo from '../../assets/img/logo.png';
import './index.less'

const Item = Form.Item;
@Form.create()
class Login extends Component {
	login = (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				const {username, password} = values;
				const result = await reqLogin(username, password);
				// 判断是否登录成功
				if (result.status === 0) {
					message.success('登录成功',1);
					//保存用户数据
					setItem(result.data);
					this.props.history.replace('/')
				} else {
					message.error(result.msg,2)
				}
			} else {
				console.log('表单失败',err);
			}
		});
	};
	validator = (name) => {
		return (rule, value, callback) => {
			const length = value && value.length;
			const userReg = /^\w+$/;
			if (!value) {
				callback(`必须输入${name}`);
			} else if (length < 4) {
				callback(`${name}必须大于4位`)
			} else if (length > 16) {
				callback(`${name}必须小于16位`)
			} else if (!userReg.test(value)) {
				callback(`${name}必须是英文,数组或下划线组成`)
			} else {
				callback();
			}
		}
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login">
				<header className="login-header">
					<img src={logo} alt="logo"/>
					<h1>超市管理系统</h1>
				</header>
				<section className="login-content">
					<h2>用户登录</h2>
					<Form onSubmit={this.login} className="login-form">
						<Item>
							{getFieldDecorator('username', {
								rules: [
									/*
									{ required: true, whitespace: true, message: '必须输入用户名' },
									{ min: 4, message: '用户名最小长度为4'},
									{ max: 12, message: '用户名最大长度为12'},
									{ pattern: /^[a-zA-Z0-9_]+$/, message:'用户名必须是英文,数组或下划线组成'},
									*/
									{validator: this.validator('用户名')}
								],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
							)}
						</Item>
						<Item>
							{getFieldDecorator('password',{
								rules: [
									// 自定义表单校验规则
									{validator: this.validator('密码')}
								]
							})(
								<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="密码"/>
							)}
						</Item>
						<Item>
							<Button type="danger" htmlType="submit" className="login-form-button">登录</Button>
						</Item>
					</Form>
				</section>
			</div>
		)
	}
}
export default Login;
// export default Form.create()(Login)
