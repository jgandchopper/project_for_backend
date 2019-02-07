const express = require('express');
const{isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const {Item} = require('../models');
const mysql = require('mysql');
var count = 0;
const Window = require('window');
const window = new Window();

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
    const dataValues_list = [];//get db values 
    const cur_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    Item.findAll().then(function(result){
        for(var data_index in result){
            dataValues_list.push(result[data_index].dataValues);
        }
        res.render('selled_item',{
        url:cur_url,
        user:req.user,
        data:dataValues_list,
        data_length:dataValues_list.length    
    });
    });
});
router.get('/selled_item/*', isLoggedIn, (req, res)=>{//품목을 선택했을 때 호출
    
    res.render('auction_popup',{
        user:req.user,    
    });
    });

console.log(1);
module.exports = router;