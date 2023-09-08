import { Collection, MongoClient, Document } from "mongodb";
import { CustomError } from "../domain/custom-error";
import { Link } from "../domain/link";
import { MongoUserRepository } from "./mongo-user-repository";

export class MongoLinkRepository {
    private static instance: MongoLinkRepository;

    private async toLinkMapping(document: Document) {
        if (!document.mapping ||!document.link ||!document.email) {
            throw CustomError.internal("Invalid user document.");
        }
        const user = await (await MongoUserRepository.getInstance()).getUser(document.email);
        return new Link(document.link, document.mapping, user.toSimpleUser());
    }

    constructor(private readonly collection: Collection) {
        if (!collection) {
            throw new Error("Link collection is required.");
        }
    }   

    static async getInstance() {
        if (!this.instance) {
            const mongoClient = new MongoClient(process.env.DB_CONN_STRING || "mongodb://localhost:27017");
            await mongoClient.connect();
            const db = mongoClient.db(process.env.DB_NAME || "ll-db");
            const collection = db.collection(process.env.LINK_COLLECTION_NAME || "links");
            this.instance = new MongoLinkRepository(collection);
        }
        return this.instance;
    };

    async createLinkMapping(link: Link): Promise<Link> {
        const result = await this.collection.insertOne({
            link: link.link,
            mapping: link.mapping,
            email: link.user.email
        });
        if (result && result.acknowledged && result.insertedId) {
            return this.getLinkMapping(link.mapping);
        } else {
            throw CustomError.internal("Could not create user.");
        }
    }

    async linkMappingExists(mapping: string): Promise<boolean> {
        const result = await this.collection.findOne({ mapping });
        return !!result;
    }

    async getLinkMapping(mapping: string): Promise<Link> {
        const result = await this.collection.findOne({ mapping });
        if (result) {
                return this.toLinkMapping(result)
        } else {
            throw CustomError.notFound("Link mapping not found.");
        }
    }

    async getAllLinkMappings(userEmail: string): Promise<Array<Link>> {
        const result = await this.collection.find({ email: userEmail }).toArray();
        if (result) {
            return Promise.all(result.map(this.toLinkMapping));
        } else {
            throw CustomError.notFound("Link mapping not found.");
        }
    }   

    async removeLinkMapping(mapping: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ mapping });
        return !!result && result.acknowledged;
    }
}