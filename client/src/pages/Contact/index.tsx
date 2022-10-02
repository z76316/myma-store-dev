import React, { useContext, useState, useCallback } from "react";
import { Header, Divider, Form } from "semantic-ui-react";
import * as libphonenumber from "libphonenumber-js";
import { ApplicationContext } from "../../context";
import Page from "../../components/Page";

const ContactPage: React.FC = (props): JSX.Element => {
	const ctx = useContext(ApplicationContext);
	const [name, setName] = useState<string>(ctx.user?.name ?? "");
	const [phone, setPhone] = useState<string>("");
	const [phoneError, setPhoneError] = useState<boolean>(false);
	const [email, setEmail] = useState<string>(ctx.user?.email ?? "");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [subject, setSubject] = useState<string>("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [message, setMessage] = useState<string>("");

	const userName = ctx.user?.name;
	const userEmail = ctx.user?.email;

	const onSubmit = useCallback((): void => {
		if (!libphonenumber.isValidNumber(libphonenumber.parse(phone))) {
			setPhoneError(true);
			return;
		}

		setName(userName ?? "");
		setPhone("");
		setPhoneError(false);
		setEmail(userEmail ?? "");
		setSubject("");
		setMessage("");
	}, [
		setName,
		setPhone,
		setPhoneError,
		setEmail,
		setSubject,
		setMessage,
		phone,
		userEmail,
		userName
	]);

	return (
		<Page>
			<Header as="h1">
				{"Contact Us"}
				<Header.Subheader>{"Please fill out the form below."}</Header.Subheader>
			</Header>
			<Divider />
			<Form action="/api/contact" method="post" onSubmit={(event, data) => onSubmit()}>
				<Form.Input
					id="contact-form-name"
					label="Name"
					onChange={(event) => setName(event.target.value)}
					required
					value={name}
				/>
				<Form.Input
					error={phoneError}
					id="contact-form-phone-number"
					label="Phone Number"
					onChange={(event) => {
						if (phoneError) {
							setPhoneError(false);
						}

						setPhone(event.target.value);
					}}
					type="tel"
				/>
				<Form.Input
					id="contact-form-email"
					label="Email"
					onChange={(event) => setEmail(event.target.value)}
					required
					type="email"
					value={email}
				/>
				<Form.Input
					id="contact-form-subject"
					label="Subject"
					onChange={(event) => setSubject(event.target.value)}
					required
					type="text"
				/>
				<Form.TextArea
					id="contact-form-message"
					label="Message"
					onInput={(event, data) =>
						setMessage(data.value === undefined ? "" : (data.value as string))
					}
					required
					type="text"
				/>
				<Form.Button
					content="Send"
					floated="right"
					id="contact-form-submit"
					primary
					type="submit"
				/>
			</Form>
		</Page>
	);
};

export default ContactPage;
