let express=require('express');
let path=require('path');
let app=express();
let index=require('./routes/index');
let userRouter=require('./routes/userRouter');
let productRouter=require('./routes/productRouter');
let orderRouter=require('./routes/orderRouter');

app.use(express.static(__dirname));

app.use('/',index);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);

app.listen(3333, () => {
    console.log("localhost:3333/");
});
