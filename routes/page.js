const express = require('express');
const{isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const {Item, Bid} = require('../models');
const mysql = require('mysql');
var count = 0;


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
})
router.get('/selled_item',isLoggedIn,async(req, res)=>{ //구매하기 버튼을 눌렀을 때 호출
    const dataValues_list = [];//get item_db values
    const bidValues_list = []; //get bid_db values
    const cur_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    Item.findAll().then(function(result){
        Bid.findAll().then(function(bid_result){
            for(var data_index in result) {//판매중인 아이템 정보
                dataValues_list.push(result[data_index].dataValues);
            }
            for(var bid_index in bid_result){//입찰 할 금액
                bidValues_list.push(bid_result[bid_index].dataValues);
            }
            res.render('selled_item',{
                url:cur_url,
                user:req.user,
                bid_data:bidValues_list,
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

console.log(1);
module.exports = router;