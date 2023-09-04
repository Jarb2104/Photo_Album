import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const GET = async (req, { params }) => {
	try {
		const promptData = await prismaPhotoAlbumPrompts.prompt.findUnique({
			where: {
				id: params.id,
			},
			include: {
				user: true,
				tags: true,
			},
		});

		if (!promptData) return new Response(JSON.stringify('Prompt not found'), { status: 404 });
		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to fetch prompt from the DB ${error}`), { status: 500 });
	}
};

export const PATCH = async (req, { params }) => {
	try {
		const { prompt, tag, imgUrl } = await req.json();
		let tags = tag.split(',');
		tags = tags.slice(0, 4);

		const promptData = await prismaPhotoAlbumPrompts.prompt.update({
			where: {
				id: params.id,
			},
			data: {
				prompt: prompt,
				imgUrl: imgUrl,
				tags: {
					create: tags.map((t) => ({ tag: t })),
				},
			},
		});

		if (!promptData) return new Response(JSON.stringify('Prompt not found'), { status: 404 });
		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to fetch prompt from the DB ${error}`), { status: 500 });
	}
};

export const DELETE = async (req, { params }) => {
	try {
		const promptData = await prismaPhotoAlbumPrompts.prompt.delete({
			where: {
				id: params.id,
			},
		});

		if (!promptData) return new Response(JSON.stringify('Prompt not found'), { status: 404 });
		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to fetch prompt from the DB ${error}`), { status: 500 });
	}
};
