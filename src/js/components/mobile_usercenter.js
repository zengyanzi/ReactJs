import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
  notification,
	Upload
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class MobileUserCenter extends React.Component{
	constructor(){
		super();
		this.state={
			usercollection:'',
			previewImage:'',
			usercomments: '',
			previewVisible:false
		};
	};
	componentDidMount() {
			var myFetchOptions = {
				method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
			.then(response=>response.json())
			.then(json=>{
				this.setState({usercollection:json});
			});

			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
			.then(response=>response.json())
			.then(json=>{
				this.setState({usercomments:json});
			});
		};
  render(){
		const props = {
		action: 'http://newsapi.gugujiankong.com/handler.ashx',
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		listType: 'picture-card',
		defaultFileList: [
			{
				uid: -1,
				name: 'xxx.png',
				state: 'done',
				url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
				thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
			}
		],
		onPreview: (file) => {
			this.setState({previewImage: file.url, previewVisible: true});
		}
	};
		const {usercollection,usercomments} = this.state;
		const usercollectionList=usercollection.length?
		usercollection.map((uc,index)=>(
			<Card key={index} title={uc.uniquekey} extra={<a href={'/#/details/${uc.uniquekey}'}>View</a>}>
				<p>{uc.Title}</p>
			</Card>
		))

		:
		'no result';
		const usercommentsList=usercomments.length?
		usercomments.map((comment,index)=>(
			<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
				<p>{comment.Comments}</p>
			</Card>
		))

		:
		'no comments';
    return(
      <div>
        <MobileHeader/>
        <Row>

          <Col span={24}>
          <Tabs>
            <TabPane tab="my favorite" key="1">

							<Row>
								<Col span={24}>{usercollectionList}</Col>
							</Row>
            </TabPane>
            <TabPane tab="my comments" key="2">
						<Row>
							<Col span={24}>{usercommentsList}</Col>
						</Row>
            </TabPane>
            <TabPane tab="my icon" key="3">
						<div className="clearfix">
							<Upload {...props}>
								<Icon type="plus" />
								<div className="ant-upload-text">Upload photo</div>
							</Upload>
							<Modal visible={this.state.previewVisible} footer={null}
							onCancel={this.handleCancel}>
							<img alt="preview" src={this.state.previewImage} />
							</Modal>
						</div>
            </TabPane>

          </Tabs>
          </Col>

        </Row>

        <MobileFooter/>
      </div>
    );
  }
}
