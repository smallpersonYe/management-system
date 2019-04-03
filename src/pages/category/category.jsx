import React, { Component } from 'react';
import { Card, Table, Icon, Button } from 'antd';
import MyButton from '../../components/my-button/my-button';
import './category.less';
export default class Category extends Component {
	render() {
		const columns = [{
			title: '品类名称',
			dataIndex: 'name',
		}, {
			title: '操作',
			className: 'operator',
			dataIndex: 'operator',
			render: text => <div>
				<MyButton>修改名称</MyButton>
				<MyButton>查看其子类品</MyButton>
			</div>,
		}];

		const data = [{
			key: '1',
			name: '辣条',
		}, {
			key: '2',
			name: '雪糕',
		}, {
			key: '3',
			name: '矿泉水',
		}, {
			key: '4',
			name: '泡面',
		}, {
			key: '5',
			name: '香烟',
		}];
		return (
			<Card
				title="一级分类列表"
				extra={<Button type="primary"><Icon type="plus"/>添加品类</Button>}
				className="category"
			>
				<Table
					columns={columns}
					dataSource={data}
					bordered
					pagination={{
						showSizeChanger: true,
						pageSizeOptions: ['3', '6', '9', '12'],
						defaultPageSize: 3,
						showQuickJumper: true,
					}}
				/>
			</Card>
		)


	}
}