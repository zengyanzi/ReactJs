import React from 'react';
import ReactDOM from 'react-dom';

import {Router,Route,hashHistory} from 'react-router';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import MediaQuery from 'react-responsive';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import PCNewsDetails from './components/pc_news_details';
import PCUserCenter from './components/pc_usercenter.js';
import MobileUserCenter from './components/mobile_usercenter.js';
export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的 Index，变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
          </Router>
          <PCIndex/>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
        <Router history={hashHistory}>
          <Route path="/" component={MobileIndex}></Route>
          <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
          <Route path="/usercenter" component={MobileUserCenter}></Route>
        </Router>
          <MobileIndex />
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
