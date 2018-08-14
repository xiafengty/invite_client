import {SUCCESS_MSG,ERROR_MSG} from "./action-types";
import {reqRegister,reqLogin} from "../api";
export const successMsg=(user)=>({type:SUCCESS_MSG,data:user});

export const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});

export  function register({username,password,surePassword,type}) {
    return dispatch => {
        reqRegister({username,password,surePassword,type}).then(
            response =>{
                /*{code:0,data:user},{code:1,msg:xxx}*/
                const result=response.data;
                if(result.code===0){
                    const user=result.data;
                    dispatch(successMsg(user));
                }else{
                    const msg=result.msg;
                    dispatch(errorMsg(msg));
                }
            }
        )
    }
}
export  function login({username,password,surePassword,type}) {
    return dispatch=>{
        reqLogin({username,password}).then(
            res=>{
                /*{code:0,data:user},{code:1,msg:xxx}*/
                const result=res.data;
                if(result.code===0){
                    const user=result.data;
                    console.log('1',user);
                    dispatch(successMsg(user));
                }else{
                    const msg=result.msg;
                    dispatch(errorMsg(msg));
                }
            }
        )
    }
}