import {
  Model,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  Association,
  HasManyAddAssociationMixin,
} from "sequelize";
import sequelize from "./index";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

export class Post extends Model {
  public id!: string;
  public author_id!: string;
  public author_username!: string;
  public subreddit_name!: string;
  public title!: string;
  public content!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getComments!: HasManyGetAssociationsMixin<Comment>;
  public countComments!: HasManyCountAssociationsMixin;

  public getVotes!: HasManyGetAssociationsMixin<Vote>;
  public countVotes!: HasManyCountAssociationsMixin;

  public static associations: {
    votes: Association<Post, Vote>;
    comments: Association<Post, Comment>;
  };
}

Post.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    author_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_username: {
      type: DataTypes.STRING(22),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    content: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  },
  {
    sequelize,
    tableName: "posts",
  }
);

Post.hasMany(Vote, { sourceKey: "id", foreignKey: "post_id" });
Post.hasMany(Comment, { sourceKey: "id", foreignKey: "post_id" });
