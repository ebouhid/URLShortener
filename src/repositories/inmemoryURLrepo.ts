import { Url } from "../models/urlModel";

export class InMemoryURLRepository {
  private urlDictionary: Record<string, Url> = {};

  async saveUrl(url: Url): Promise<Url> {
    this.urlDictionary[url.hash] = url;
    return url;
  }

  async getUrl(hash: string): Promise<Url | null> {
    const url = this.urlDictionary[hash];

    // Let's return a copy of the url object to avoid accidental mutations
    return url ? { ...url } : null;
  }
}
