import io from 'socket.io-client';
import {SUCCESS_MSG,ERROR_MSG,RECEIVE_USER,RESET_USER,GET_LIST,GET_USER_MSGS,GET_USER_MSG,MSG_READ} from "./action-types";
import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser,
    reqUserList,
    reqMsgList,
    reqReadMsg
} from "../api";
const successMsg=(user)=>({type:SUCCESS_MSG,data:user});
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
const receiveUser=(user)=>({type:RECEIVE_USER,data:user});
export const resetUser=(msg)=>({type:RESET_USER,data:msg});
const getList=(userlist)=>({type:GET_LIST,data:userlist});
const receiveUserMsgs=({users,userMsgs,meId})=>({type:GET_USER_MSGS,data:{users,userMsgs,meId}});
const receiveUserMsg=(userMsg,meId)=>({type:GET_USER_MSG,data:{userMsg,meId}});
const msgRead=({count,targetId,meId})=>({type:MSG_READ,data:{count,targetId,meId}});

const usernameReg =  /^(?=.*[0-9]).{8,15}|(?=.*[a-z]).{8,15}|(?=.*[0-9])(?=.*[a-z]).{8,15}$/;    //只能包含英文、数字和下划线，长度为5-12位。
const passwordReg = /^(?=.*[0-9])(?=.*[a-z]).{8,20}$/;    //只能包含英文、数字和下划线，长度为6-18位。


export  function register({username,password,surePassword,type}) {
    if(surePassword){
        if(password!==surePassword){
            return{type:ERROR_MSG,data:"您两次输入的密码不一致！"}
        }
    }
    if(username===password){
        return{type:ERROR_MSG,data:"用户名和密码不能相同！"}
    }
    if(!usernameReg.test(username)){
        return{type:ERROR_MSG,data:"您输入的用户名不符合格式！"}
    }else if(!passwordReg.test(password)){
        return{type:ERROR_MSG,data:"您输入的秒不符合格式！"}
    }
    return async dispatch => {
        const response=await reqRegister({username,password,surePassword,type});
        const result=response.data;
        if(result.code===0){
            const user=result.data;
            getUserMsg(dispatch,user._id);
            dispatch(successMsg(user));
        }else{
            const msg=result.msg;
            dispatch(errorMsg(msg));
        }
    }
}

export  function login({username,password}) {
    if(!usernameReg.test(username)){
        return{type:ERROR_MSG,data:"您输入的用户名不符合格式！"}
    }else if(!passwordReg.test(password)){
        return{type:ERROR_MSG,data:"您输入的秒不符合格式！"}
    }
    return async dispatch=>{
       const res=await reqLogin({username,password});
        const result=res.data;
        if(result.code===0){
            const user=result.data;
            getUserMsg(dispatch,user._id);
            dispatch(successMsg(user));
        }else{
            const msg=result.msg;
            dispatch(errorMsg(msg));
        }

    }
}

export function updateUser (user) {
    return async dispatch=>{
        const res=await reqUpdate(user);
        const result=res.data;
        if(result.code===0){
            const user=result.data;
            dispatch(receiveUser(user));
        }else{
            const msg=result.msg;
            dispatch(resetUser(msg));
        }
    }
}
export function autoLogin() {
    return async dispatch=>{
        const res=await reqUser();
        const result=res.data;/*{code,data}*/
        if(result.code===0){
            const user=result.data;
            getUserMsg(dispatch,user._id);
            dispatch(receiveUser(user));
        }else{
            dispatch(resetUser(result.msg));
        }
    }
}

export function getUserList(type) {
    return async dispatch=> {
        const res = await reqUserList({type});
        const result = res.data;
        if (result.code === 0) {
            dispatch(getList(result.data));
        }
    }
}
function initSocketIO(dispatch,meId) {
    io.meId=meId;
    if(!io.socket){
        io.socket=io("ws://localhost:5000");
        io.socket.on("recieveMsg",(userMsg)=>{
            console.log("浏览器接收到服务器发送的消息",userMsg);
            if(userMsg.from===io.meId || userMsg.to===io.meId){
                dispatch(receiveUserMsg(userMsg,io.meId));
            }
        });
    }

}

export function sendMsg({content,from,to}) {
    return dispatch=>{
        io.socket.emit("sendMsg",{content,from,to});
        console.log("浏览器向服务器发送请求",{content,from,to});
    }
}
/*获取异步消息，在登录成功后发送*/
async function getUserMsg(dispatch,meId) {
        initSocketIO(dispatch,meId);
        const res=await reqMsgList(meId);
        const result=res.data;
        if(result.code===0){
            const {users,userMsgs}=result.data;
            dispatch(receiveUserMsgs({users,userMsgs,meId}));
        }
}
/*更新读取的消息*/
export function readMsg(targetId,meId) {
    return async dispatch=>{
        const  res=await reqReadMsg(targetId);
        const result=res.data;
        if(result.code===0){
            const count=result.data;
            dispatch(msgRead({count,targetId,meId}))
        }
    }
}