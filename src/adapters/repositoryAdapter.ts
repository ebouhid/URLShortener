import { URLRepository } from "../repositories/URLrepository";
import { InMemoryURLRepository } from "../repositories/inmemoryURLrepo";

export enum RepositoryType {
    InMemory
}

export function createURLrepository(type: RepositoryType): URLRepository {
    switch (type) {
        case RepositoryType.InMemory:
            return new InMemoryURLRepository();
        default:
            throw new Error("Not implemented repository type");
    }
}

