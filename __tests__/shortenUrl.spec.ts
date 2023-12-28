import { InMemoryURLRepository } from "../src/repositories/inmemoryURLrepo";
import { shortenUrlUsecase } from "../src/usecases/shortenUrl";

describe("Shorten Url", () => {
  it("should return a URL Object with the correct URL", () => {
    const inMemoryURLRepository = new InMemoryURLRepository();
    const usecase = new shortenUrlUsecase(inMemoryURLRepository);

    const url = "https://www.google.com";
    const urlObj = usecase.perform(url);
    expect(urlObj).toHaveProperty("originalUrl", url);
  });

  it("should return a URL Object with a hash", () => {
    const inMemoryURLRepository = new InMemoryURLRepository();
    const usecase = new shortenUrlUsecase(inMemoryURLRepository);

    const url = "https://www.google.com";
    const urlObj = usecase.perform(url);
    expect(urlObj).toHaveProperty("hash");
  });
});
