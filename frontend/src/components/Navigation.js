import { Link } from 'react-router-dom';
import { NavigationBar, NavigationButton } from './Styles';

const Navigation = () => {
	return (
		<NavigationBar>
			<NavigationButton as={Link} to="/">
				Active Tasks
			</NavigationButton>
			<NavigationButton as={Link} to="/expired">
				Expired Tasks
			</NavigationButton>
			<NavigationButton as={Link} to="/create">
				Create New Task
			</NavigationButton>
			<NavigationButton as={Link} to="/statistics">
				Statistics
			</NavigationButton>
		</NavigationBar>
	);
};

export default Navigation;
