import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as d3 from 'd3';

import { StatisticsChart, StatisticsContainer, StatisticsText } from './Styles';
import { initializeTasks } from '../reducers/tasks';

const Piechart = (props) => {
	const dispatch = useDispatch();
	const chartRef = useRef(null);

	const tasks = useSelector(({ tasks }) => tasks);
	tasks.filter((task) => props.categories.some((category) => category.tasks.includes(task.id)));

	const totalTimeUsed = tasks.reduce((sum, task) => sum + task.usedTime, 0);
	if (totalTimeUsed === 0) return (<div></div>);
	const completedTasks = tasks.filter((task) => task.completed).length;

	const curerntDate = new Date().getTime();
	const missedTasks = tasks.filter((task) => !task.completed && new Date(task.deadline).getTime() < curerntDate).length;

	useEffect(() => {
		drawChart();
		dispatch(initializeTasks());
	}, [props.categories]);

	const getLabelPosition = (arc, radius, margin) => {
		const angle = (arc.startAngle + arc.endAngle) / 2;
		const x = (radius + margin) * Math.sin(angle);
		const y = -(radius + margin) * Math.cos(angle);

		return [x, y];
	};

	const drawChart = () => {
		if (chartRef.current) {
			d3.select(chartRef.current).selectAll('*').remove();

			const width = 500;
			const height = 500;
			const labelMargin = 16;
			const radius = 190;
			const colors = d3.scaleOrdinal(d3.schemePastel1);

			const svg = d3
				.select(chartRef.current)
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.append('g')
				.attr('transform', `translate(${width / 2}, ${height / 2})`);

			const pie = d3.pie().value((d) => d.timeUsed);

			const data = props.categories.map((category) => {
				const timeUsed = tasks.reduce((sum, task) => sum + (category.tasks.includes(task.id) ? task.usedTime : 0), 0);
				return { ...category, timeUsed };
			});

			const arc = d3.arc().innerRadius(0).outerRadius(radius);
			const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g').attr('class', 'arc');

			arcs
				.append('path')
				.attr('d', arc)
				.attr('fill', (d, i) => colors(i))
				.attr('stroke', '#787276')
				.style('stroke-width', '1px');

			const labels = svg
				.selectAll('label')
				.data(pie(data.filter((d) => d.timeUsed > 0)))
				.enter()
				.append('g')
				.attr('class', 'label')
				.attr('transform', (d) => {
					const [x, y] = getLabelPosition(d, radius / 2, labelMargin);
					return `translate(${x}, ${y})`;
				});

			labels
				.append('text')
				.style('font-size', '10px')
				.attr('text-anchor', 'middle')
				.text((d) => {
					const name = d.data.name;
					const percentage = ((d.data.timeUsed / totalTimeUsed) * 100).toFixed(2);
					const target = d.data.target;

					if (target !== undefined) {
						return `${name} ${percentage}%\n(${target.toFixed(2)}%)`;
					} else {
						return `${name} ${percentage}%`;
					}
				});
		}
	};

	return (
		<div>
			<StatisticsContainer>
				<StatisticsText>
					Total time used completing tasks <p>{totalTimeUsed.toFixed(2)} h</p>
				</StatisticsText>
				<StatisticsText>
					Number of completed tasks
					<p>{completedTasks}</p>
				</StatisticsText>
				<StatisticsText>
					Number of unfinished tasks with passed deadline
					<p>{missedTasks}</p>
				</StatisticsText>
			</StatisticsContainer>

			<StatisticsChart ref={chartRef} />
		</div>
	);
};

export default Piechart;
