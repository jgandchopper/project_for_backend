module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('bid_price',{
            product_name:{
                type:DataTypes.STRING(40),
                allowNull:false,
                unique:false
            },
            price:{
                type:DataTypes.INTEGER(40),
                allowNull:false,
                unique:false        }

        },
        {
            timestamps:true,
            paranoid:true
        }
    )
};
