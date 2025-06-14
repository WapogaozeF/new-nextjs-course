import { buildFeedbackPath, extractFeedback } from "./index";

async function handler(req, res) {
	const feedbackId = req.query.feedbackId;
	const filePath = buildFeedbackPath();
	const feedbackData = await extractFeedback(filePath);
	const selectedFeedback = feedbackData.find(
		(feedback) => feedback.id === feedbackId,
	);
	res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
