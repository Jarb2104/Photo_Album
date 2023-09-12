import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

export const POST = async (req) => {
	try {
		const { userId, prompt, tags, imgUrl } = await req.json();

		//Transfrom tag information for the query
		let tagList = tags.split(',');
		tagList = tagList.slice(0, 5);
		const tagListMapped = tagList.map((t) => ({
			where: {
				tag: t
					.trim()
					.toLowerCase()
					.replace(/[^a-z]/g, ''),
			},
			create: {
				tag: t
					.trim()
					.toLowerCase()
					.replace(/[^a-z]/g, ''),
				count: 0,
			},
		}));

		const promptData = await prismaPhotoAlbumPrompts.$transaction(async (pap) => {
			//add the new prompt to the database
			const newPrompt = await pap.prompt.create({
				data: {
					userId: userId,
					prompt: prompt,
					imgUrl: imgUrl,
					tags: {
						connectOrCreate: tagListMapped,
					},
				},
				include: {
					user: true,
					tags: true,
				},
			});
			//update tag information to reflect the new counts
			await pap.prompt.update({
				where: {
					id: newPrompt.id,
				},
				data: {
					tags: {
						updateMany: {
							where: {
								count: {
									gt: -1,
								},
							},
							data: {
								count: {
									increment: 1,
								},
							},
						},
					},
				},
			});

			return newPrompt;
		});

		return new Response(JSON.stringify(promptData), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to store the prompt in the DB ${error}`), { status: 500 });
	}
};
