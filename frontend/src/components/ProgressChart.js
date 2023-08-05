import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { TaskChart } from './Styles';

const ProgressChart = (props) => {
	const chartRef = useRef();

	useEffect(() => {
		drawChart();
	}, [props.task]);

	const drawChart = () => {
		d3.select(chartRef.current).selectAll('*').remove();

		const fullWidth = window.innerWidth;
		const height = 50;
		const radius = 15;
		const circleSpacing = 10;

		const svg = d3.select(chartRef.current).append('svg').attr('width', fullWidth).attr('height', height);
		const startX = (fullWidth - (props.task.quantity * (2 * radius) + (props.task.quantity - 1) * circleSpacing)) / 2;

		const circlesGroup = svg.append('g');
		const circleColor = (d) => (d < props.task.completed ? 'DarkSlateGray' : '#878787');

		circlesGroup
			.selectAll('circle')
			.data(d3.range(props.task.quantity))
			.join('circle')
			.attr('cx', (d, i) => startX + d * (2 * radius + circleSpacing) + radius)
			.attr('cy', height / 2)
			.attr('r', radius)
			.attr('fill', circleColor);

		svg
			.append('text')
			.attr('x', startX + props.task.quantity * (2 * radius + circleSpacing) + radius + 30)
			.attr('y', height / 2)
			.attr('text-anchor', 'end')
			.attr('alignment-baseline', 'middle')
			.attr('fill', '#36454f')
			.text(`${Math.round((props.task.completed / props.task.quantity) * 100)}%`);
	};

	return <TaskChart ref={chartRef} />;
};

export default ProgressChart;
