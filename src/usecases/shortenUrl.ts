import { Url } from "../models/urlModel";
import { createURLobject } from "../utils/urlUtils";

export class shortenUrlUsecase {
  perform(originalUrl: string): Url {
    // Create a URL object and get its hash
    const urlObj = createURLobject(originalUrl);

    return urlObj;
  }
}
