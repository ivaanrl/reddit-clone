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

export class Notification extends Model {
  public id!: string;
  public author_id!: string;
  public reply_id!: string;
  public original_id!: string;
  public subreddit_name!: string;
  public user_id!: string;
  public read!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
    },
    reply_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    original_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subreddit_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, tableName: "notifications" }
);
