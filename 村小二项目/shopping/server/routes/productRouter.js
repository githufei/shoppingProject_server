let express = require('express');
let router = express.Router();
let { Product } = require('../database/model');

// 商品列表
router.get("/productList", (req, res) => {
    let { type, cb } = req.query;
    type = decodeURI(type);
    let cbStr = "";
    let findByType = (type) => Product.find({ type })
        .limit(6)
        .exec((err, doc) => {
            console.log(doc);
            cbStr = cb + "(" + JSON.stringify(doc) + ")";
            res.send(cbStr);
        })
    switch (type) {
        case "东北特产":
            findByType('东北特产');
            break;
        case '华北特产':
            findByType('华北特产');
            break;
        case '华南特产':
            findByType('华南特产');
            break;
        case '其它地区':
            findByType('华北特产');
            break;
        default:
            Product.find()
                .sort({ sales: -1 })
                .limit(6)
                .exec((err, doc) => {
                    cbStr = cb + "(" + JSON.stringify(doc) + ")";
                    res.send(cbStr);
                })
    }
})
// 购物车
router.get('/shoppingCar', (req, res) => {
    console.log('购物车');

})
// 查询商品详情
router.get('/productDetail', (req, res) => {
    console.log('商品详情');
    // let productName=req.query.productName;
    // let cb=req.query.cb;
    let { _id, cb } = req.query;
    console.log(_id);
    let cbStr = "";
    Product.find({ _id }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        cbStr = cb + "(" + JSON.stringify(doc) + ")";
        //    console.log(cbStr);
        res.send(cbStr);
    });

})
// 热销列表
router.get('/getHotList', (req, res) => {
    console.log('热销列表');
    let cb = req.query.cb;
    let cbStr = "";
    Product.find()
        .sort({ sales: -1 })
        .limit(12)
        .exec((err, doc) => {
            // console.log(doc);
            cbStr = cb + "(" + JSON.stringify(doc) + ")";
            res.send(cbStr);
        })
})

module.exports = router;