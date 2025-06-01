import { useRef } from "react";

function HomePage() {
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
		</div>
	);
}

export default HomePage;
