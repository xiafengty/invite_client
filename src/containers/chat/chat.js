import React,{Component} from "react";
import {connect} from "react-redux";
import {sendMsg,readMsg} from "../../redux/actions";
import "../../assets/chatless.less";
import {NavBar, List, InputItem,Icon ,Grid} from 'antd-mobile';
const Item=List.Item;

class Chat extends Component {
    state={
        content:"",
        isShow:false
    };
    componentWillMount(){
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'];
        this.emojis = [];
        emojis.forEach((item)=>{
            this.emojis.push({
                text:item
            })
        })
    }
    send=()=>{
        const {content}=this.state;
        if(!content.trim()){
            return;
        }
        const from=this.props.user._id;
        const to=this.props.match.params.userid;
        this.props.sendMsg({content,from,to});
        this.setState({
            content:"",
            isShow:false
        });
    };
    toggleEmojis=()=>{
        const isShow=!this.state.isShow;
        this.setState({isShow});
        if(isShow){
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    };
    componentWillUnmount(){
        const meId=this.props.user._id;
        const targetId=this.props.match.params.userid;
        this.props.readMsg(targetId,meId);
    }
    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight);
    }
    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight+50);
    }
    render(){
        const user=this.props.user;
        const meId=user._id;
        const targetId=this.props.match.params.userid;
        const {users,userMsgs}=this.props.chat;
        const chatId=[meId,targetId].sort().join("_");
        if(!users[meId]){
            return <div>loading</div>
        }
        const msgs=userMsgs.filter(item=>item.chat_id===chatId);

        const targetIcon=require("../../components/info-headers/images/"+users[targetId].header+".png");
        return(
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type="left" />}
                    onClick={()=>this.props.history.replace("/message")}
                >{users[targetId].username}</NavBar>
                <List style={{marginBottom: 50}}>
                    {msgs.map((item,index)=>{
                        if(item.to===meId){
                            return(
                                <Item key={index}
                                    thumb={targetIcon}
                                >
                                    {item.content}
                                </Item>
                            )
                        }else{
                            return(
                                <Item
                                    key={item._id}
                                    className='chat-me'
                                    extra='我'
                                >
                                    {item.content}
                                </Item>
                            )
                        }
                    })}
                </List>
                <div id="inputs">
                <div className='am-tab-bar'>
                    <InputItem id="inputs2"
                        placeholder="请输入"
                        onChange={val => {this.setState({content: val})}}
                               onFocus={()=>this.setState({
                                   isShow:false
                               })}
                        value={this.state.content}
                        extra={
                            <span>
                                <span onClick={this.toggleEmojis}>😊</span>&nbsp;&nbsp;
                                <span onClick={this.send}>发送</span>
                            </span>
                        }
                    />
                    {
                        this.state.isShow?
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            isCarousel={true}
                            carouselMaxRow={3}
                            onClick={(value)=>this.setState({
                                content:this.state.content+value.text
                            })}
                        />:null
                    }
                </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)