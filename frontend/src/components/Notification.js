import { useSelector } from 'react-redux';
import { NotificationContainer } from './Styles';

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);

	if (!notification.message) {
		return null;
	}

	return <NotificationContainer alert={notification.type === 'alert'}>{notification.message}</NotificationContainer>;
};

export default Notification;
