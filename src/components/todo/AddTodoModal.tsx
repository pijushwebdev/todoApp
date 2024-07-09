import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { FormEvent, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
// import { useAppDispatch } from "@/redux/hooks";
// import { addTodo } from "@/redux/TodoSlice";
import { useAddTaskMutation } from "@/redux/api/api";

export function AddTodoModal() {
  const [title, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priorityIndex, setPriorityIndex] = useState('Low');

  //for local 
  // const dispatch = useAppDispatch();
  //for server
  const [addTodo] = useAddTaskMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.log({ title, description, priority });
    const taskDetails = {
      title,
      description,
      priorityIndex
    } 

    //for server
    addTodo(taskDetails);

    //for local
    // dispatch(addTodo(taskDetails))
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit task info</DialogTitle>
          <DialogDescription>Add your task for complete</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Title"
                className="col-span-3"
                onBlur={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Description"
                className="col-span-3"
                onBlur={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Priority
              </Label>
              <select defaultValue='Low' onChange={(e) => setPriorityIndex(e.target.value)}  className="col-span-3" name="priority" id="priority">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
              </select>
            </div>

            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
