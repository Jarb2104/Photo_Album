'use client';
import albumStore from '@app/redux/store';
import { Provider } from 'react-redux';

const ReduxProvider = ({ children }) => {
	return <Provider store={albumStore}>{children}</Provider>;
};

export default ReduxProvider;
