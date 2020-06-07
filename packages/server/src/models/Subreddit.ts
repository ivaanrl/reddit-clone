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

export class Subreddit extends Model {
  public id!: number;
  public name: string;
  public private: boolean;

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
  },
  {
    tableName: "subreddits",
    sequelize,
  }
);

Subreddit.hasMany(Post, { sourceKey: "id" });
