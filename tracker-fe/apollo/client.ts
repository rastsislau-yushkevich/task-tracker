import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
	return new ApolloClient({
		uri: process.env.NEXT_PUBLIC_API_URL,
		cache: new InMemoryCache(),
		headers: {
			'x-hasura-ddn-token': process.env.NEXT_PUBLIC_DDN_TOKEN!,
			'x-hasura-admin-secret': process.env.NEXT_PUBLIC_DDN_TOKEN!,
		},
	});
};

export default createApolloClient;
