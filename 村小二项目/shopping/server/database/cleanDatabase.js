let {Order,User}=require('./model');
// 情况订单列表
Order.remove({},function(err,result){
    if(err){
        console.log(err);
    }else{
        console.log(result.result);
        // {ok:1,n:2}
        // ok=1表示的是删除操作成功,n=0表示实际删除掉的记录条数为2
    }
})

// 清空用户列表
// User.remove({},function(err,result){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result.result);
//         // {ok:1,n:2}
//         // ok=1表示的是删除操作成功,n=0表示实际删除掉的记录条数为2
//     }
// })