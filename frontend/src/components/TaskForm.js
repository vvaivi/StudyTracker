import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import dateFormat from 'dateformat';

import {
	CategoryDropdown,
	InputContainer,
	TaskInput,
	TaskInputContainer,
	TitleInput,
	PageHeader,
	NoteInput,
	NoteList,
	NotesContainer,
	SaveTaskButton,
	SaveNoteButton,
	DeleteTaskButton,
} from './Styles';
import { addTask, updateTask, removeTask } from '../reducers/tasks';
import { useField, useNotification } from '../hooks/index';
import { addCategory, initializeCategories } from '../reducers/categories';

const TaskForm = (props) => {
	const dispatch = useDispatch();
	const notifyWith = useNotification();
	const navigate = useNavigate();

	const title = useField('text');
	const completed = useField('text');
	const quantity = useField('text');
	const usedTime = useField('text');
	const deadline = useField('text');
	const priority = useField('text');
	const note = useField('text');
	const notes = useField('text');
	const categoryName = useField('text');
	const filteredCategories = useField('text');

	const defaultDateTime = dateFormat(
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleString('en-US', process.env.DATE_OPTIONS),
		"yyyy-mm-dd'T'HH:MM"
	);

	const id = useParams().id;
	const task = useSelector(({ tasks }) => tasks.find((t) => t.id === id));

	useEffect(() => {
		dispatch(initializeCategories());

		filteredCategories.setValue([]);
		if (props.createNew) {
			quantity.setValue('');
			completed.setValue(0);
			usedTime.setValue(0);
			deadline.setValue(defaultDateTime);
			priority.setValue(0);
			categoryName.setValue('');
			note.setValue('');
			notes.setValue([]);
		} else {
			quantity.setValue(task.quantity);
			completed.setValue(task.completed);
			usedTime.setValue(task.usedTime);
			deadline.setValue(
				dateFormat(new Date(task.deadline).toLocaleString('en-US', process.env.DATE_OPTIONS), "yyyy-mm-dd'T'HH:MM")
			);
			priority.setValue(task.priority);
			task.category ? categoryName.setValue(task.category.name) : categoryName.setValue('');
			note.setValue('');
			notes.setValue(task.notes);
		}
	}, [task]);

	const categories = useSelector((state) => state.categories);
	const categoryDropdownRef = useRef();

	useEffect(() => {
		const handleClickOutsideDropdown = (event) => {
			if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
				filteredCategories.setValue([]);
			}
		};

		document.addEventListener('click', handleClickOutsideDropdown);

		return () => {
			document.removeEventListener('click', handleClickOutsideDropdown);
		};
	}, []);

	const handleNewCategoryChange = (event) => {
		const inputCategoryName = event.target.value;
		categoryName.setValue(inputCategoryName);

		const filtered = inputCategoryName
			? categories.filter((category) => category.name.toLowerCase().includes(inputCategoryName.toLowerCase()))
			: [];

		filteredCategories.setValue(filtered);
	};

	const hadleFilterChange = (category) => {
		categoryName.setValue(category.name);
		filteredCategories.setValue([]);
	};

	const onSaveNote = () => {
		if (note.value.trim() === '') {
			notifyWith('A note should not be empty!', 'alert');
		} else {
			const updatedNotes = notes.value ? [...notes.value, note.value.trim()] : [note.value.trim()];
			notes.setValue(updatedNotes);
			note.setValue('');
		}
	};

	const onSaveTask = () => {
		const selectedDeadline = new Date(deadline.value).getTime();

		if (
			isNaN(Number(completed.value)) ||
			isNaN(Number(quantity.value)) ||
			isNaN(Number(usedTime.value)) ||
			isNaN(selectedDeadline) ||
			isNaN(Number(priority.value))
		) {
			notifyWith('You must input all the values in correct format.', 'alert');
		} else if (Number(completed.value) < 0 || Number(quantity.value) < 0 || Number(usedTime.value) < 0) {
			notifyWith('Please do not input negative values.', 'alert');
		} else if (deadline.value <= new Date().getTime()) {
			notifyWith('The deadline should not be in the history.', 'alert');
		} else if (!(0 <= Number(priority.value) <= 10)) {
			notifyWith('Please input priority value between 0 and 10.', 'alert');
		} else if (quantity.value === 0) {
			notifyWith('Number of sections should not be zero.', 'alert');
		} else if (props.createNew && title.value.trim() === '') {
			notifyWith('The title should not be empty.', 'alert');
		} else {
			const existingCategory = categories.find(
				(category) => category.name.toLowerCase() === categoryName.value.toLowerCase()
			);
			if (!existingCategory && categoryName.value.trim() !== '') {
				dispatch(addCategory({ name: categoryName.value.trim() }));
			}

			if (props.createNew) {
				dispatch(
					addTask({
						title: title.value,
						completed: Number(completed.value),
						quantity: Number(quantity.value),
						usedTime: Number(usedTime.value),
						deadline: selectedDeadline,
						priority: Number(priority.value),
						notes: notes.value,
						categoryName: categoryName.value,
					})
				);
				notifyWith('Task added!');

				title.setValue('');
				completed.setValue(0);
				quantity.setValue('');
				usedTime.setValue(0);
				deadline.setValue(defaultDateTime);
				priority.setValue(0);
				notes.setValue([]);
				categoryName.setValue('');
			} else {
				dispatch(
					updateTask({
						...task,
						completed: Number(completed.value),
						quantity: Number(quantity.value),
						usedTime: Number(usedTime.value),
						deadline: selectedDeadline,
						priority: Number(priority.value),
						notes: notes.value,
						categoryName: categoryName.value,
						user: task.user.id,
					})
				);

				notifyWith('Changes saved!');
				navigate('/');
			}
		}
	};

	const onDeleteTask = () => {
		const ok = window.confirm(`Confirm that you want to delete task '${task.title}'`);
		if (ok) {
			dispatch(removeTask(task));
			notifyWith('Task deleted!');
			navigate('/');
		}
	};

	return (
		<div>
			<PageHeader>{props.createNew ? 'Add a new task' : task.title}</PageHeader>

			{props.createNew && <TitleInput placeholder="Task title" {...title} />}

			<InputContainer>
				<TaskInputContainer>
					<tbody>
						<tr>
							<td>Category</td>
							<td>
								<TaskInput {...categoryName} onChange={handleNewCategoryChange} />
								{filteredCategories.value.length > 0 && (
									<CategoryDropdown ref={categoryDropdownRef}>
										{filteredCategories.value.map((category) => (
											<div key={category.id} onClick={() => hadleFilterChange(category)}>
												{category.name}
											</div>
										))}
									</CategoryDropdown>
								)}
							</td>
						</tr>
						<tr>
							<td>Sections total</td>
							<td>
								<TaskInput {...quantity} />
							</td>
						</tr>
						<tr>
							<td>Sections completed</td>
							<td>
								<TaskInput {...completed} />
							</td>
						</tr>
						<tr>
							<td>Time used (h)</td>
							<td>
								<TaskInput {...usedTime} />
							</td>
						</tr>
						<tr>
							<td>Deadline</td>
							<td>
								<TaskInput
									type="datetime-local"
									value={deadline.value}
									onChange={(event) => deadline.setValue(event.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>Priority (0-10)</td>
							<td>
								<TaskInput {...priority} />
							</td>
						</tr>
					</tbody>
				</TaskInputContainer>

				<NotesContainer>
					<NoteInput placeholder="Add a new note..." {...note} />
					<NoteList>{notes.value && notes.value.length > 0 && notes.value.map((n) => <li>{n}</li>)}</NoteList>
				</NotesContainer>
			</InputContainer>

			<SaveTaskButton onClick={onSaveTask}>Save task</SaveTaskButton>
			<SaveNoteButton onClick={onSaveNote}>Save note</SaveNoteButton>
			{!props.createNew && <DeleteTaskButton onClick={onDeleteTask}>Delete task</DeleteTaskButton>}
		</div>
	);
};

export default TaskForm;
