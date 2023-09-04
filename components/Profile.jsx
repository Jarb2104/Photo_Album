import PromptCardList from './Prompts/PromptCardList';

const Profile = ({ name, desc, fetchedPosts, handleChange, handleDelete }) => {
	return (
		<div>
			<section className='w-full'>
				<h1 className='head_text text-left'>
					<span className='blue_gradient'>{name} Profile</span>
				</h1>
				<p className='desc test-left'>{desc}</p>
			</section>
			<PromptCardList
				fetchedPrompts={fetchedPosts}
				handleChange={handleChange}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default Profile;
