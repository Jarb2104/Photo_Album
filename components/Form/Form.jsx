import InputText from './InputText';
import FormButtons from './FormButtons';

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
				<InputText
					text='Your Image URL'
					value={post.imgUrl}
					onChange={(e) => setPost({ ...post, imgUrl: e.target.value })}
					placeHolder='Add an image sample to your prompt...'
					required={false}
				/>
				<InputText
					text='Tag (Anime, Samurai, Armor, YourImagination)'
					value={post.tags}
					onChange={(e) => setPost({ ...post, tags: e.target.value })}
					placeHolder='YourImagination... (up to 5 tags)'
					required={true}
				/>
				<FormButtons
					submitting={submitting}
					type={type}
				/>
			</form>
		</section>
	);
};

export default Form;
