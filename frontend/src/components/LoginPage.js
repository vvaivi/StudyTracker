import { useDispatch } from 'react-redux';
import { useField, useToggleValue, useNotification } from '../hooks/index';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../reducers/user';
import { guestUserSignUp, newUserSignUp } from '../reducers/users';
import { LoginPageContainer, ApplicationTitle, ApplicationDescription, LoginFooter } from './Styles';

import LoginForm from './LoginForm';
import CreateUserForm from './CreateUserForm';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const notifyWith = useNotification();

	const username = useField('text');
	const password = useField('password');

	const email = useField('text');
	const name = useField('text');
	const newPassword = useField('password');
	const passwordRepeat = useField('password');

	const displayCreateAccount = useToggleValue(false);

	const footerContent =
		'If you already have an account, please sign in. If you are new to the app, you can create a new account. You will need to provide your email address to validate the account. If you do not wish to provide your personal information, you can continue without creating an account. In this case any data you provide is not saved and will not be accessible later.';

	const onLogin = (event) => {
		event.preventDefault();

		dispatch(
			loginUser({
				username: username.value,
				password: password.value,
			})
		).catch((e) => {
			username.setValue('');
			password.setValue('');
		});

		navigate('/');
	};

	const onLoginAsGuest = (event) => {
		event.preventDefault();

		dispatch(guestUserSignUp()).then((response) => {
			dispatch(
				loginUser({
					username: response.username,
				})
			);
		});

		navigate('/');
	};

	const onCreateAccount = (event) => {
		event.preventDefault();

		if (newPassword.value !== passwordRepeat.value) {
			notifyWith('Passwords do not match', 'alert');
		} else {
			dispatch(
				newUserSignUp({
					username: email.value,
					name: name.value,
					password: newPassword.value,
				})
			);

			email.setValue('');
			name.setValue('');
			newPassword.setValue('');
			passwordRepeat.setValue('');
		}

		displayCreateAccount.toggleValue();
	};

	return (
		<div>
			<LoginPageContainer>
				<ApplicationTitle>Study Tracker</ApplicationTitle>
				<ApplicationDescription>
					A tool to optimize your time management and keep track of achieving your goals
				</ApplicationDescription>

				{displayCreateAccount.value ? (
					<CreateUserForm
						email={email}
						name={name}
						newPassword={newPassword}
						passwordRepeat={passwordRepeat}
						onCreateAccount={onCreateAccount}
						displayCreateAccount={displayCreateAccount}
					/>
				) : (
					<LoginForm
						username={username}
						password={password}
						onLogin={onLogin}
						onLoginAsGuest={onLoginAsGuest}
						displayCreateAccount={displayCreateAccount}
					/>
				)}
			</LoginPageContainer>

			<LoginFooter>{footerContent}</LoginFooter>
		</div>
	);
};

export default LoginPage;
