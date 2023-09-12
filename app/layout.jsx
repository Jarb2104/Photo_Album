import AuthProvider from '@components/Providers/AuthProvider';
import ReduxProvider from '../components/Providers/ReduxProvider';
import NavBar from '@components/NavBar/NavBar';
import '@styles/globals.css';

export const metadata = {
	title: 'Photo Album Prompts',
	description: 'Discover and Share image generating AI prompts',
};

const MainLayout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<AuthProvider>
					<ReduxProvider>
						<div className='main'>
							<div className='gradient' />
						</div>
						<main className='app'>
							<NavBar />
							{children}
						</main>
					</ReduxProvider>
				</AuthProvider>
			</body>
		</html>
	);
};

export default MainLayout;
