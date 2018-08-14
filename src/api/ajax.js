import axios from "axios";
const usernameReg =  /^(?=.*[0-9]).{8,15}|(?=.*[a-z]).{8,15}|(?=.*[0-9])(?=.*[a-z]).{8,15}$/;    //只能包含英文、数字和下划线，长度为5-12位。
const passwordReg = /^(?=.*[0-9])(?=.*[a-z]).{8,20}$/;    //只能包含英文、数字和下划线，长度为6-18位。
export default  function ajax(url,data={},type="GET") {
    if(data.surePassword){
        if(data.password!==data.surePassword){
            console.log("您两次输入的密码不一致！");
            return;
        }
    }
    if(data.username===data.password){
        console.log("用户名和密码不能相同！");
        return;
    }
    if(!usernameReg.test(data.username)){
        console.log("您输入的用户名不符合格式！");
        return;
    }else if(!passwordReg.test(data.password)){
        console.log("您输入的秒不符合格式！");
        return;
    }
    if(type==="GET"){
        let dataStr="";
        Object.keys(data).forEach(item=>{
            dataStr += item+"="+data[item]+"&";
        });
        if(dataStr){
            dataStr=dataStr.substring(0,-1);
            url+=url+"?"+dataStr;
        }
        return axios.get(url);
    }else if(type==="POST"){
        return axios.post(url,data);
    }
}