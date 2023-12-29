import { URLRepository } from "../repositories/URLrepository";
import { InMemoryURLRepository } from "../repositories/inmemoryURLrepo";
import { IDatabase, IMain } from "pg-promise";
import { Url } from "../models/urlModel";
import { createPostgresURLRepository } from "../repositories/PostgresURLrepository";

export enum RepositoryType {
  InMemory,
  PostgreSQL,
}

export const createURLrepository = (
  type: RepositoryType,
  db: IDatabase<any>,
  pgp: IMain
): URLRepository => {
  switch (type) {
    case RepositoryType.PostgreSQL:
      return createPostgresURLRepository(db, pgp);
    case RepositoryType.InMemory:
      return new InMemoryURLRepository();
    default:
      throw new Error("Unsupported repository type");
  }
};
