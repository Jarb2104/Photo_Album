import React from 'react';

const TagList = ({ tagData, lstClassName, btnClassName, handleListTagClick }) => {
	return (
		<div className={lstClassName}>
			{tagData &&
				tagData
					.sort((t1, t2) => parseFloat(t2.count) - parseFloat(t1.count))
					.map((tag) => (
						<button
							key={tag.id}
							type='button'
							className={btnClassName}
							onClick={() => handleListTagClick && handleListTagClick(tag.tag)}
						>
							{tag.tag}
						</button>
					))}
		</div>
	);
};

export default TagList;
