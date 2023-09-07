import { CustomError } from "../domain/custom-error";
import { Link } from "../domain/link";
import { SimpleUser } from "../domain/user";

export class LinkService {

  private readonly mappings = new Map<string, Link>();

  getAllMappings(user: SimpleUser): Array<Link> {
    return Array.from(this.mappings.values()).filter(link => link.user.email === user.email);
  }

  getLinkByMapping(mapping: string): string {

    if (!mapping || mapping.length === 0) {
      throw CustomError.invalid("Mapping can not be empty.");
    }

    if (this.mappings.has(mapping)) {
      return this.mappings.get(mapping)!.link;
    }

    throw CustomError.notFound(`Mapping '${mapping}' was not found.`);
  }

  setLink(link: Link) {
    if (!link) {
      throw CustomError.invalid("Link mapping can not be null.");
    }

    if (this.mappings.has(link.mapping)) {
      throw CustomError.conflic("This mapping is already in use.");
    }

    this.mappings.set(link.mapping, link);
  }

  removeLinkByMapping(mapping: string, user: SimpleUser) {
    if (!mapping || mapping.length === 0) {
      throw CustomError.invalid("Mapping can not be empty.");
    }

    if (!this.mappings.has(mapping)) {
      throw CustomError.notFound("This mapping does not exist.");
    }

    if (this.mappings.get(mapping)?.user.email !== user.email) {
      throw CustomError.unauthorized("This mapping belongs to another user.");
    }

    this.mappings.delete(mapping);
  }
}