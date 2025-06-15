import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
	query userTasks($userId: Uuid!) {
		tasks(where: { userId: { _eq: $userId } }) {
			id
			title
			completed
			description
		}
	}
`;

export const TOGGLE_TASK_COMPLETED = gql`
	mutation toggleTaskCompletion($keyId: Uuid!, $completed: Boolean1!) {
		updateTasksById(
			keyId: $keyId
			updateColumns: { completed: { set: $completed } }
		) {
			returning {
				id
				title
				completed
			}
		}
	}
`;

export const EDIT_TASK = gql`
	mutation editTask(
		$keyId: Uuid = ""
		$description: UpdateColumnTasksDescriptionInput = { set: "" }
		$title: UpdateColumnTasksTitleInput = { set: "" }
	) {
		updateTasksById(
			updateColumns: { description: $description, title: $title }
			keyId: $keyId
		) {
			returning {
				id
				title
				description
			}
		}
	}
`;

export const ADD_TASK = gql`
	mutation addTask(
		$description: String1 = ""
		$title: String1 = ""
		$userId: Uuid = ""
	) {
		insertTasks(
			objects: { description: $description, title: $title, userId: $userId }
		) {
			returning {
				id
				title
				description
				completed
			}
		}
	}
`;

export const DELETE_TASK = gql`
	mutation MyMutation($keyId: Uuid = "") {
		deleteTasksById(keyId: $keyId) {
			returning {
				id
			}
		}
	}
`;
