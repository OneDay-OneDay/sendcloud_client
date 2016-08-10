#sendcloud client  
>集成SendCloud常用API的邮件客户端应用  
  
  
###目前实现的功能  
1. 邮件的普通发送以及模板发送功能  
2. 邮件模板预览以及添加删除  
3. 邮件标签展示、添加以及删除  
4. 地址列表展示、添加以及删除  
   

>注：暂不支持IE浏览器下的邮件模板预览  

###start
  
1. `npm install`安装模块依赖  

  
2. `webpack -w --progress`生成转义后的静态文件 => 在此之前，需要全局安装webpack `npm install webpack -g`  

  
3. `supervisor ./bin/www` 或 `npm start`开启Nodejs服务器。
