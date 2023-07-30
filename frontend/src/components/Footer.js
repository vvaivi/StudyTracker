import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FooterContainer, FooterButton } from './Styles';
import { clearUser } from '../reducers/user';

import storageService from '../services/storage';
import usersService from '../services/users';

const Footer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(({ user }) => user);

	const onLogOut = () => {
		const user = storageService.loadUser();

		if (user && user.guest) {
			usersService.deleteUser(user.id);
		}

		dispatch(clearUser());
		navigate('/');
	};

	return (
		<FooterContainer>
			{user.name} signed in
			<FooterButton onClick={onLogOut}>Sign out</FooterButton>
		</FooterContainer>
	);
};

export default Footer;
