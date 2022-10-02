import React from "react";
import { Button } from "semantic-ui-react";

type ThirdPartyAuthenticatorsProps = {
	action: "login" | "sign-up";
};

const ThirdPartyAuthenticators: React.FC<ThirdPartyAuthenticatorsProps> = (props): JSX.Element => {
	return (
		<Button
			color="red"
			content="Google"
			fluid
			icon="google"
			onClick={(event, data) =>
				window.location.replace(
					`${process.env.REACT_APP_MYMA_SERVER}/api/authentication/google/login`
				)
			}
			size="medium"
		/>
	);
};

export default ThirdPartyAuthenticators;
