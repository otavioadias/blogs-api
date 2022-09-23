const blogPostsCategoriesSchema = (sequelize, DataTypes) => {
    const blogPostsCategories = sequelize.define('PostsCategories', 
    {
        post_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER,
    }, {
        tableName: 'posts_categories',
        underscored: true,
        timestamps: false
    });

    blogPostsCategories.associate = (models) => {
       models.BlogPosts.belongsToMany(models.Category, 
        {
            as: 'categories',
            through: PostsCategories,
            foreignKey: 'post_id',
            otherKey: 'category_id'
        });

        models.Category.belongsToMany(models.BlogPost, 
            {
                as: 'blog_posts',
                through: PostsCategories,
                foreignKey: 'category_id',
                otherKey: 'post_id'
            });
    };

    return blogPostsCategories;
};

module.exports = blogPostsCategoriesSchema;