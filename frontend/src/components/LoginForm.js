import {
	LoginPageButton,
	LoginPageInput,
	LoginPageButtonContainer,
	LoginPageButtonRow,
	LoginPageInputContainer,
} from './Styles';

const LoginForm = (props) => {
	const loginButtonDisabled = props.username.value.length === 0 || props.password.value.length === 0;

	return (
		<form onSubmit={props.onLogin}>
			<LoginPageInputContainer>
				<LoginPageInput placeholder=" Email address" {...props.username} />
				<LoginPageInput placeholder=" Password" {...props.password} />
			</LoginPageInputContainer>

			<LoginPageButtonContainer>
				<LoginPageButtonRow>
					<LoginPageButton type="submit" disabled={loginButtonDisabled}>
						Sign in
					</LoginPageButton>
					<LoginPageButton type="button" onClick={props.displayCreateAccount.toggleValue}>
						Create an account
					</LoginPageButton>
				</LoginPageButtonRow>
				<LoginPageButton type="button" onClick={props.onLoginAsGuest}>
					Continue without an account
				</LoginPageButton>
			</LoginPageButtonContainer>
		</form>
	);
};

export default LoginForm;
