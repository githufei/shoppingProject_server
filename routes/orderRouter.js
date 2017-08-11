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
router.get('/addOrder', (req, res) => {
    console.log('增加订单');
    let { productName, count ,cb, purchaser } = req.query;//前端提交的数据包括购买人,商品名称,数量等信息
    let createAt = Date.now();
    // let cookie = req.headers.cookie;
    // let cookieObj = querystring.parse(cookie, ';');
    // let purchaser = cookieObj.username;//购买人从cookie读取当前登录的用户
    let cbStr = ``;
    console.log(purchaser, productName, count, createAt,  orderNumber);
    Order.create({ purchaser, productName, count, createAt, state: 0, orderNumber }, (err, doc) => {
        console.log('增加订单号',orderNumber);
        if (err) {
            res.send(cb + "(" + JSON.stringify({
                code: 0,
                msg: "服务器内部错误",
            }) + ")")
        } else {
            res.send(cb + "(" + JSON.stringify({
                code: 1,
                msg: "订单提交成功",
                orderNumber:orderNumber++
            }) + ")")
        }
    })
})

// 订单列表
router.get('/getOrderList', (req, res) => {
    console.log('订单列表');
    let { purchaser, cb, ordertype } = req.query;//ordertype表示的是要获取订单的状态种类,已完成0,未付款1,全部
    console.log('购买人:',purchaser, '订单类型:', ordertype);
	let cbStr = "";
    let according={purchaser};
    if (ordertype==0||ordertype==1){
        according={state:ordertype,purchaser}
    }
    Order.find(according)
        .populate('productName')
        .populate('purchaser')
        .sort({ createAt: -1 })
        .limit(8)
        .exec((err, doc) => {
            let result = [];
            // let createAt=createAt.toLocalString();
            console.log(doc);
            doc&&doc.forEach((item, index) => {
                var { productName, count, createAt, orderNumber, state } = item;
                var { productName, productImg, describe, price } = productName;
                var data = { productName, productImg, describe, price, count, createAt, orderNumber, state };
                result.push(data);
            })
            console.log(result);
            cbStr = cb + "(" + JSON.stringify(result) + ")";
            res.send(cbStr);
        })
})

// 订单详情
router.get('/orderDetail2', (req, res) => {
    console.log('订单详情');
    let {orderNumber,cb}=req.query;
    console.log('orderNumber',orderNumber);
    let cbStr=``;
    Order.find({orderNumber})
        .populate('productName')
        .populate('purchaser')
        .exec((err, doc) => {
            if(err){
               cbStr = cb + "(" + JSON.stringify({code:0,msg:'发生错误!'}) + ")";
            }else{
                let result = [];
                doc.forEach((item, index) => {
                    var { productName, count, createAt, orderNumber, state } = item;
                    var { productName, productImg } = productName;
                    var data = { productName, productImg, count, createAt, orderNumber, state };
                    result.push(data);
                })
                cbStr = cb + "(" + JSON.stringify(result) + ")";
                console.log(result);
            }
            res.send(cbStr);
            })
    }
)
// 临时测试 订单详情
router.get('/orderDetail', (req, res) => {
    console.log('订单详情');
    let {orderNumber}=req.query;
    console.log('orderNumber',orderNumber);
    Order.find({orderNumber},(err,doc)=>{
        if (err) {
            res.send(JSON.stringify({code:0,msg:'发生错误'}));
        }
        console.log(doc);
        res.send(JSON.stringify(doc));
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
    console.log('付款');
    let {orderNumber, cb}=req.query;
    let cbStr='';
    console.log('付款订单号',orderNumber);        
    Order.update({orderNumber},{state:1},(err,doc)=>{
        if (err) {
            cbStr = cb + "(" + JSON.stringify({ code:0, msg:'付款失败!' }) + ")";
        }else{
            cbStr = cb + "(" + JSON.stringify({ code:1, msg:'付款成功!' }) + ")";
        }
        res.send(cbStr);
    })
})


module.exports = router;
