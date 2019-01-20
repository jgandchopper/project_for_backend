module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('item',{
        cost:{
            type:DataTypes.INT,
            allowNull:false,
            
        },
        name:{
            type:DataTypes.STRING(15),
            allowNull:false
        },
    },{
        timestamps:true,
        paranoid:true
    })
};
