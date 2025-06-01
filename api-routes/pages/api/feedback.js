import fs from "node:fs/promises";
import path from "node:path";

async function handler(req, res) {
	if (req.method === "POST") {
		const email = req.body.email;
		const feedbackText = req.body.text;

		const newFeedback = {
			id: new Date().toISOString(),
			email,
			text: feedbackText,
		};

		const filePath = path.join(process.cwd(), "data", "feedback.json");
		const fileData = await fs.readFile(filePath);
		const data = JSON.parse(fileData);
		data.push(newFeedback);
		await fs.writeFile(filePath, JSON.stringify(data));
		res.status(201).json({ message: "Success!", feedback: newFeedback });
	} else {
		res.status(200).json({ message: "This works!" });
	}
}

export default handler;
