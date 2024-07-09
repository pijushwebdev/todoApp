import { TTodo } from "@/redux/TodoSlice";
import { useDeleteTaskMutation, useUpdateTaskMutation,  } from "@/redux/api/api";
// import { useAppDispatch } from "@/redux/hooks";

const TodoCard = ({
  title,
  description,
  id,
  isCompleted,
  priorityIndex,
}: TTodo) => {
  // const dispatch = useAppDispatch();

  const [removeTodo] = useDeleteTaskMutation(undefined);
  const [todoCompletion] = useUpdateTaskMutation(undefined);

  return (
    <>
      {title && (
        <div className="flex justify-between items-center font-medium bg-white p-3 rounded-md">
          <input
            className="mr-3"
            // onChange={() => dispatch(todoCompletion(id))}
            onChange={() => todoCompletion(id)}
            type="checkbox"
            name="completion"
            id="completion"
            defaultChecked={isCompleted}
          />
          <h1 className="flex-1">{title}</h1>
          <p className="flex-1">
            {isCompleted ? (
              <span className="text-green-600">Done</span>
            ) : (
              <span className="text-red-500">Pending</span>
            )}
          </p>
          <div className="flex flex-1 gap-2 items-center">
            <p
              className={`size-3 rounded-full 
              ${priorityIndex === "High" ? "bg-red-500" : ""} 
              ${priorityIndex === "Medium" ? "bg-yellow-500" : ""} 
              ${priorityIndex === "Low" ? "bg-green-500" : ""} `}
            ></p>
            <p>{priorityIndex}</p>
          </div>

          <p className="flex-[2]">{description}</p>

          <div className="space-x-5">
            <button>Edit</button>
            <button onClick={() => removeTodo(id)}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoCard;
