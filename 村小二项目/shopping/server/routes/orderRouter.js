let express = require('express');
let router = express.Router();
// 订单详情
router.get('/orderDetail',(req,res)=>{
    console.log('订单详情');
})
// 订单列表
router.get('/orderList',(req,res)=>{
    console.log('订单列表');
})
module.exports=router;
