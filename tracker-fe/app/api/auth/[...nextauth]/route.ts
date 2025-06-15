import createApolloClient from '@/apollo/client';
import { GET_USER_BY_EMAIL } from '@/apollo/users';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', required: true },
				password: { label: 'password', type: 'password', required: true },
			},
			async authorize(credentials) {
				if (!credentials) return null;
				const { email, password } = credentials;

				try {
					const client = createApolloClient();

					const data = await client.query({
						query: GET_USER_BY_EMAIL,
						variables: { email },
					});

					const user = data.data.usersByEmail;

					if (!user) return null;

					if (password !== user.password) return null;

					return {
						id: user.id,
						email: user.email,
					};
				} catch (error) {
					console.error('Error: ', error);
					return null;
				}
			},
		}),
	],

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			return session;
		},
	},

	pages: {
		signIn: '/sign-in',
	},
});

export { handler as GET, handler as POST };
