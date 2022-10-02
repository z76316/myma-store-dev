import React, { useState, useCallback, useReducer, Reducer } from "react";
import { Form, FormProps, Button, Message, Loader } from "semantic-ui-react";
import CryptoJS from "crypto-js";

type FormValues = {
	name: string;
	email: string;
	confirmedEmail: string;
	password: string;
	confirmedPassword: string;
};

type FormAction = {
	type: "LOADING" | "SUCCESS" | "CONFIRM_EMAIL_ERROR" | "CONFIRM_PASSWORD_ERROR" | "REQUEST_ERROR";
	payload?: boolean | string;
};

type FormActionState = {
	loading: boolean;
	confirmEmailError: boolean;
	confirmPasswordError: boolean;
	requestError?: string;
	success: boolean;
};

const formStateReducer = (state: FormActionState, action: FormAction): FormActionState => {
	switch (action.type) {
		case "CONFIRM_EMAIL_ERROR":
			return { ...state, confirmEmailError: action.payload as boolean };
		case "CONFIRM_PASSWORD_ERROR":
			return { ...state, confirmPasswordError: action.payload as boolean };
		case "LOADING":
			return {
				loading: (action.payload as boolean) ?? true,
				success: false,
				confirmEmailError: false,
				confirmPasswordError: false,
				requestError: undefined
			};
		case "SUCCESS":
			return {
				loading: false,
				success: (action.payload as boolean) ?? true,
				confirmEmailError: false,
				confirmPasswordError: false,
				requestError: undefined
			};
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

const LocalSignUpForm: React.FC = (props): JSX.Element => {
	const [formValues, setFormValues] = useState<FormValues>({
		name: "",
		email: "",
		confirmedEmail: "",
		password: "",
		confirmedPassword: ""
	});
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formStateReducer,
		{ loading: false, success: false, confirmEmailError: false, confirmPasswordError: false }
	);

	const onSubmit = useCallback(
		(data: FormProps) => {
			formStateDispatch({ type: "LOADING" });
			fetch("/api/authentication/local/sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: formValues.name,
					email: formValues.email,
					hashedPassword: CryptoJS.SHA256(formValues.password + formValues.email).toString(
						CryptoJS.enc.Base64
					)
				})
			})
				.then((res) =>
					res.status === 201
						? formStateDispatch({ type: "SUCCESS" })
						: formStateDispatch({
								type: "REQUEST_ERROR",
								payload:
									"Unable to create your account. Please try again. In the case that you continue to be unable to create an account, please contact us using the tab at the top of the page."
						})
				)
				.catch((err) =>
					formStateDispatch({
						type: "REQUEST_ERROR",
						payload:
							"Unable to create your account. Please try again. In the case that you continue to be unable to create an account, please contact us using the tab at the top of the page."
					})
				);
		},
		[formStateDispatch, formValues]
	);

	return (
		<Form
			error={formState.requestError !== undefined}
			loading={formState.loading}
			onSubmit={(event, data) => onSubmit(data)}
			success={formState.success}
		>
			<Form.Input
				id="name"
				label="Name"
				onChange={(event, data) => setFormValues({ ...formValues, name: data.value })}
				required
			/>
			<Form.Input
				id="email"
				label="Email"
				onChange={(event, data) => setFormValues({ ...formValues, email: data.value })}
				required
				type="email"
			/>
			<Form.Input
				error={
					formState.confirmEmailError
						? { content: "Email addresses do not match", pointing: "below" }
						: undefined
				}
				id="confirmEmail"
				label="Confirm Email"
				onChange={(event, data) => {
					formStateDispatch({
						type: "CONFIRM_EMAIL_ERROR",
						payload: data.value !== formValues.email
					});
					setFormValues({ ...formValues, confirmedEmail: data.value });
				}}
				required
			/>
			<Form.Input
				id="password"
				label="Password"
				onChange={(event, data) => setFormValues({ ...formValues, password: data.value })}
				required
				type="password"
			/>
			<Form.Input
				error={
					formState.confirmPasswordError
						? { content: "Passwords do not match", pointing: "below" }
						: false
				}
				id="confirmPassword"
				label="Confirm Password"
				onChange={(event, data) => {
					formStateDispatch({
						type: "CONFIRM_PASSWORD_ERROR",
						payload: data.value !== formValues.password
					});
					setFormValues({ ...formValues, confirmedPassword: data.value });
				}}
				required
				type="password"
			/>
			<Form.Checkbox id="termsAndConditions" label="I agree to the terms and conditions" required />
			<Message
				content="Your account has been successfully created. Please login to your email to confirm your account."
				header="SUCCESS"
				success
			/>
			<Message content={formState.requestError} error header="Error" />
			<Button
				active={
					!formState.success && !formState.confirmEmailError && !formState.confirmPasswordError
				}
				color="green"
				fluid
				type="submit"
			>
				{formState.loading ? <Loader active inline="centered" /> : "Sign up"}
			</Button>
		</Form>
	);
};

export default LocalSignUpForm;
