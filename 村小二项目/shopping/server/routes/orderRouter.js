let express = require('express');
let router = express.Router();
let { Order } = require('../database/model');

// 服务器重启时,查询当前数据库中订单号最大值,然后加1作为下一个订单的订单号
let orderNumber;
Order.find()
    .sort({ orderNumber: -1 })
    .limit(1)
    .exec((err, docs) => {
        if (docs.length) {
            orderNumber = docs[0].orderNumber + 1;
        } else {
            orderNumber = 100001;
        }
    })
// 提交订单,增加订单
router.post('/addOrder', (req, res) => {
    let { purchaser, productName, count } = req.body;//前端提交的数据包括购买人,商品名称,数量等信息
    let createAt = Date.now();
    Order.create({ purchaser, productName, count, createAt, state: 0, orderNumber }, (err, doc) => {
        if (err) {
            res.send(JSON.stringify({
                code: 0,
                msg: "服务器内部错误",
            }))
        } else {
            orderNumber++;
            res.send(JSON.stringify({
                code: 1,
                msg: "订单提交成功",
            }))
        }
    })
})

// 订单列表
router.get('/getOrderList', (req, res) => {
    let { purchaser, cb } = req.query;
    let cbStr = "";
    Order.find({})
        .populate('productName')
        .populate('purchaser')
        .sort({ createAt: -1 })
        .limit(8)
        .exec((err, doc) => {
            let result = [];
            // let createAt=createAt.toLocalString();
            doc.forEach((item, index) => {
                var { productName, count, createAt, orderNumber, state } = item;
                var { productName, productImg } = productName;
                var data = { productName, productImg, count, createAt, orderNumber, state };
                result.push(data);
            })
            console.log(result);
            cbStr = cb + "(" + JSON.stringify(result) + ")";
            res.send(cbStr);
        })
})

// 订单详情
router.get('/orderDetail', (req, res) => {
    let {orderNumber}=req.query;
    Order.find({orderNumber},(err,doc)=>{
        if (err) {
            res.send('服务器内部错误!')
        }else{
             Order.find({})
            .populate('productName')
            .populate('purchaser')
            .sort({ createAt: -1 })
            .limit(8)
            .exec((err, doc) => {
                let result = [];
                // let createAt=createAt.toLocalString();
                doc.forEach((item, index) => {
                    var { productName, count, createAt, orderNumber, state } = item;
                    var { productName, productImg , } = productName;
                    var data = { productName, productImg, count, createAt, orderNumber, state };
                    result.push(data);
                })
                console.log(result);
                cbStr = cb + "(" + JSON.stringify(result) + ")";
                res.send(cbStr);
            })
        }
    })
})


// 删除订单
router.get('/deleteOrder',(req,res)=>{
    let {orderNumber}=req.query;
    Order.remove({orderNumber},(err,result)=>{
        if (err) {
            res.send('服务器内部错误!');
        }else{
            res.send(JSON.stringify({
                code:0,
                msg:'删除成功!'
            }));
        }
    })
})


// 付款
router.get('/payOrder',(req,res)=>{
    Order.update({orderNumber},{state:1},(err,doc)=>{
        if (err) {
            res.send(JSON.stringify({
               code:0,
               msg:'付款失败,服务器内部错误!'
           }))
        }else{
           res.send(JSON.stringify({
               code:1,
               msg:'付款成功!'
           }))
        }
    })
})


module.exports = router;
