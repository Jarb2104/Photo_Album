import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const GET = async () => {
	try {
		const tagsData = await prismaPhotoAlbumPrompts.tag.findMany();

		return new Response(JSON.stringify(tagsData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to fetch tags from the DB ${error}`), { status: 500 });
	}
};
