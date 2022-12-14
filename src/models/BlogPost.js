const blogPostsSchema = (sequelize, DataTypes) => {
    const blogPostsTable = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            after: 'content',
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        published: {
            type: DataTypes.DATE,
        },
        updated:  {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'blog_posts',
        underscored: true,
        timestamps: false,
    });

    blogPostsTable.associate = (models) => {
        blogPostsTable.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        });
    };

    return blogPostsTable;
};

module.exports = blogPostsSchema;