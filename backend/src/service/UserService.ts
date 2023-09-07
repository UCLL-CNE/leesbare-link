import { CustomError } from "../domain/custom-error";
import { hash } from "../domain/hash";
import { User } from "../domain/user";

export class UserService {

  readonly users = new Map<string, User>();
  static instance: UserService;

  private constructor() {
    // Do nothing...
  }

  async addUser(email: string, password: string) {
    if (!email || email.length < 3) {
      throw CustomError.invalid('Email is invalid.');
    }

    if (!password || password.length < 8 || password.length > 64) {
      throw CustomError.invalid('Password must be between 8 and 64 characters.');
    }

    if (this.users.has(email)) {
      throw CustomError.conflic('A user with this email address already exists.');
    }

    const user = new User(email, await hash(password));
    this.users.set(email, user);
  }

  async getUser(email: string) {
    if (!email || !this.users.has(email)) {
      throw CustomError.invalid('User not found.');
    }

    return this.users.get(email)!;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }

    return this.instance;
  }
}