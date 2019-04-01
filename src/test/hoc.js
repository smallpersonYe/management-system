import React, { Component } from 'react';

// 高阶组件 withHoc
export default (title) => (WrappedComponent) => {
	return class extends Component {
		state = {
			username: '',
			password: '',
			rePassword: ''
		}

		onChange = (stateName, stateValue) => {
			this.setState({[stateName]: stateValue});
		}

		composeChange = (name) => {
			return (e) => this.onChange(name, e.target.value);
		}

		handleSubmit = (e) => {
			e.preventDefault();
			const { username, password, rePassword } = this.state;
			if (rePassword) {
				alert(`用户名: ${username}, 密码: ${password}, 确认密码: ${rePassword}`);
			} else {
				alert(`用户名: ${username}, 密码: ${password}`);
			}
		}

		render () {
			// 抽取方法
			const mapMethodToProps = {
				composeChange: this.composeChange,
				handleSubmit: this.handleSubmit,
			}
			// 将状态数据和操作的方法以 props 的方式传入的包装组件中
			return (
				<div>
					{/*提取公共头部*/}
					<h2>{title}</h2>
					<WrappedComponent {...this.state} {...mapMethodToProps}/>
				</div>
			)
		}
	}

}

// 向外暴露的是高阶组件的返回值~包装了 Register 组件返回了一个新组件
