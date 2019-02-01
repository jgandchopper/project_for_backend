const express = require('express');
const{isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const {Item} = require('../models')
const mysql = require('mysql')


router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{
        title:'회원가입 ',
        user:req.user,
        joinError:req.flash('joinError')
    });
});

router.get('/',(req,res,next)=>{
    res.render('main',{
        title:'auction',
        twits:[],
        user:req.user,
        loginError:req.flash('loginError')
    });
});
router.get('/sell',(req,res)=>{
    res.render('sell',{
        title:'autction 판매창',
        user:req.user,
        sellError:req.flash('sellError')
    })
})
router.get('/selled_item',isLoggedIn, (req, res)=>{
    //async <<<<<<<< (auth check)
    const dataValues_list = [];
    Item.findAll().then(function(result){
        for(var data_index in result){
            dataValues_list.push(result[data_index].dataValues);
        }
        res.render('selled_item',{
        data:dataValues_list,
        data_length:dataValues_list.length    
    });
    });
    
    
});
console.log(1);
module.exports = router;