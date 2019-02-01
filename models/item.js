module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('item1',{
        product_name:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        seller_id:{
            type:DataTypes.STRING(40),
            allowNull:false,
            unique:true
        },
        cost:{
            type:DataTypes.INTEGER,
            allowNull:true,  
        },
        buyer_id:{
            type:DataTypes.STRING(10),
            allowNull:true
        },
        ended_time:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },{
        timestamps:true,
        paranoid:true
    })
};
