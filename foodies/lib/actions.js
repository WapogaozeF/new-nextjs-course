"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
	return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
	"use server";

	const meal = {
		title: formData.get("title"),
		summary: formData.get("summary"),
		instructors: formData.get("instructors"),
		image: formData.get("image"),
		creator: formData.get("name"),
		creator_email: formData.get("email"),
	};

	if (
		isInvalidText(meal.title) ||
		isInvalidText(meal.summary) ||
		isInvalidText(meal.instructors) ||
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		!meal.creator_email.include("@") ||
		!meal.image ||
		meal.image.size === 0
	) {
		return {
			message: "Invalid input.",
		};
	}

	await saveMeal(meal);
	redirect("/");
}
