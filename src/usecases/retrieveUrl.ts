import { URLRepository } from "../repositories/URLrepository";
import { Url } from "../models/urlModel";

export class retrieveUrlUsecase {
  private urlRepository: URLRepository;

  constructor(urlRepository: URLRepository) {
    this.urlRepository = urlRepository;
  }

  async perform(hash: string): Promise<Url | null> {
    // Get the URL object from the repository
    const urlObj = await this.urlRepository.getUrl(hash);

    return urlObj;
  }
}
