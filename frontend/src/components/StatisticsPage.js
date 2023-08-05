import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { initializeCategories, updateCategory } from '../reducers/categories';
import { PageHeader, CategoryList, CategoryListItem } from './Styles';
import { useField } from '../hooks';

import Category from './Category';
import PieChart from './PieChart';

const StatisticsPage = () => {
	const dispatch = useDispatch();
	const selectedCategory = useField('text');

	useEffect(() => {
		dispatch(initializeCategories());
		selectedCategory.setValue(null);
	}, []);

	const categories = useSelector(({ categories }) => categories);
	const selectedCategories = categories.filter((category) => category.selected);
	selectedCategories.sort((c1, c2) => new Date(c2.dateCreated).getTime - new Date(c1.dateCreated).getTime());

	const handleCategorySelection = (category) => {
		dispatch(
			updateCategory({
				...category,
				selected: !category.selected,
			})
		);
	};

	return (
		<div>
			<PageHeader>Statistics</PageHeader>

			<CategoryList>
				{categories.map((category) => (
					<CategoryListItem key={category.id}>
						<input
							style={{ marginRight: '5px' }}
							type="checkbox"
							checked={category.selected}
							onChange={() => handleCategorySelection(category)}
						/>
						<div onClick={() => selectedCategory.setValue(category)} style={{ cursor: 'pointer' }}>
							{category.name}
						</div>
					</CategoryListItem>
				))}
			</CategoryList>

			{selectedCategory.value && (
				<Category category={selectedCategory.value} close={() => selectedCategory.setValue(null)} />
			)}

			<PieChart categories={selectedCategories} />
		</div>
	);
};

export default StatisticsPage;
