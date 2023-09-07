import { CustomError } from "./custom-error";
import { SimpleUser, User } from "./user";

export class Link {
  constructor(readonly link: string, readonly mapping: string, readonly user: SimpleUser) {
    if (!link || link.length < 3 ||link.length > 2048) {
      throw CustomError.invalid("Link is invalid. Must be between 3 and 2048 characters (inclusive).");
    }

    if (!user) {
      throw CustomError.invalid("A link must belong to a user.");
    }
  }
}