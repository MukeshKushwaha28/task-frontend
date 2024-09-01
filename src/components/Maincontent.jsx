import React ,{useState,useEffect}from "react";
import { Box ,Text} from "@chakra-ui/react";
import '../style/Maincontent.css'
import Card1 from "./Card1";
import { Flex } from "@chakra-ui/react";
import Create from "./Create";
import Create1 from "./Create1";
import Alltask from "./pages/Alltask";
import axios from "axios";
import TaskbaseOncat from "./pages/TaskbaseOncat";

const Maincontent = () => {
  //  const [task,setTask] = useState();
   
  //  const handle = async()=>{
  //        try {
  //           const task = await axios.get("http://localhost:8080/api/v1/task/alltask")
  //           setTask(task.data.tasks)
  //        } catch (error) {
  //          console.log(error);
  //        }
  //  }
  //  useEffect(()=>{
  //   handle();
  //   console.log(task)
  //  },[])
  return (
    <div>
      <Box
        position={"relative"}
        className="mainContent"
        minH={{ base: "100vh", sm: "100vh", md: "100vh", lg: "95vh" }}
        minW={{ base: "95vw", sm: "60vw", md: "60vw", lg: "75vw" }}
        mr={[2, 3, 3, 3]}
        mt={[2, 3, 3, 3]}
        mb={[2, 3, 3, 3]}
        p={[2, 4, 6, 8]}
        border={"1px solid white"}
        borderRadius={[10]}
      >
        {/* <Create1  handle={handle}/>
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
        </Flex> */}

        {/* <Alltask/> */}
        <TaskbaseOncat/>
      </Box>
    </div>
  );
};

export default Maincontent;
