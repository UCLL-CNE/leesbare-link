import { MongoClient, Collection, Document } from "mongodb";
import { User } from "../domain/user";
import { CustomError } from "../domain/custom-error";

export class MongoUserRepository {

    private static instance: MongoUserRepository;

    private toUser(document: Document) {
        if (!document.email ||!document.passwordHash) {
            throw CustomError.internal("Invalid user document.");
        }
        return new User(document.email, document.passwordHash);
    }

    constructor(private readonly collection: Collection) {
        if (!collection) {
            throw new Error("User collection is required.");
        }
    }   

    static async getInstance() {
        if (!this.instance) {
            const mongoClient = new MongoClient(process.env.DB_CONN_STRING || "mongodb://localhost:27017");
            await mongoClient.connect();
            const db = mongoClient.db(process.env.DB_NAME || "ll-db");
            const collection = db.collection(process.env.USER_COLLECTION_NAME || "users");
            this.instance = new MongoUserRepository(collection);
        }
        return this.instance;
    };

    async createUser(user: User): Promise<User> {
        const result = await this.collection.insertOne(user);
        if (result && result.acknowledged && result.insertedId) {
            return this.getUser(user.email);
        } else {
            throw CustomError.internal("Could not create user.");
        }
    }

    async userExists(email: string): Promise<boolean> {
        const result = await this.collection.findOne({ email });
        return !!result;
    }

    async getUser(email: string): Promise<User> {
        const result = await this.collection.findOne({ email });
        if (result) {
                return this.toUser(result)
        } else {
            throw CustomError.notFound("User not found.");
        }
    }
}