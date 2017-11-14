import React from 'react';
import ReactDOM from 'react-dom';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import {Tabs,Carousel} from 'antd';
const TabPane=Tabs.TabPane;
export default class MobileIndex extends React.Component{
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
    return (
      <div id="mobileheader">
        <MobileHeader/>

        <Tabs>
          <TabPane tab="top" key="1">
          <div className="carousel">
            <Carousel {...settings}>
              <div><img src="./src/images/carousel_1.jpg"/></div>
              <div><img src="./src/images/carousel_2.jpg"/></div>
              <div><img src="./src/images/carousel_3.jpg"/></div>
              <div><img src="./src/images/carousel_4.jpg"/></div>
            </Carousel>
          </div>
            <MobileList count={20} type="top" />
          </TabPane>
          <TabPane tab="social" key="2">
          <MobileList count={20} type="shehui" />
          </TabPane>
          <TabPane tab="demostic" key="3">
          <MobileList count={20} type="guonei" />
          </TabPane>
          <TabPane tab="international" key="4">
          <MobileList count={20} type="guoji" />
          </TabPane>
          <TabPane tab="entertainment" key="5">
          <MobileList count={20} type="yule" />
          </TabPane>
        </Tabs>
        <MobileFooter/>
      </div>

    );
  };
}
