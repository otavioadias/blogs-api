const usersSchema = (sequelize, DataTypes) => {
    const usersTable = sequelize.define('Users', {
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        tableName: 'users',
        underscored: true,
        timestamps: false
    });

    // usersTable.associate = (models) => {
    //     usersTable.hasMany(models.BlogPosts, {
    //         as: "blog_posts",
    //         foreignKey: "user_id"
    //     });
    // };

    return usersTable;
};

module.exports = usersSchema;