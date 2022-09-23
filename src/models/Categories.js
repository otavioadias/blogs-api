const CategoriesSchema = (sequelize, DataTypes) => {
    const CategoriesTable = sequelize.define('Categories', {
        name: DataTypes.STRING
    }, {
        tableName: 'categories',
        underscored: true,
        timestamps: false
    });
    return CategoriesTable;
};

module.exports = CategoriesSchema;