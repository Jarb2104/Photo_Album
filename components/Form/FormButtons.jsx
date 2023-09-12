import Link from 'next/link';

const FormButtons = ({ submitting, type }) => {
	return (
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
	);
};

export default FormButtons;
