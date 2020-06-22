import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "./index";
import { User } from "./User";
import { Post } from "./Post";
import { Vote } from "./Vote";

export class Comment extends Model {
  public id!: number;
  public author_id!: string;
  public content!: string[];
  public post_id!: string;
  public comment_id: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getComments!: HasManyGetAssociationsMixin<Comment>;
  public addComment!: HasManyAddAssociationMixin<Comment, number>;
  public hasComment!: HasManyHasAssociationMixin<Comment, number>;
  public countComments!: HasManyCountAssociationsMixin;
  public createComment!: HasManyCreateAssociationMixin<Comment>;
  public readonly comments?: Post[];

  public static associations: {
    comments: Association<Comment, Comment>;
  };
}

Comment.init(
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);

Comment.hasMany(Comment, { sourceKey: "id" });
Comment.hasMany(Vote, { sourceKey: "id" });
