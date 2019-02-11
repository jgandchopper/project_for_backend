module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('bid_price',{
        product_name:{
            type:STRING(40),
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER(40),
            allowNull:false,
            unique:true
        }

    },
    {
        timestamps:true,
        paranoid:true
    })
};
