import React ,{useEffect}from "react";
import axios from "axios";
import Update from "./Update";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  IconButton,
  Text,
  useToast,
  Button,
  Heading,
} from "@chakra-ui/react";
import "../style/Card.css";

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Card1 = ({item,handle}) => {
  const toast = useToast();
  // console.log(item._id);
  const delete1  = async()=>{

         alert("Sure you want to delete")
           try {
            const data = await axios.delete(
              `https://backend-task-bwtw.onrender.com/api/v1/task/deleteTask/${item._id}` );
          
              console.log(data);
            if (data.data.success===true) {
              handle();
              toast({
                title: "task delete Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            } 
           } catch (error) {
            console.log(error)
           }
  }

 
  return (
    <>
      <Card
        className="Card2"
        height={[300, 200]}
        width={[400, 400]}
        border={"1px solid white"}
        color={"white"}
        background={"rgba(76, 76, 79, 0.4)"}
        m={[2, 5, 5, 5]}
        overflow={"hidden"}
      >
        {/* <CardHeader>
          <Flex spacing="4">
            <Flex flex="1"  alignItems="center" flexWrap="wrap">
              <Box>
                <Text>{item.title}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader> */}
        <CardBody position={"relative"}>
          <Heading>{item.title}</Heading>
          <Text fontSize={"15px"} overflow={"scoll"}>
            {item.description}
          </Text>

          <Flex
            justify={"space-between"}
            mt={"5px"}
            position={"absolute"}
            left={"5px"}
            bottom={"5px"}
            w={"100%"}
          >

              {
                item.category==="Completed"?(
                  <Button
                  w={100}
                  mb={3}
                  h={"30px"}
                  
                  backgroundColor={"rgb(16, 227, 16,.3)"}
                  className="button"
                >
                  {item.category}
                </Button>
                ):(
                  <Button
                  w={100}
                  mb={3}
                  h={"30px"}
                  backgroundColor={"rgba(250, 130, 130, 1)"}
                  className="button"
                >
                  {item.category}
                </Button>
                )
              }

            <Update _id={item._id} handle={handle}/>
            <MdDelete size={"35px"} onClick={delete1} cursor={"pointer"} color="rgba(255, 0, 0,.7)"/>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default Card1;
