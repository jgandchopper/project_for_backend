const express = require('express');
const{isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const {Item, Bid} = require('../models');
const product_dic = {};//최고가 계산을 위함

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{
        title:'회원가입 ',
        user:req.user,
        joinError:req.flash('joinError')
    });
});

router.get('/',(req,res,next)=>{
    res.render('selled_item',{
        title:'auction',
        twits:[],
        user:req.user,
        loginError:req.flash('loginError')
    });
});
router.get('/sell',isLoggedIn,(req,res)=>{
    res.render('sell',{
        title:'autction 판매창',
        user:req.user,
        sellError:req.flash('sellError')
    })
});
router.get('/selled_item',isLoggedIn,async(req, res)=>{ //구매하기 버튼을 눌렀을 때 호출

    const dataValues_list = [];//get item_db values
    const bidValues_list = []; //get bid_db values
    const cur_url = req.protocol + '://' + req.get('host') + req.originalUrl;

    Item.findAll().then(function(result){
        Bid.findAll().then(function(bid_result){
            for(var data_index in result) {//판매중인 아이템 정보
                dataValues_list.push(result[data_index].dataValues);
            }
            for(var bid_index in bid_result){//들어온 경매가
                bidValues_list.push(bid_result[bid_index].dataValues);
            }
            for(var index in bidValues_list){//제일 높은 입찰가 만들기
                if(!(bidValues_list[index].product_name in product_dic)){
                    product_dic[bidValues_list[index].product_name] = bidValues_list[index].price;

                }
                else{
                    if(product_dic[bidValues_list[index].product_name] < bidValues_list[index].price){
                        product_dic[bidValues_list[index].product_name] = bidValues_list[index].price;
                    }
                }
            }
            console.log(dataValues_list.length);
            res.render('selled_item',{
                url:cur_url,
                user:req.user,
                bid_data:product_dic,
                data:dataValues_list,
                data_length:dataValues_list.length
            });
        });

    });
});
var product_name;
router.get('/selled_item/*', isLoggedIn, function test(req, res){//품목을 선택했을 때 팝업 호출
    const url_length = req.originalUrl.length;
    product_name = req.originalUrl.slice(13, url_length);
    res.render('auction_popup',{
        user:req.user,
        product_name:product_name,
    });
});

router.get('/get_price',isLoggedIn, (req, res)=>{
    res.render('bid_price', {
        user:req.user,
        product_name:product_name,
    });
});



router.get('/sell_proccess',isLoggedIn, (req, res, err)=>{//입력된 입찰가가 현 입찰가보다 작을 때 돌아가기
    const {product_name, bid_price} = req.body;
    if(bid_price <= product_dic[product_name]){
        res.redirect('selled_item/*');
    }
    else{
        console.log(err);
    }
});

module.exports = router;