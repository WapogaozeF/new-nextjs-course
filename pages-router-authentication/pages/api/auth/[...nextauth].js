import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection("users");

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					client.close();
					throw new Error("No user found!");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password,
				);

				if (!isValid) {
					client.close();
					throw new Error("Could not log you in!");
				}

				client.close();

				return { email: user.email };
			},
		}),
	],
});
