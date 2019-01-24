const express = require('express');
const{isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router = express.Router();


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

module.exports = router;
