import axios from "axios";

export default  function ajax(url,data={},type="GET") {
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