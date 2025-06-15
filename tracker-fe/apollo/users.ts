import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
	query MyQuery($email: String1 = "") {
		usersByEmail(email: $email) {
			id
			email
			password
		}
	}
`;
