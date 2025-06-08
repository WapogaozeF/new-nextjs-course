import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
	return await hash(password, 12);
}

export async function verifyPassword(password, hashPassword) {
	return await compare(password, hashPassword);
}
