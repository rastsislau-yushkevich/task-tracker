import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Tracker App | FAQ",
  description: "FAQ for the task tracker app",
};

export default function Faq() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2.5">Frequently asked questions</h1>
      <Accordion type='multiple'>
        <AccordionItem value="q-1">
          <AccordionTrigger>How can I edit tasks?</AccordionTrigger>
          <AccordionContent>
            You can edit a task by clicking the Edit button at the bottom of the card.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q-2">
          <AccordionTrigger>Is it possible to delete tasks?</AccordionTrigger>
          <AccordionContent>
            Yes. Just click the Delete button at the bottom of the card.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q-3">
          <AccordionTrigger>Has this app been built with Next.js?</AccordionTrigger>
          <AccordionContent>
            Yes. It has been built using Next.js, Hasura, PostgreSQL, NextAuth, Shadcn and Apollo.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q-4">
          <AccordionTrigger>Can I track my shopping list tasks with the app?</AccordionTrigger>
          <AccordionContent>
            Yes. Though it has not been designed exactly gor tracking shopping lists, you can stil use it this way.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q-5">
          <AccordionTrigger>Where is the app deployed to?</AccordionTrigger>
          <AccordionContent>
            The app is deployed to Vercel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}