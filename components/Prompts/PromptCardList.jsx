import PromptCard from './PromptCard';

const PromptCardList = ({ fetchedPrompts, handleTagClick, handleChange, handleDelete }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{fetchedPrompts.map((prompt) => (
				<PromptCard
					key={prompt.id}
					promptData={prompt}
					handleCardTagClick={handleTagClick}
					handleChange={() => handleChange && handleChange(prompt)}
					handleDelete={() => handleDelete && handleDelete(prompt.id)}
				/>
			))}
		</div>
	);
};

export default PromptCardList;
