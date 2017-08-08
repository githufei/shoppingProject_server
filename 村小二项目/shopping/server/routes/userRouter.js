let express = require('express');
let router = express.Router();
// 个人信息
router.get('/myPage',(req,res)=>{
    console.log('个人信息');
})
// 注册
router.post('/signUp',(req,res)=>{
    console.log('注册');
})
// 登录
router.post('/logIn',(req,res)=>{
    console.log('登录');
})
// 注销
router.get('/logOut',(req,res)=>{
    console.log('注销');
})
module.exports=router;