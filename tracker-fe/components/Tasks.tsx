"use client";

import { useSession } from 'next-auth/react'
import { useQuery } from "@apollo/client"
import TaskCard from "./TaskCard"
import { GET_ALL_TASKS } from "@/apollo/tasks"
import { Task } from "@/types/task";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AddTaskDialogContent from "./AddTaskDialogContent";
import { useState } from 'react';

const Tasks = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useQuery(GET_ALL_TASKS, { variables: { userId: session.data?.user.id } });

  if (loading) {
    return <h2>Loading</h2>
  }
  if (error) {
    return <h2>Error: {error.message}</h2>
  }

  return (
    <main className="flex flex-col gap-2 items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add a task</Button>
        </DialogTrigger>
        <AddTaskDialogContent onSuccess={setOpen} />
      </Dialog>
      {data.tasks.map(({ id, title, description, completed }: Task) => <TaskCard key={id} id={id} title={title} description={description} completed={completed} />)}
    </main>
  )
}

export default Tasks