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
  public content!: string;
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "posts",
  }
);

Post.hasMany(Vote, { sourceKey: "id" });
