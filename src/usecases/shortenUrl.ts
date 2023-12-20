import { Url } from "../models/urlModel";
import { URLRepository } from "../repositories/URLrepository";
import { createURLobject } from "../utils/urlUtils";

export class shortenUrlUsecase {
  private urlRepository: URLRepository;

  constructor(urlRepository: URLRepository) {
    this.urlRepository = urlRepository;
  }

  async perform(originalUrl: string): Promise<Url> {
    // Create a URL object and get its hash
    const urlObj = createURLobject(originalUrl);

    // Save the URL object in the repository
    const savedUrl = await this.urlRepository.saveUrl(urlObj);

    return savedUrl;
  }
}
