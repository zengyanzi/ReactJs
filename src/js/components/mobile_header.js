import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Col} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';

const FormItem =Form.Item;
const SubMenu =Menu.SubMenu;
const MenuItemGroup =Menu.ItemGroup;
const TabPane =Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'

class MobileHeader extends React.Component{
    constructor(){
      super();
      this.state={
        current:'top',
        modalVisible:false,
        action:'login',
        hasLogined:false,
        userNickName:'',
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
  		if (e.key = "register") {
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
      var myFetchOptions={
        method:'GET'
      };
      var formData= this.props.form.getFieldsValue();
      console.log(formData);
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
      + "&username="+formData.userName+"&password="+formData.password
      +"&r_userName=" + formData.r_userName + "&r_password="
      + formData.r_password + "&r_confirmPassword="
      + formData.r_confirmPassword, myFetchOptions)
      .then(response=>response.json()).then(json=>{
        this.setState({
          userName:json.NickUserName,userId:json.UserId
        });
        localStorage.userid= json.UserId;
        localStorage.userNickName = json.NickUserName;
      });
      if (this.state.action=="login") {
  			this.setState({hasLogined:true});
  		}
      message.success("success");
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
    login(){
        this.setModalVisible(true);
    };
    logout(){
      localStorage.usrid='';
      localStorage.userNickName='';
      this.setState({hasLogined:false});
    };
  render(){
    let {getFieldDecorator} = this.props.form;

    const userShow = this.state.hasLogined ?

    <Link to={'/usercenter'}>
        <Icon type="inbox" />
    </Link>

    :
    <Icon type="setting" onClick={this.login.bind(this)} />

    return (
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo" />
          <span>React News</span>
          {userShow}
        </header>
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
      </div>

    );
  };
}
export default MobileHeader=Form.create({})(MobileHeader)
