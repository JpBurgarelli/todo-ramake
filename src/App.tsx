import { useState } from "react";

import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Minus, Trash2 } from "lucide-react";

type taskFormat = {
 description: string;
 checked: boolean;
};

function App() {
 const [taskDescription, setTaskDescription] = useState("");
 const [taskList, setTaskList] = useState<taskFormat[]>([]);

 const handleOnClickToAddTask = () => {
  console.log(taskDescription);
  setTaskList([...taskList, { description: taskDescription, checked: false }]);
  setTaskDescription("");
 };

 const handleRemove = (taskNumberToBeRemove: number) => {
  console.log(taskNumberToBeRemove, " afkaslkfd");
  const taskListAfterRemoval = taskList.filter(
   (_, taskIndex) => taskIndex !== taskNumberToBeRemove
  );

  setTaskList(taskListAfterRemoval);
 };

 const handleChecked = (taskNumberToBeChecked: number) => {
  const _listTasks = [...taskList];
  _listTasks[taskNumberToBeChecked].checked =
   !_listTasks[taskNumberToBeChecked].checked;
  setTaskList(_listTasks);
 };

 const handleDecreaseImportance = (taskNumberToBeChanged: number) => {
  if (taskNumberToBeChanged < taskList.length - 1) {
   const _listTasks = [...taskList];
   const currentTask = _listTasks[taskNumberToBeChanged];
   _listTasks[taskNumberToBeChanged] = _listTasks[taskNumberToBeChanged + 1];
   _listTasks[taskNumberToBeChanged + 1] = currentTask;
   setTaskList(_listTasks);
  }
 };

 const totalTasksCreated = taskList.length;
 const totalTasksChecked = taskList.filter((task) => task.checked).length;

 return (
  <div className="bg-slate-800 w-screen h-screen flex items-center justify-center  ">
   <div className="bg-slate-400 rounded-full">
    <Card>
     <CardHeader>
      <div className="flex justify-between">
       <CardTitle>Tasks</CardTitle>
       <CardTitle>
        {totalTasksChecked} / {totalTasksCreated}
       </CardTitle>
      </div>
     </CardHeader>
     <CardContent className="size-[500px] flex flex-col gap-4">
      {taskList.map((task, index) => {
       return (
        <div key={index}>
         <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
           <Checkbox
            onClick={() => handleChecked(index)}
            className="rounded-full"
           />
           <p>{task.description}</p>
          </div>
          <div className="flex items-center gap-2 ">
           <Button
            variant={"outline"}
            onClick={() => handleRemove(index)}
            className="hover:bg-red-500 transition duration-200"
           >
            <Trash2 size={16} />
           </Button>
           <Button
            onClick={() => handleDecreaseImportance(index)}
            className="p-3 hover:bg-yellow-500 transition duration-200"
            variant={"outline"}
           >
            <Minus />
           </Button>
          </div>
         </div>
        </div>
       );
      })}
     </CardContent>
     <CardFooter className="flex gap-2">
      <Input
       value={taskDescription}
       onKeyDown={(e) => {
        e.key === "Enter" && handleOnClickToAddTask();
       }}
       onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Button onClick={() => handleOnClickToAddTask()}>Enviar</Button>
     </CardFooter>
    </Card>
   </div>
  </div>
 );
}

export default App;
