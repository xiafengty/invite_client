import {combineReducers} from "redux";
import {SUCCESS_MSG,ERROR_MSG,RECEIVE_USER,RESET_USER,GET_LIST} from "./action-types";
import getRedirctPath from  "../utils/getredirctpath";
 let initState={
     username:"",
    type:"",
    msg:"",
    redirectTo:""
};
function users(preState=initState,action) {
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
export default combineReducers({
    users,
    userList
});