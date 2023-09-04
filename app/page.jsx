import PromptFeed from '@components/Prompts/PromptFeed';

const HomePage = () => {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Imagine and Share
				<br className='max-md:hidden' />
				<span className='purple_gradient text-centered'>AI-Powered Imaging</span>
			</h1>
			<p className='desc text-center'>Photo Album Prompts is a powerful modern tool for image prompts that helps people store, share, discover and imagine their own and creative text prompts for AI image generation where your imagination is the only limit.</p>

			<PromptFeed />
		</section>
	);
};

export default HomePage;
