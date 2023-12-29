import { IDatabase, IMain } from 'pg-promise';
import { Url } from '../models/urlModel';
import { URLRepository } from './URLrepository';


// Define the repository class
class PostgresURLRepository implements URLRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  // Save URL to the PostgreSQL database
  async saveUrl(url: Url): Promise<Url> {
    return this.db.one(
      'INSERT INTO urls(original_url, hash) VALUES($1, $2) RETURNING *',
      [url.originalUrl, url.hash]
    );
  }

  // Get URL by hash from the PostgreSQL database
  async getUrl(hash: string): Promise<Url | null> {
    return this.db.oneOrNone('SELECT * FROM urls WHERE hash = $1', [hash]);
  }
}

// Export a factory function to create instances of the repository
export const createPostgresURLRepository = (db: IDatabase<any>, pgp: IMain) => {
  return new PostgresURLRepository(db, pgp);
};
