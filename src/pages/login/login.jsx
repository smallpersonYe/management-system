/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {Form, Icon, Input, Button } from 'antd';
import logo from './logo.png';
import './index.less'

const Item = Form.Item;
@Form.create()
class Login extends Component {
	login = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				alert('假装提交成功')
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
							{getFieldDecorator('userName', {
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
							{getFieldDecorator('passWord',{
								rules: [
									// 自定义表单校验规则
									{validator: this.validator('密码')}
								]
							})(
								<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="密码"/>
							)}
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
						</Item>
					</Form>
				</section>
			</div>
		)
	}
}
export default Login;
// export default Form.create()(Login)
