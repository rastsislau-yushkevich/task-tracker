import createApolloClient from "@/apollo/client"
import { GET_LAST_TERMS_OF_SERVICE } from "@/apollo/docs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Tracker App | Terms of Service",
  description: "Terms of Service for the task tracker app",
};

export const revalidate = 0;

export default async function Tos() {
  const client = createApolloClient();

  let data;
  try {
    const result = await client.query({
      query: GET_LAST_TERMS_OF_SERVICE,
    });
    data = result.data;
  } catch (error) {
    return <h2>Error: {(error as Error).message}</h2>;
  }

  const tosDocument = data.docs[0];

  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2.5">{tosDocument.title}</h1>
      <main>
        {tosDocument.contents}
      </main>
    </>
  )
}