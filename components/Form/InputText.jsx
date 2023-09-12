const InputText = ({ text, value, onChange, placeHolder, required }) => {
	return (
		<label>
			<span className='font-satoshi font-semibold text-base text-gray-700'>{text}</span>
			<input
				value={value}
				onChange={onChange}
				placeholder={placeHolder}
				className='form_input'
				required={required}
			/>
		</label>
	);
};

export default InputText;
