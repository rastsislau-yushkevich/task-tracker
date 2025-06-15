"use client";

import { useForm } from "react-hook-form"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import { EDIT_TASK, GET_ALL_TASKS } from "@/apollo/tasks";
import { useSession } from "next-auth/react";

const editSchema = z.object({
  id: z.string().nonempty('ID is required'),
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
})

type TaskData = z.infer<typeof editSchema>;

interface EditDialogContentProps {
  defaultValues: TaskData,
  onSuccess: (open: boolean) => void
}

const EditDialogContent: FC<EditDialogContentProps> = ({ defaultValues, onSuccess }) => {
  const session = useSession();
  const [editTask] = useMutation(EDIT_TASK);

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues
  })

  const handleEdit = async (values: TaskData) => {
    const res = await editTask({
      variables: {
        keyId: values.id,
        title: { set: values.title },
        description: { set: values.description }
      },
      refetchQueries: [{ query: GET_ALL_TASKS, variables: { userId: session.data?.user.id } }]
    })

    if (res.data) {
      onSuccess(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Edit a task
        </DialogTitle>
        <DialogDescription>
          You can edit a task here
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  )
}

export default EditDialogContent