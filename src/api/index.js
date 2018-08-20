import ajax from "./ajax";
const BASE="";
export const reqRegister=({username,password,surePassword,type})=>ajax(BASE+"/register",{username,password,surePassword,type},"POST");
export const reqLogin=({username,password})=>ajax(BASE+"/login",{username,password},"POST");
export const reqUpdate=user=>ajax(BASE+"/update",user,"POST");
export const reqUser=()=>ajax(BASE+"/user");
export const reqUserList=(type)=>{
 return ajax(BASE+"/userlist",type)
};
export const reqMsgList=()=>ajax(BASE+"/msglist");
export const reqReadMsg=(from)=>ajax(BASE+"/readmsg",{from},"POST");