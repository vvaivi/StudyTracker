import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './components/Styles';
import { useInitialization, useTokenExpirationCheck } from './hooks/index';

import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import Notification from './components/Notification';
import TaskForm from './components/TaskForm';
import TaskListPage from './components/TaskListPage';
import Navigation from './components/Navigation';
import StatisticsPage from './components/StatisticsPage';

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
			<Navigation />
			<Notification />
			<Routes>
				<Route path="/" element={<TaskListPage displayActive={true} />} />
				<Route path="/expired" element={<TaskListPage displayActive={false} />} />
				<Route path="/create" element={<TaskForm createNew={true} />} />
				<Route path="/:id" element={<TaskForm createNew={false} />} />
				<Route path="/statistics" element={<StatisticsPage />} />
			</Routes>
			<Footer />
		</div>
	);
};
export default App;
