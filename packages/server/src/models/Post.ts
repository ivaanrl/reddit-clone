import {
  Model,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  Association,
} from "sequelize";
import sequelize from "./index";
import { User } from "./User";
import { Vote } from "./Vote";

export class Post extends Model {
  public id!: number;
  public author_id!: string;
  public subreddit_id!: number;
  public title!: string;
  public content!: string[];
  public upvotes!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getVotes!: HasManyGetAssociationsMixin<Vote>;
  public countUpvotes!: HasManyCountAssociationsMixin;

  public static associations: {
    votes: Association<Post, Vote>;
  };
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    content: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    /*upvotes: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },*/
  },
  {
    sequelize,
    tableName: "posts",
  }
);

Post.hasMany(Vote, { sourceKey: "id", foreignKey: "post_id" });
