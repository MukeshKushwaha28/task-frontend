import React ,{useContext}from "react";
import { Box ,Flex,Text} from "@chakra-ui/react";
import { GrTask } from "react-icons/gr";
import { BiTaskX } from "react-icons/bi";
import { GrTasks } from "react-icons/gr";
import '../style/Sidebar.css'
import { useNavigate } from "react-router-dom";
import { MyContext } from "../store/catagory";
import { useAuth } from "../store/auth";


const Sidebar = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth();
  const {state, setState} = useContext(MyContext)
// ['Incomplete', 'In Progress', 'Completed'
  const handle1 = ()=>{
    // navigate("/login")
    setState("Completed")
  }
   
  const handle2 = ()=>{
    setState("Incomplete")
  }

  const handle3 = ()=>{
    setState("In Progress")
  }
  return (
    <>
      <Box
        className="sidebar"
        minH={{ base: "0px", sm: "100vh", md: "100vh", lg: "95vh" }}
        minw={[
          "0px","40%","40%", "25%", 
        ]}
        ml={[2, 3, 3, 3]}
        mt={[2, 3, 3, 3]}
        mb={[2, 3, 3, 3]}
        border={"1px solid white"}
        borderRadius={[10]}
      >

        <Box color={"white"} p={[5]} >
            <Text color="white" fontSize={"1.5rem"} borderBottom={"1px solid white"}>{auth.user.name}</Text>
            <Text color="white" fontSize={"1.5rem"} >{auth.user.email}</Text>
        </Box>
         
        <Flex justify={"center"} align={"center"} direction={"column"} mt={"70px"}>
        <Text cursor={"pointer"} className="text" color="white" fontSize={"1.2rem"} mb={[5]} onClick={handle1}><Box mt={[1.5]} mr={[2]}><GrTask color="white"  onClick={handle1}/></Box> Completed task</Text>
        <Text cursor={"pointer"} className="text" color="white" fontSize={"1.2rem"} mb={[5]} ml={[3]} onClick={handle2}><Box mt={[1.5]} mr={[2]}><BiTaskX color="white" size={"25px"} onClick={handle2}/></Box>InComplete task</Text>
        <Text cursor={"pointer"} className="text" color="white" fontSize={"1.2rem"} onClick={handle3}><Box mt={[1.5]} mr={[2]}><GrTasks color="white"  onClick={handle3}/></Box>InProgress task</Text>
        
        </Flex>
      </Box>
    </>
  );
};

export default Sidebar;
