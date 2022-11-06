//import React from "react";
import { Button } from "semantic-ui-react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import React, { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../context";
import { User } from "../entities";
import { useHistory } from "react-router-dom";

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
					`${process.env.REACT_APP_SERVER_DOMAIN}/api/authentication/google/login`
				)
			}
			size="medium"
		/>
	);
};

export default ThirdPartyAuthenticators;
