// import { useAppSelector } from "@/redux/hooks";
import { useGetAllTasksQuery } from "@/redux/api/api";
import { AddTodoModal } from "./AddTodoModal";
import TodoCard from "./TodoCard";
import { TodoFilter } from "./TodoFilter";
import { TTodo } from "@/redux/TodoSlice";
import { useState } from "react";
// import { RootState } from "@/redux/store";

const TodoContainer = () => {
  // from Local state
  // const todos = useAppSelector((state: RootState) => state.todo.todos);

  // from server
  // const {data:todos, isLoading} = useGetAllTasksQuery(undefined, {pollingInterval: 1000}); //see use cae of {pollingInterval} and rest of it
  
  const [priorityIndex, setPriorityIndex] = useState('');
  const {data:todos, isLoading} = useGetAllTasksQuery(priorityIndex);  

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <div className="">
      <h1 className="text-center text-2xl mt-4 pt-4 font-semibold m-10">Todo's</h1>
      <div className="mb-5 space-x-3">
        <AddTodoModal />
        <TodoFilter priorityIndex={priorityIndex} setPriorityIndex={setPriorityIndex} />
      </div>
      { todos.length >= 1 &&
        <div className="w-fill bg-primary-gradient h-full rounded-xl p-5 space-y-3">

          { todos?.map((item:TTodo) => (
            <TodoCard
              // key={item.id}
              // id={item.id}
              // title={item.title}
              // isCompleted={item.isCompleted}
              // description={item.description}
              {...item}
            key={item.id}
            />
          ))}
          
        </div>
      }
    </div>
  );
};

export default TodoContainer;
