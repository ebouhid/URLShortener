import { Url } from "../models/urlModel";
import { generateHash } from "./getHash";
export function createURLobject(originalUrl: string): Url {
    const hash = generateHash();
  return {
    originalUrl,
    hash,
  };
}