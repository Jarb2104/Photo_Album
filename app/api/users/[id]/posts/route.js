import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const GET = async (req, { params }) => {
	try {
		const promptData = await prismaPhotoAlbumPrompts.prompt.findMany({
			where: {
				userId: params.id,
			},
			include: {
				user: true,
				tags: true,
			},
		});

		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to fetch prompts from the DB ${error}`), { status: 500 });
	}
};
