import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{type} a Post</span>
			</h1>
			<p className='desc text-left max-w-md'>{type} and share incredible image prompts withe world, just let your imagination run wild with the power of AI image generation.</p>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'
			>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>Your Image AI Prompt</span>
					<textarea
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						placeholder='Write your prompt here...'
						required
						className='form_textarea'
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>Your Image URL</span>
					<input
						value={post.imgUrl}
						onChange={(e) => setPost({ ...post, imgUrl: e.target.value })}
						placeholder='Add an image sample to your prompt...'
						className='form_input'
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Tag {` `}
						<span>(Anime, Samurai, Armor, YourImagination)</span>
					</span>
					<input
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						placeholder='YourImagination... (up to 5 tags)'
						required
						className='form_input'
					/>
				</label>
				<div className='flex-end mx-3 mb-5 gap-4'>
					<Link
						href='/'
						className='text-gray-500 text-sm'
					>
						Cancel
					</Link>
					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-violet-600 rounded-full text-white'
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
