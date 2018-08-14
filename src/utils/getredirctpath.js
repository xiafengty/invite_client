

/*
* 获取重定向地址
* dazen
* boss
* dazeninfo
* bossinfo
* */

function getRedirctPath(type,header) {
    let path="";
    if(type==="daZen"){
        path="/dazen"
    }else{
        path="/boss"
    }
    if(!header){
        path+="info";
    }
    return path;
}
export default getRedirctPath;