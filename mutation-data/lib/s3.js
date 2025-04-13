import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

if (!process.env.REGION) {
	throw new Error("REGION env not set!");
}

if (!process.env.ACCESS_KEY_ID) {
	throw new Error("ACCESS_KEY_ID env not set!");
}

if (!process.env.SECRET_ACCESS_KEY) {
	throw new Error("SECRET_ACCESS_KEY env not set!");
}

if (!process.env.ENDPOINT) {
	throw new Error("ENDPOINT env not set!");
}

if (!process.env.FORCE_PATH_STYLE) {
	throw new Error("FORCE_PATH_STYLE env not set!");
}

export const s3Client = new S3Client({
	region: process.env.REGION,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
	endpoint: process.env.ENDPOINT,
	forcePathStyle: Boolean(process.env.FORCE_PATH_STYLE),
});

export async function uploadImage(image) {
	const imageData = await image.arrayBuffer();
	const mime = image.type;

	const fileName = `${uuidv4()}.${mime.split("/")[1]}`;

	const params = {
		Bucket: "nextjs-course-mutations",
		Key: fileName,
		Body: Buffer.from(imageData),
		ContentType: mime,
	};

  const command = new PutObjectCommand(params);
	await s3Client.send(command);

	const fileUrl = `${process.env.ENDPOINT}/nextjs-course-mutations/${fileName}`;

	return fileUrl;
}
