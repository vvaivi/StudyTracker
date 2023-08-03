import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './components/Styles';
import { useInitialization, useTokenExpirationCheck } from './hooks/index';

import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import Notification from './components/Notification';
import TaskForm from './components/TaskForm';

const App = () => {
	const stateInitializer = useInitialization();
	const user = useSelector(({ user }) => user);

	useEffect(() => {
		stateInitializer();
	}, []);

	useTokenExpirationCheck();

	if (!user) {
		return (
			<div>
				<GlobalStyle />
				<Notification />
				<LoginPage />
			</div>
		);
	}

	return (
		<div>
			<GlobalStyle />
			<Notification />
			<Routes>
				<Route path="/create" element={<TaskForm />} />
			</Routes>
			<Footer />
		</div>
	);
};
export default App;
