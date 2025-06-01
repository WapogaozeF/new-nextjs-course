import { useRef, useState } from "react";

function HomePage() {
	const [feedbackItems, setFeedbackItems] = useState([]);

	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		fetch("/api/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: enteredEmail,
				text: enteredFeedback,
			}),
		});
	}

	function loadFeedBackHandler() {
		fetch("/api/feedback")
			.then((response) => response.json())
			.then((data) => setFeedbackItems(data.feedback));
	}

	return (
		<div>
			<h1>The Home Page</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor="email">Your Email Address</label>
					<input type="email" id="email" ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor="feedback">Your Feedback</label>
					<textarea id="feedback" ref={feedbackInputRef} rows={5} />
				</div>
				<button type="submit">Submit</button>
			</form>
			<hr />
			<button onClick={loadFeedBackHandler} type="button">
				Load Feedback
			</button>
			<ul>
				{feedbackItems.map((item) => (
					<p key={item.id}>{item.text}</p>
				))}
			</ul>
		</div>
	);
}

export default HomePage;
