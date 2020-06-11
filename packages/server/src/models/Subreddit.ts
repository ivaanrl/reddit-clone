import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import sequelize from "./index";
import { Post } from "./Post";
import { User } from "./User";
import { User_Subreddit } from "./User_Subreddit";

export class Subreddit extends Model {
  public id!: number;
  public owner_id!: string;
  public name!: string;
  public topics!: string;
  public description!: string;
  public adultContent!: boolean;
  public private!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPosts!: HasManyGetAssociationsMixin<Post>;
  public addPost!: HasManyAddAssociationMixin<Post, number>;
  public hasPost!: HasManyHasAssociationMixin<Post, number>;
  public countPosts!: HasManyCountAssociationsMixin;
  public createPost!: HasManyCreateAssociationMixin<Post>;
  public readonly posts?: Post[];

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUser!: HasManyAddAssociationMixin<User, string>;
  public hasUser!: HasManyHasAssociationMixin<User, string>;
  public countUsers!: HasManyCountAssociationsMixin;
  public createUser!: HasManyCreateAssociationMixin<User>;
  public readonly users?: User[];

  public static associations: {
    posts: Association<Subreddit, Post>;
    users: Association<Subreddit, User>;
  };
}

Subreddit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    owner_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    topics: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    adultContent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "subreddits",
    sequelize,
  }
);

Subreddit.hasMany(Post, { sourceKey: "id", foreignKey: "subreddit_id" });
