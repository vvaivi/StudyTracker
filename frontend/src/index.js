import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalErrorHandler from './components/GlobalErrorHandler';
import App from './App';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<GlobalErrorHandler>
				<App />
			</GlobalErrorHandler>
		</Router>
	</Provider>,
	document.getElementById('root')
);
