import { Model, DataTypes, HasManyAddAssociationMixin } from "sequelize";
import sequelize from "./index";
import { User } from "./User";

export class User_Subreddit extends Model {
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addUser!: HasManyAddAssociationMixin<User, number>;
}

User_Subreddit.init(
  {
    role: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  { tableName: "users_subreddits", sequelize }
);
