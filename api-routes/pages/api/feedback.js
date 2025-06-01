import fs from "node:fs/promises";
import path from "node:path";

function buildFeedbackPath() {
	return path.join(process.cwd(), "data", "feedback.json");
}

async function extractFeedback(filePath) {
	const fileData = await fs.readFile(filePath);
	return JSON.parse(fileData);
}

const feedbackFilePath = buildFeedbackPath();

async function handler(req, res) {
	if (req.method === "POST") {
		const email = req.body.email;
		const feedbackText = req.body.text;

		const newFeedback = {
			id: new Date().toISOString(),
			email,
			text: feedbackText,
		};

		const data = await extractFeedback(feedbackFilePath);
		data.push(newFeedback);
		await fs.writeFile(feedbackFilePath, JSON.stringify(data));
		res.status(201).json({ message: "Success!", feedback: newFeedback });
	} else {
		const data = await extractFeedback(feedbackFilePath);
		res.status(200).json({ feedback: data });
	}
}

export default handler;
