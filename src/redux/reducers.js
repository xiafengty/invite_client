import {combineReducers} from "redux";
import {
    SUCCESS_MSG, ERROR_MSG, RECEIVE_USER, RESET_USER, GET_LIST, GET_USER_MSGS, GET_USER_MSG,
    MSG_READ
} from "./action-types";
import getRedirctPath from  "../utils/getredirctpath";
 let initState={
     username:"",
    type:"",
    msg:"",
    redirectTo:""
};
function user(preState=initState,action) {
    switch (action.type){
        case SUCCESS_MSG:
            const user=action.data;
            return {...user,redirectTo:getRedirctPath(user.type,user.header)};
        case ERROR_MSG:
            const msg=action.data;
            return {...preState,msg};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...preState,msg:action.data};
        default:
            return preState;
    }
}
let initList=[];
function userList(preState=initList,action) {
    switch (action.type){
        case GET_LIST:
            return action.data;
        default:
            return preState;
    }
}
let initChat={
    users:{},
    userMsgs:[],
    unReadCount:0
};
function chat(preState=initChat,action) {
    switch (action.type){
        case GET_USER_MSGS:
            var {users,userMsgs,meId}=action.data;
            return {
                users,
                userMsgs,
                unReadCount:userMsgs.reduce((prev,msg)=>prev+(!msg.read && msg.to===meId?1:0),0)
            };
        case GET_USER_MSG:
            var {userMsg,meId}=action.data;
            return {
                users:preState.users,
                userMsgs:[...preState.userMsgs,userMsg],
                unReadCount:preState.unReadCount+(!userMsg.read && userMsg.to===meId?1:0)
            };
            console.log(preState.unReadCount,preState,222);
        case MSG_READ:
            var {count, targetId, meId} = action.data;
            return {
                users: preState.users,
                userMsgs:preState.userMsgs.map(msg => {
                    if(msg.from===targetId && msg.to===meId && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: preState.unReadCount - count,
            };
        default:
            return preState;
    }
}
export default combineReducers({
    user,
    userList,
    chat
});