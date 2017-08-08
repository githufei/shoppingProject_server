let express=require('express');
let path=require('path');
let app=express();
/* app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);//让options请求快速返回
    else  next();
}); */
let index=require('./routes/index');
let userRouter=require('./routes/userRouter');
let productRouter=require('./routes/productRouter');
let orderRouter=require('./routes/orderRouter');
let bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use('/',index);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);

app.listen(3333, () => {
    console.log("localhost:3333/");
});
