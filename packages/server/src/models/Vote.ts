import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

export class Vote extends Model {
  public id!: number;
  public author_id!: string;
  public value!: number;
  public post_id: number;
  public comment_id: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vote.init(
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
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    comment_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "votes",
  }
);
