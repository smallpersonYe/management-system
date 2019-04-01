import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*
应用根组件
 */
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import './assets/less/reset.less'
export default class App extends Component {
    render() {
        return (
								<BrowserRouter>
									<Switch>
										<Route path="/login" component={Login}/>
										<Route path="/" component={Admin}/>
									</Switch>
								</BrowserRouter>
        )
    }
}
