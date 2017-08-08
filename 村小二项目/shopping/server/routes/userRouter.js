let express = require('express');
let router = express.Router();
let {User} = require('../database/model');
// 个人信息
router.get('/myInfo',(req,res)=>{
    console.log('个人信息');
    console.log(req.body);
})
// 注册
router.post('/signUp',(req,res)=>{
            // post 请求 需要用'body-parser'
            // app.use(bodyParser.urlencoded({extended:true}));
            // app.use(bodyParser.json());
    // console.log('注册');
    // console.log(req.body);
    let {username,password1,password2}=req.body;
    let password=password1;
    if(password1===password2){
        User.create({username,password},(err,doc)=>{
            if(err){
                console.log(err);
            }
            res.send(JSON.stringify({code:1,msg:'注册成功'}));
        })
    }else{
        res.send(JSON.stringify({code:0,msg:'两次密码必须相同!'}));
    }
    
})
// 登录
router.post('/logIn',(req,res)=>{
    console.log('登录');
    // console.log(req.body);
    let {username,password}=req.body;
    User.findOne({username,password},(err,result)=>{
        if(!result){
            res.send('用户名和密码匹配成功!')
        }else{
            res.send('用户名或密码不匹配!');
        }
        console.log(result);
    })
})
// 注销
router.get('/logOut',(req,res)=>{
    console.log('注销');
})
module.exports=router;