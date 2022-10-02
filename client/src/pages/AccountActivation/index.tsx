import React from "react";
import { Segment, Loader } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import Page from "../../components/Page";

const AccountActivation: React.FC = (): JSX.Element => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const activationCode = params.get("activationCode");
	const { data, error } = useSWR<Response, Error>(
		() =>
			activationCode === null
				? null
				: "/api/authentication/activate?activationCode=" + activationCode,
		(url) =>
			fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json"
				}
			})
	);

	if (activationCode === null) {
		return (
			<Page>
				<Segment>
					Check the email associated with your account for an email with instructions for activating
					your account.
				</Segment>
			</Page>
		);
	}

	if (error) {
		return (
			<Page>
				<Segment>
					This activation code is not associated with any account. Remember activation codes are
					only valid for 24 hours after account creation. Please sign up again to recreate your
					account.
				</Segment>
			</Page>
		);
	}

	return (
		<Page>
			{!data ? (
				<Segment>
					Activating your account <Loader active inline />
				</Segment>
			) : (
				<Segment>
					Your account has been activated. Please login with the method you created your account.
				</Segment>
			)}
		</Page>
	);
};

export default AccountActivation;
