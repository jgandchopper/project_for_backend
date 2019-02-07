module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('item',{
        product_name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:false
        },
        seller_id:{
            type:DataTypes.STRING(40),
            allowNull:false,
            unique:false
        },
        cost:{
            type:DataTypes.INTEGER,
            allowNull:true,  
            unique:false
        },
        buyer_id:{
            type:DataTypes.STRING(10),
            allowNull:true,
            unique:false
        },
        ended_time:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:false
        }
    },{
        timestamps:true,
        paranoid:true
    })
};