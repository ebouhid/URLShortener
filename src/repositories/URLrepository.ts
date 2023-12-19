// Interface for URL repository

import { Url } from "../models/urlModel";

export interface URLRepository {
  saveUrl(url: Url): Promise<Url>;
  getUrl(hash: string): Promise<Url | null>;
}
