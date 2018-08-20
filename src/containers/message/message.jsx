import React,{Component} from "react";
import {connect} from "react-redux";
import {List, Badge} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;
class Message extends Component{
   getLastMsgs=(userMsgs,meId)=>{
       const lastMsgObjs={};
       userMsgs.forEach((item,index)=>{
           if(!item.read && item.to===meId){
               item.unReadCount=1;
           }else{
               item.unReadCount=0;
           }
           const chatId=item.chat_id;
           const lastMsg=lastMsgObjs[chatId];
           if(!lastMsg){
               lastMsgObjs[chatId]=item;
           }else{
               const  unReadCount=lastMsg.unReadCount+item.unReadCount;
               if(item.create_time>lastMsg.create_time){
                   lastMsgObjs[chatId]=item;
               }
               lastMsgObjs[chatId].unReadCount=unReadCount;
           }
       });
       const lastMsgs=Object.values(lastMsgObjs);
       lastMsgs.sort((msg1,msg2)=>{
           return msg2.create_time-msg1.create_time;
       });
       return lastMsgs;
   };
    render(){
        const {user}=this.props;
        const meId=user._id;
        const {users,userMsgs}=this.props.chat;
        const lastMsgs=this.getLastMsgs(userMsgs,meId);
        return(
            <List style={{marginTop: 50, marginBottom: 50}}>
                {
                  lastMsgs.map((msg)=>{
                      const targetId=  meId  ===msg.from ?msg.to:msg.from;
                      const targetUser=users[targetId];
                      return (
                          <Item
                              key={msg._id}
                              extra={<Badge text={msg.unReadCount}/>}
                              thumb={require(`../../components/info-headers/images/${targetUser.header}.png`)}
                              arrow='horizontal'
                              onClick={() => this.props.history.push(`/chat/${targetId}`)}
                          >
                              {msg.content}
                              <Brief>{targetUser.username}</Brief>
                          </Item>
                      )
                  })
                }
            </List>
        )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),
    {}
)(Message);