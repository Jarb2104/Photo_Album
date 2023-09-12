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
		const { prompt, tags, imgUrl } = await req.json();

		//transfor the tag information for the query
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

		const [ud1, ud2, ud3, promptData] = await prismaPhotoAlbumPrompts.$transaction([
			//first make sure all related tags are updated in case any tags need to be modified
			prismaPhotoAlbumPrompts.prompt.update({
				where: {
					id: params.id,
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
									decrement: 1,
								},
							},
						},
					},
				},
			}),
			//remove all tags related to the prompt
			prismaPhotoAlbumPrompts.prompt.update({
				where: {
					id: params.id,
				},
				data: {
					tags: {
						set: [],
					},
				},
			}),
			//update the prompt and add tags back
			prismaPhotoAlbumPrompts.prompt.update({
				where: {
					id: params.id,
				},
				data: {
					prompt: prompt,
					imgUrl: imgUrl,
					tags: {
						connectOrCreate: tagListMapped,
					},
				},
			}),
			//finally update the tag information to increase tags counts
			prismaPhotoAlbumPrompts.prompt.update({
				where: {
					id: params.id,
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
				include: {
					user: true,
					tags: true,
				},
			}),
		]);

		if (!promptData) return new Response(JSON.stringify('Prompt not found'), { status: 404 });
		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to update the prompt in the DB ${error}`), { status: 500 });
	}
};

export const DELETE = async (req, { params }) => {
	try {
		const [ud1, promptData] = await prismaPhotoAlbumPrompts.$transaction([
			//first make sure the counts for all related tags are reduced by 1.
			prismaPhotoAlbumPrompts.prompt.update({
				where: {
					id: params.id,
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
									decrement: 1,
								},
							},
						},
					},
				},
			}),
			//remove all tags related to the prompt
			prismaPhotoAlbumPrompts.prompt.update({
				where: {
					id: params.id,
				},
				data: {
					tags: {
						set: [],
					},
				},
			}),
			//once all related tags have their information updated properly, we can proceed to delete the prompt
			prismaPhotoAlbumPrompts.prompt.delete({
				where: {
					id: params.id,
				},
				include: {
					user: true,
					tags: true,
				},
			}),
		]);

		if (!promptData) return new Response(JSON.stringify('Prompt not found'), { status: 404 });
		return new Response(JSON.stringify(promptData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(`Failed to delete the prompt from the DB ${error}`), { status: 500 });
	}
};
