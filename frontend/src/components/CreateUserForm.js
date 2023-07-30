import { LoginPageInput, LoginPageInputContainer, LoginPageButton, LoginPageButtonContainer } from './Styles';

const CreateUserForm = (props) => {
	const createAccountButtonDisabled =
		props.email.value.length === 0 || props.newPassword.value.length === 0 || props.passwordRepeat.value.length === 0;

	return (
		<form onSubmit={props.onCreateAccount}>
			<LoginPageInputContainer>
				<LoginPageInput placeholder=" Email address" {...props.email} />
				<LoginPageInput placeholder=" Name" {...props.name} />
				<LoginPageInput placeholder=" Password" {...props.newPassword} />
				<LoginPageInput placeholder=" Retype assword" {...props.passwordRepeat} />
			</LoginPageInputContainer>

			<LoginPageButtonContainer>
				<LoginPageButton type="submit" disabled={createAccountButtonDisabled}>
					Sign up
				</LoginPageButton>
				<LoginPageButton type="button" onClick={props.displayCreateAccount.toggleValue}>
					Back to sign in
				</LoginPageButton>
			</LoginPageButtonContainer>
		</form>
	);
};

export default CreateUserForm;
