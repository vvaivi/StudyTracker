import { Component } from 'react';

class GlobalErrorHandler extends Component {
	state = {
		errorOccurred: false,
	};

	componentDidCatch() {
		this.setState({ errorOccurred: true });
	}

	render() {
		if (this.state.errorOccurred) {
			return (
				<div>
					<div>Something went wrong. Please refresh the page or go back to the front page.</div>
					<button onClick={() => (window.location.href = '/')}>Return to front page</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default GlobalErrorHandler;
