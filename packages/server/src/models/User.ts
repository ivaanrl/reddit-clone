import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "./index";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Subreddit } from "./Subreddit";
import { User_Subreddit } from "./User_Subreddit";
import { Vote } from "./Vote";

export class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public karma!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPosts!: HasManyGetAssociationsMixin<Post>;
  public addPost!: HasManyAddAssociationMixin<Post, number>;
  public hasPost!: HasManyHasAssociationMixin<Post, number>;
  public countPosts!: HasManyCountAssociationsMixin;
  public createPost!: HasManyCreateAssociationMixin<Post>;
  public readonly posts?: Post[];

  public getComments!: HasManyGetAssociationsMixin<Comment>;
  public addComment!: HasManyAddAssociationMixin<Comment, number>;
  public hasComment!: HasManyHasAssociationMixin<Comment, number>;
  public countComments!: HasManyCountAssociationsMixin;
  public createComment!: HasManyCreateAssociationMixin<Comment>;
  public readonly comments?: Comment[];

  public joinSubreddit!: BelongsToManyCreateAssociationMixin<Subreddit>;
  public getSubreddits!: BelongsToManyGetAssociationsMixin<Subreddit>;

  public static associations: {
    posts: Association<User, Post>;
    comments: Association<User, Comment>;
    subreddits: Association<User, Subreddit>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    karma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.hasMany(Post, { sourceKey: "id", foreignKey: "author_id", as: "posts" });
User.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "author_id",
  as: "comments",
});
User.hasMany(Vote, {
  sourceKey: "id",
  foreignKey: "author_id",
  as: "subreddits",
});
User.belongsToMany(Subreddit, { through: User_Subreddit });
