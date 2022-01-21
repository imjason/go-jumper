$(document).ready(function(){
    checkLink();
});
// 若博客启用了Pjax请去掉注释。
$(document).on('pjax:complete', function () {
    checkLink();
});
async function checkLink(){
    let link = document.getElementsByTagName('a');
    for(var i=0;i<link.length;i++){
        //如果你的博客添加了Gitter聊天窗，请去掉下方注释
        if(link[i].href==="" /*|| link[i].className==="gitter-open-chat-button"*/)continue;
        if(!await checkLocalSite(link[i].href)){
            link[i].href = "https://go.qystudio.ltd/#"+window.btoa(link[i].href)
            //console.log("edit.")
        }
    }
}
async function checkLocalSite(url){
    try{
        //console.log("check:",url)
        let reg = new RegExp(/\/\/(.*)\//g)
        let domain = reg.exec(url)[1].split('/')[0].split('.')
        //console.log(domain,domain[domain.length-2]+'.'+domain[domain.length-1])
        domain = {
            //二级域名请去除下一行的注释
            check: (domain[domain.length-3]+'.'+domain[domain.length-2]+'.'+domain[domain.length-1]).split('/')[0],
            original: domain
        }
        //console.log(domain)
        if(domain.check==="qystudio.ltd" || domain.check==="/" || domain.original[0].split('/')[0]==="localhost:4000")return true;//将domain.check修改为根或二级域名，domain.original[0].split('/')[0]修改为本地测试页面
        return false;
    }catch(err){
        return true;
    }
}
