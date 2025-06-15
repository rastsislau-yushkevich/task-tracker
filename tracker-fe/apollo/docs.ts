import { gql } from '@apollo/client';

export const GET_LAST_TERMS_OF_SERVICE = gql`
	query lastTermsOfService {
		docs(limit: 1, order_by: { createdAt: Desc }) {
			title
			contents
		}
	}
`;
