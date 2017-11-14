import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Col} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const FormItem =Form.Item;
const SubMenu =Menu.SubMenu;
const MenuItemGroup =Menu.ItemGroup;
const TabPane =Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'

class PCHeader extends React.Component{
  constructor(){
    super();
    this.state={
      current:'top',
      modalVisible:false,
      action:'login',
      hasLogined:false,
      userNickName: '',
      userId:0
    }
  };
  componentWillMount(){
    if(localStorage.userid !=''){
      this.setState({hasLogined:true});
      this.setState({
        userNickName:localStorage.userNickName,
        userid:localStorage.userid

      })
    }
  };
  setModalVisible(value){
    this.setState({
      modalVisible:value
    });
  };
  handleClick(e) {
		if (e.key =="register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	};
  handleSubmit(e){
      e.preventDefault();
  		var myFetchOptions = {
  			method: 'GET'
  		};
  		var formData = this.props.form.getFieldsValue();
    console.log(formData);

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {

			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};
  callback(key){
    if(key==1){
      this.setState({action:'login'});
    }
    else if(key==2){
      this.setState({action:'register'});
    }
  };
  logout(){
    localStorage.usrid='';
    localStorage.userNickName='';
    this.setState({hasLogined:false});
  };
  render(){
    let{getFieldDecorator}=this.props.form;
    const userShow =this.state.hasLogined
    ?

      <Menu.Item key="logout" className="register">
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        
        <Link target="_blank" to={'/usercenter'}>
          <Button type="dashed" htmlType="button">Profile</Button>
        </Link>

          &nbsp;&nbsp;
          <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>Exit</Button>
      </Menu.Item>

    :

      <Menu.Item key="register" className="register">
        <Icon type="appstore"/>Register / login
      </Menu.Item>

    return (
      //这里替换了之前的 Index，变成了程序的入口
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="./src/images/logo.png" alt="logo" />
              <span>React News</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore"/>Breaking
              </Menu.Item>
              <Menu.Item key="Society">
                <Icon type="appstore"/>Society
              </Menu.Item>
              <Menu.Item key="Entertainment">
                <Icon type="appstore"/>Entertainment
              </Menu.Item>
              <Menu.Item key="Sport">
                <Icon type="appstore"/>Sport
              </Menu.Item>
              <Menu.Item key="Economy">
                <Icon type="appstore"/>Economy
              </Menu.Item>
              <Menu.Item key="Demostic">
                <Icon type="appstore"/>Demostic
              </Menu.Item>
              <Menu.Item key="International">
                <Icon type="appstore"/>International
              </Menu.Item>
              <Menu.Item key="Science">
                <Icon type="appstore"/>Science
              </Menu.Item>
              {userShow}
            </Menu>
<Modal title="profile" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="close">
  <Tabs type="card" onChange={this.callback.bind(this)}>
  <TabPane tab="Login" key="1">
    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
      <FormItem label="account">
        <Input placeholder="please input your account" {...getFieldDecorator('userName')} />
      </FormItem>
      <FormItem label="password">
        <Input  type="password" placeholder="please input your password" {...getFieldDecorator('password')} />
      </FormItem>
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  </TabPane>

    <TabPane tab="Register" key="2">
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label="account">
          {getFieldDecorator('r_userName', {
             rules: [{ required: true, message: 'Please input your username!' }],
           })(
             <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
           )}
        </FormItem>
        <FormItem label="password">
          {getFieldDecorator('r_password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem label="comfirm">
        {getFieldDecorator('r_confirmPassword', {
          rules: [{ required: true, message: 'Please confirm your Password!' }],
        })(
          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
        )}
        </FormItem>
        <Button type="primary" htmlType="submit">Regsier</Button>
      </Form>
    </TabPane>
  </Tabs>
</Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  };
}

export default PCHeader =Form.create({})(PCHeader)
