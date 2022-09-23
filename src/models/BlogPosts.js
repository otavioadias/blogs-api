const blogPostsSchema = (sequelize, DataTypes) => {
    const blogPostsTable = sequelize.define('BlogPosts', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, {
        tableName: 'blog_posts',
        underscored: true,
        timestamps: false,
    });

    // blogPostsTable.associate = (models) => {
    //     blogPostsTable.belongsTo(models.Users, {
    //         as: "user",
    //         foreignKey: "user_id"
    //     });
    // };

    return blogPostsTable;
};

module.exports = blogPostsSchema;