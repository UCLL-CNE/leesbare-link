import bcrypt from "bcrypt";

const saltRounds = 10;

export const hash = async (value: string) => {
  return bcrypt.hash(value, saltRounds);
}

export const compare = async (value: string, hash: string) => {
  return bcrypt.compare(value, hash);
}