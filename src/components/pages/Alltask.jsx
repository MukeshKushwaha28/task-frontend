import React ,{useState,useEffect,useContext}from "react";
import { Box ,Text} from "@chakra-ui/react";
import Card1 from "../Card1";
import { Flex } from "@chakra-ui/react";
import Create from "../Create";
import Create1 from "../Create1";
import axios from "axios";
import { MyContext } from "../../store/catagory";
// import { useContext } from "react";
const Alltask = () => {

     const {state,setstate} = useContext(MyContext);
    const [task,setTask] = useState();
    // console.log(state);

    // const storedValue = localStorage.getItem("search");
    // console.log(storedValue)
   const handle = async()=>{
         try {
            const task = await axios.get("https://backend-task-bwtw.onrender.com/api/v1/task/alltask")
            setTask(task.data.tasks)
         } catch (error) {
           console.log(error);
         }
   }
   useEffect(()=>{
    handle();
    console.log(task)
   },[])
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

export default Alltask
