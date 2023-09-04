import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const GET = async (req, { params }) => {
	try {
		const promptData = await prismaPhotoAlbumPrompts.user.findUnique({
			where: {
				id: params.id,
			},
		});

		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to fetch user from the DB ${error}`), { status: 500 });
	}
};
