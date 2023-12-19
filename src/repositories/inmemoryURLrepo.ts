import { Url } from "../models/urlModel";

export class InMemoryURLRepository {
  private urlDictionary: Record<string, Url> = {};

  async saveUrl(url: Url): Promise<Url> {
    this.urlDictionary[url.hash] = url;
    return url;
  }

  async getUrl(hash: string): Promise<Url | null> {
    const url = this.urlDictionary[hash];

    // Raise error if URL is not found
    if (!url) {
      throw new Error("URL not found");
    } else {
      return url;
    }
  }
}
