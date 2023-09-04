import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const POST = async (req) => {
	const { userId, prompt, tag, imgUrl } = await req.json();
	try {
		let tags = tag.split(',');
		tags = tags.slice(0, 4);

		const newPrompt = await prismaPhotoAlbumPrompts.prompt.create({
			data: {
				userId: userId,
				prompt: prompt,
				imgUrl: imgUrl,
				tags: {
					create: tags.map((t) => ({ tag: t })),
				},
			},
		});

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to store the prompt in the DB ${error}`), { status: 500 });
	}
};
