import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const POST = async (req) => {
	const { userId, prompt, tags, imgUrl } = await req.json();
	try {
		let tagList = tags.split(',');
		tagList = tagList.slice(0, 4);

		const newPrompt = await prismaPhotoAlbumPrompts.prompt.create({
			data: {
				userId: userId,
				prompt: prompt,
				imgUrl: imgUrl,
				tags: {
					create: tagList.map((t) => ({ tag: t })),
				},
			},
		});

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to store the prompt in the DB ${error}`), { status: 500 });
	}
};
