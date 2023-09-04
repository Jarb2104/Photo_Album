import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismaPhotoAlbumPrompts from '@utils/dbConnection/prismaClient';

const authHandler = NextAuth({
	adapter: PrismaAdapter(prismaPhotoAlbumPrompts),

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],

	callbacks: {
		async session({ session }) {
			const sessionUser = await prismaPhotoAlbumPrompts.user.findUnique({
				where: {
					email: session.user.email,
				},
			});
			session.user.id = sessionUser.id;
			return session;
		},

		async signIn({ profile }) {
			try {
				const userExists = await prismaPhotoAlbumPrompts.user.findUnique({
					where: {
						email: profile.email,
					},
				});

				if (!userExists) {
					console.log('this is a new user!');
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { authHandler as GET, authHandler as POST };
