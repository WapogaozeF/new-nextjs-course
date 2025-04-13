"use server";

import { storePost } from "@/lib/posts";
import { uploadImage } from "@/lib/s3";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
	const title = formData.get("title");
	const image = formData.get("image");
	const content = formData.get("content");
	let imageUrl;

	const errors = [];

	if (!title || title.trim().length === 0) {
		errors.push("Title is required!");
	}

	if (!content || content.trim().length === 0) {
		errors.push("Content is required!");
	}

	if (!image || image.size === 0) {
		errors.push("Image is required!");
	}

	if (errors.length > 0) {
		return { errors };
	}

	try {
		imageUrl = await uploadImage(image);
	} catch (error) {
		throw new Error(
			"Image upload failed, post was not created. Please try again later.",
		);
	}

	await storePost({
		imageUrl,
		title,
		content,
		userId: 1,
	});

	redirect("/feed");
}
