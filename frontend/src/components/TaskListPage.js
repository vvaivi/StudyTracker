import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import dateFormat from 'dateformat';

import { initializeTasks } from '../reducers/tasks';
import { TaskList, PageHeader } from './Styles';

const TaskListPage = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(initializeTasks());
	}, []);

	const tasks = useSelector(({ tasks }) =>
		[...tasks].sort((t1, t2) => {
			if (t1.priority !== t2.priority) {
				return t2.priority - t1.priority;
			} else {
				return new Date(t1.deadline).getTime() - new Date(t2.deadline).getTime();
			}
		})
	);

	if (!tasks) {
		return <PageHeader>{header}</PageHeader>;
	}

	const currentDate = new Date();
	const displayedTasks = props.displayActive
		? tasks.filter((task) => !task.done && new Date(task.deadline) >= currentDate)
		: tasks.filter((task) => task.done && new Date(task.deadline) >= currentDate);

	const header = props.displayActive ? 'Active Tasks' : 'Expired Tasks';

	if (displayedTasks.length === 0) {
		return <PageHeader>{header}</PageHeader>;
	}

	return (
		<div>
			<PageHeader>{header}</PageHeader>
			<TaskList>
				<thead>
					<tr>
						<th>Title</th>
						<th>Deadline</th>
						<th>Completed</th>
					</tr>
				</thead>
				<tbody>
					{displayedTasks.map((task) => (
						<tr key={task.id} onClick={() => navigate(`/${task.id}`)}>
							<td style={{ width: '50%' }}>{task.title}</td>
							<td style={{ width: '35%' }}>
								{dateFormat(new Date(task.deadline).toLocaleString('en-US', process.env.DATE_OPTIONS), 'dd/mm/yyyy HH:MM')}
							</td>
							<td style={{ width: '15%' }}>{Math.round((task.completed / task.quantity) * 100)} %</td>
						</tr>
					))}
				</tbody>
			</TaskList>
		</div>
	);
};

export default TaskListPage;
