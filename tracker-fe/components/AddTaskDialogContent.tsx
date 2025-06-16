"use client";
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "./ui/form"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_TASK, GET_ALL_TASKS } from "@/apollo/tasks";
import { useSession } from "next-auth/react";
import { FC } from "react";

const addSchema = z.object({
  id: z.string().nonempty('ID is required'),
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
})

interface AddTaskDialogContentProps {
  onSuccess: (open: boolean) => void
}

const AddTaskDialogContent: FC<AddTaskDialogContentProps> = ({ onSuccess }) => {
  const [addTask] = useMutation(ADD_TASK);
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(addSchema),
    defaultValues: {
      id: session.data?.user.id || '',
      title: '',
      description: ''
    }
  })

  const handleAdd = async (values: z.infer<typeof addSchema>) => {
    const res = await addTask({
      variables: {
        userId: values.id,
        title: values.title,
        description: values.description
      },
      refetchQueries: [{ query: GET_ALL_TASKS, variables: { userId: values.id } }],
      awaitRefetchQueries: true
    })
    if (res.data) {
      onSuccess(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Add a task
        </DialogTitle>
        <DialogDescription>
          You can add a task here
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
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

export default AddTaskDialogContent