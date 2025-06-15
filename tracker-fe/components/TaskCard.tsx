import { FC, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditDialogContent from "./EditDialogContent";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, GET_ALL_TASKS, TOGGLE_TASK_COMPLETED } from "@/apollo/tasks";
import { useSession } from "next-auth/react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskCard: FC<TaskCardProps> = ({ id, title, description, completed }) => {
  const session = useSession()
  const [open, setOpen] = useState(false);
  const [toggleCompleted] = useMutation(TOGGLE_TASK_COMPLETED);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleCheckedChange = async () => {
    await toggleCompleted({ variables: { keyId: id, completed: !completed } })
  }

  const handleDeleteTask = async () => {
    await deleteTask({
      variables: {
        keyId: id
      },
      refetchQueries: [{ query: GET_ALL_TASKS, variables: { userId: session.data?.user.id } }]
    })
  }

  return (
    <Card className={`w-[312px] ${completed ? 'shadow bg-gray-100 text-gray-600' : ''}`}>
      <CardHeader className="items-center">
        <CardTitle className={`${completed ? 'line-through' : ''}`}>{title}</CardTitle>
        <CardAction>
          <Checkbox
            onCheckedChange={handleCheckedChange}
            className="w-[24px] h-[24px]"
            checked={completed}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">
        <p className={`${completed ? 'line-through' : ''}`}>{description}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <EditDialogContent defaultValues={{ id, title, description }} onSuccess={setOpen} />
        </Dialog>
        <Button variant='destructive' onClick={handleDeleteTask}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default TaskCard