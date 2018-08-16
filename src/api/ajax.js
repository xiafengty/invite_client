import axios from "axios";

export default  function ajax(url,data={},type="GET") {
    if(type==="GET"){
        let dataStr="";
        Object.keys(data).forEach(item=>{
            const value=data[item];
            dataStr += item+"="+value+"&";
        });
        if(dataStr){
            dataStr=dataStr.substring(0,dataStr.length-1);
            url +="?" + dataStr;
        }
        return axios.get(url);
    }else if(type==="POST"){
        return axios.post(url,data);
    }
}