const blogPostsCategoriesSchema = (sequelize, DataTypes) => {
    const blogPostsCategories = sequelize.define('PostCategory', 
    {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blog_posts',
                key: 'id',
              },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
              model: 'categories',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
    }, {
        tableName: 'posts_categories',
        underscored: true,
        timestamps: false
    });

    blogPostsCategories.associate = (models) => {
       models.BlogPost.belongsToMany(models.Category, 
        {
            as: 'categories',
            through: blogPostsCategories,
            foreignKey: 'post_id',
            otherKey: 'category_id'
        });

        models.Category.belongsToMany(models.BlogPost, 
            {
                as: 'blog_posts',
                through: blogPostsCategories,
                foreignKey: 'category_id',
                otherKey: 'post_id'
            });
    };

    return blogPostsCategories;
};

module.exports = blogPostsCategoriesSchema;