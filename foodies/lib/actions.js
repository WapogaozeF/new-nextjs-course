"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(formData) {
	"use server";

	const meal = {
		title: formData.get("title"),
		summary: formData.get("summary"),
		instructors: formData.get("instructors"),
		image: formData.get("image"),
		creator: formData.get("name"),
		creator_email: formData.get("email"),
	};

	await saveMeal(meal);
	redirect("/");
}
