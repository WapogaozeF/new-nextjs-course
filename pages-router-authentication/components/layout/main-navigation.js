import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";
import { Fragment } from "react/jsx-runtime";

function MainNavigation() {
	const [session, loading] = useSession();

	function logoutHandler() {
		signOut();
	}

	return (
		<header className={classes.header}>
			<Link href="/">
				<div className={classes.logo}>Next Auth</div>
			</Link>
			<nav>
				<ul>
					{!session && !loading && (
						<li>
							<Link href="/auth">Login</Link>
						</li>
					)}
					{session && (
						<Fragment>
							<li>
								<Link href="/profile">Profile</Link>
							</li>
							<li>
								<button type="button" onClick={logoutHandler}>
									Logout
								</button>
							</li>
						</Fragment>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
