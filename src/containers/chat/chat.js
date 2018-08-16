import React,{Component} from "react";
import {connect} from "react-redux";
import {sendMsg} from "../../redux/actions";
import {NavBar, List, InputItem} from 'antd-mobile';
const Item=List.Item;
class Chat extends Component {
    state={
        content:""
    };
    send=()=>{
        const {content}=this.state;
        const from=this.props.users._id;
        const to=this.props.match.params.userid;
        this.props.sendMsg({content,from,to});
    };
    render(){
        const users=this.props.users;
        return(
            <div id='chat-page'>
                <NavBar>{users.username}</NavBar>
                <List>
                    <Item
                        thumb={require("../../components/info-headers/images/头像1.png")}
                    >
                        你好
                    </Item>
                    <Item
                        thumb={require("../../components/info-headers/images/头像1.png")}
                    >
                        你好2
                    </Item>
                    <Item
                        className='chat-me'
                        extra='我'
                    >
                        很好
                    </Item>
                    <Item
                        className='chat-me'
                        extra='我'
                    >
                        很好2
                    </Item>
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        onChange={val => {this.setState({content: val})}}
                        extra={
                            <span onClick={this.send}>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({users:state.users}),
    {sendMsg}
)(Chat)