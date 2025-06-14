import { useSession, getSession } from "next-auth/client";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect, useState } from "react";

function UserProfile() {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getSession().then((session) => {
			setIsLoading(true);
			if (!session) {
				window.location.href = "/auth";
			} else {
				setIsLoading(false);
			}
		});
	}, []);

	if (isLoading) {
		return <p className={classes.profile}>Loading...</p>;
	}

	async function changePasswordHandler(passwordData) {
		const response = await fetch("/api/user/change-password", {
			method: "PATCH",
			body: JSON.stringify(passwordData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		console.log(data);
	}

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm onChangePassword={changePasswordHandler} />
		</section>
	);
}

export default UserProfile;
