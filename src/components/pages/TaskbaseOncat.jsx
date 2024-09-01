import React ,{useState,useEffect}from "react";
import { Box ,Text} from "@chakra-ui/react";
import Card1 from "../Card1";
import { Flex } from "@chakra-ui/react";
import Create from "../Create";
import Create1 from "../Create1";
import axios from "axios";
// import { SearchContext } from "../../store/catagory";
import { useContext } from "react";
import { MyContext } from "../../store/catagory";

const TaskbaseOncat = () => {

    const [task,setTask] = useState();
    
    const {state,setstate} = useContext(MyContext);
   console.log(state);
    const category = state;
   const handle = async()=>{
         try {
            const task = await axios.post("https://backend-task-bwtw.onrender.com/api/v1/task/tasks",{
              category
            })
            setTask(task.data.tasks)
         } catch (error) {
           console.log(error);
         }
   }
   useEffect(()=>{
    handle();
    console.log(task)
   },[state])
  return (
    <div>
        <Create1  handle={handle}/>
        <Flex flexWrap="wrap" align="center" justify="center">
          {
            !task?(<h1>Loading</h1>):(
               task.map((item)=>{
                   return(
                    <>
                       <Card1 item={item} handle={handle}/>
                    </>
                   )
               })
            )
          }

          <Create handle={handle}/>
        </Flex>
    </div>
  )
}

export default TaskbaseOncat
