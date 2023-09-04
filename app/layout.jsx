import NavBar from '@components/NavBar';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
	title: 'Photo Album Prompts',
	description: 'Discover and Share image generating AI prompts',
};

const MainLayout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<div className='main'>
						<div className='gradient' />
					</div>
					<main className='app'>
						<NavBar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default MainLayout;
