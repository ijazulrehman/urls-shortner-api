
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { IAttributes } from "./entities/base";

const { JWT_SECRET } = process.env;

export const getHash = async (
    data: string
): Promise<string> => {
    return await bcrypt.hash(data, await bcrypt.genSalt());
};

export const getJWT = (payload): string =>
    jwt.sign(payload, JWT_SECRET);

export const verifyJWT = (token: string): IAttributes | string =>
    jwt.verify(token, JWT_SECRET);

export const compareHash = async (data: string, encryptedData: string): Promise<boolean> =>
    await bcrypt.compare(data, encryptedData);;
