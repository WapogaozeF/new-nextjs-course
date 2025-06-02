import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";

function FeedbackPage(props) {
	const [feedbackData, setFeedbackData] = useState();
	function loadFeedBackHandler(id) {
		fetch(`/api/${id}`)
			.then((response) => response.json())
			.then((data) => setFeedbackData(data.feedback));
	}

	return (
		<Fragment>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{props.feedbackItems.map((item) => (
					<li key={item.id}>
						{item.text}{" "}
						<button type="button" onClick={loadFeedBackHandler.bind(null, item.id)}>
							Show Details
						</button>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

export async function getStaticProps() {
	const filePath = buildFeedbackPath();
	const feedbackItems = await extractFeedback(filePath);

	return {
		props: {
			feedbackItems,
		},
	};
}

export default FeedbackPage;
