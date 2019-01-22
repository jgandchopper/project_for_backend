const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const {User} = require('../models');
const {Item} = require('../models');
const router = express.Router();

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    console.log(1111);
    const {email,nick,password} = req.body;
    console.log(req.body);
    try{
        const exUser = await User.find({where:{email}});
        if(exUser){
            req.flash('joinError','이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password,12);//모르겠음
        await User.create({
            email,
            nick,
            password:hash,
        });
        return res.redirect('/');
    } catch(error){
        console.error(error);
        return next(error);
    }
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    console.log(2222);
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            req.flash('loginError',info.message);
            return res.redirect('/');
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);//미들웨어 안에 미들웨어
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();//req.user 객체를 제거함.
    req.session.destroy();
    res.redirect('/');
})

router.post('/sell',isLoggedIn,(req,res)=>{
    let moment = require('moment');
    var {product_name, price} = req.body;
    try{
        const exItem = await Item.find({where:{product_name}});
        if(exItem){
            req.flash('이미 등록된 상품입니다.');
            return res.redirect('/sell');
        }
        await Item.create({
            product_name,
            'hpyho33@naver.com',//test
            price,
            'test',//test
            moment();
        })
    }
    
    console.log(3333);
    res.redirect('/selled_item');//home화면에 다른 걸 추가할 수 있어서 다른 페이지로 이동
})
router.post('/selled_item', isLoggedIn, function(req, res){
    //contact
})
module.exports = router;
    