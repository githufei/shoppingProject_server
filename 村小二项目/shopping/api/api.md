**api**
# 首页

# 用户相关
/
/user/myPage


## 注册:
url:  /user/signUp
方式: post
参数: {
    userName:字符串, 必须
    password:字符串, 必须
    email:字符串, 非必须
}
返回值:{
    code:0 成功,1 失败
    msg:"注册成功/注册失败"
    
}
## 登录
url: /user/logIn
方式: post
参数: {
    userName:字符串 必须
    password:字符串 必须
}
## 注销登录
url: /user/logOut
方式: get
参数: 无


/order/

/product/

