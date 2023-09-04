import { PrismaClient } from '@prisma/client';

const prismaPhotoAlbumPrompts = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prismaPhotoAlbumPrompts;

export default prismaPhotoAlbumPrompts;
