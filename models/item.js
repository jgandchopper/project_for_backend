module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('Item',{
        seller_id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        item_name:{
            type:DataTypes.STRING,
            allowNull:false
            
        },
        cost:{
            type:DataTypes.INT,
            allowNull:true,
            
        },
        buyer_id:{
            type:DataTypes.STRING,
            allowNull:true
        },
        ended_time:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        timestamps:true,
        paranoid:true,
    })
};
