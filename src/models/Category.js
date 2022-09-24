const CategoriesSchema = (sequelize, DataTypes) => {
    const CategoriesTable = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        tableName: 'categories',
        underscored: true,
        timestamps: false
    });
    return CategoriesTable;
};

module.exports = CategoriesSchema;