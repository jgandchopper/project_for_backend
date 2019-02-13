const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const {User, Item, Bid} = require('../models');
const router = express.Router();

const moment = require('moment');

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    const {email,nick,password} = req.body;
    //console.log(req.body);
    try{
        const exUser = await User.find({where:{email}});
        console.log(exUser);
        if(exUser){
            req.flash('joinError','이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        console.log('11');
        const hash = await bcrypt.hash(password,12);
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
router.get('/logout',isNotLoggedIn,(req,res)=>{
    res.redirect('/');
})
router.post('/sell',isLoggedIn,async(req,res,next)=>{
    const {product_name,cost,ended_time} = req.body
    seller_id = req.user.dataValues.email
    userId = null;
    try{
        const exItem = await Item.find({where:{product_name}})
        if(exItem){
            req.flash('이미 등록된 상품입니다');
            return res.redirect('/sell');
        }
        await Item.create({
            product_name,
            seller_id,
            cost,
            userId,
            ended_time
        });
        return res.redirect('/selled_item');
    }
    catch(error){   
        console.error(error);
        return next(error);
    }
});
router.post('/sell_proccess', isLoggedIn, async(req, res)=>{
    
    const {product_name, bid_price} = req.body;
    console.log("*****************************\n"+product_name,bid_price+"\n");
    
    try{
        const Bbid_price = await Bid.create({
            product_name,
            price:bid_price,
        });
        return res.redirect('/');
    }
    catch(error){
        console.error(error);
    }
})
module.exports = router;
    