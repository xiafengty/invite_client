import {combineReducers} from "redux";
import {SUCCESS_MSG,ERROR_MSG} from "./action-types";
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
        default:
            return preState;
    }
}
export default combineReducers({
    users
});