import { useDispatch, useSelector } from 'react-redux';
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
} from './Styles';
import { addTask } from '../reducers/tasks';
import { useField, useNotification } from '../hooks/index';
import { addCategory, initializeCategories } from '../reducers/categories';

const TaskForm = () => {
	const dispatch = useDispatch();
	const notifyWith = useNotification();

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

	useEffect(() => {
		dispatch(initializeCategories());

		completed.setValue(0);
		usedTime.setValue(0);
		deadline.setValue(defaultDateTime);
		priority.setValue(0);
		notes.setValue([]);
		filteredCategories.setValue([]);
	}, []);

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
		} else if (title.value.trim() === '') {
			notifyWith('The title should not be empty.', 'alert');
		} else {
			const existingCategory = categories.find(
				(category) => category.name.toLowerCase() === categoryName.value.toLowerCase()
			);
			if (!existingCategory && categoryName.value.trim() !== '') {
				dispatch(addCategory({ name: categoryName.value.trim() }));
			}

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
		}
	};

	return (
		<div>
			<PageHeader>Add a new task</PageHeader>
			<TitleInput placeholder="Task title" {...title} />

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
					<NoteList>{notes.value.length > 0 && notes.value.map((n) => <li>{n}</li>)}</NoteList>
				</NotesContainer>
			</InputContainer>

			<SaveTaskButton onClick={onSaveTask}>Save Task</SaveTaskButton>
			<SaveNoteButton onClick={onSaveNote}>Save Note</SaveNoteButton>
		</div>
	);
};

export default TaskForm;
