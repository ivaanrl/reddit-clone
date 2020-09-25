import { Model, DataTypes, HasManyAddAssociationMixin } from "sequelize";
import sequelize from "./index";
import { User } from "./User";

export class Saved_Post extends Model {
  public post_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Saved_Post.init(
  {
    post_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "saved_posts", sequelize }
);
