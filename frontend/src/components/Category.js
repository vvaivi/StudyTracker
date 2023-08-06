import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { initializeTasks } from '../reducers/tasks';
import { initializeCategories, updateCategory } from '../reducers/categories';
import {
	CategoryTasks,
	CloseMark,
	CategoryList,
	PageHeader,
	TargetButton,
	TargetInput,
	TargetContainer,
} from './Styles';
import { useField, useNotification } from '../hooks';

const Category = (props) => {
	const dispatch = useDispatch();
	const notifyWith = useNotification();

	const tasks = useSelector(({ tasks }) => tasks);
	const tasksInCategory = tasks.filter((task) => props.category.tasks.includes(task.id));

	const totalTimeUsed = tasks.reduce((sum, task) => sum + task.usedTime, 0).toFixed(2);
	const target = useField('text');

	useEffect(() => {
		dispatch(initializeTasks());
		dispatch(initializeCategories());
		props.category.target ? target.setValue(props.category.target) : target.setValue('');
	}, []);

	const onSaveTarget = () => {
		if (!(0 <= Number(target.value) <= 100) || isNaN(Number(target.value))) {
			notifyWith('Invalid target value! Please input a value between 0 and 100.', 'alert');
		} else {
			dispatch(
				updateCategory({
					...props.category,
					target: Number(target.value),
				})
			);
			notifyWith('Target saved!');
		}
	};

	return (
		<CategoryTasks>
			<PageHeader style={{ color: '#c0c0c0', paddingTop: '20px' }}>{props.category.name}</PageHeader>

			<TargetContainer>
				<TargetInput {...target} />
				<TargetButton disabled={!target.value && target.value != props.category.target} onClick={onSaveTarget}>
					Save target %
				</TargetButton>
			</TargetContainer>

			<CloseMark onClick={() => props.close(false)}>&#10006;</CloseMark>

			<CategoryList>
				{tasksInCategory.map((task) => (
					<div key={task.id}>
						<div>
							{task.title} {totalTimeUsed != 0 ? `${((task.usedTime / totalTimeUsed) * 100).toFixed(2)}%` : '0%'}
						</div>
					</div>
				))}
			</CategoryList>

			<h4>Total time used {totalTimeUsed} h</h4>
		</CategoryTasks>
	);
};

export default Category;
