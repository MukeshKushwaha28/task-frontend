import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { useToast } from "@chakra-ui/react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

import "../../style/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // console.log(name)
  const handleSubmit = async () => {
    // e.preventDefault();
    if (!name || !email) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      const data = await axios.post(
        "https://backend-task-bwtw.onrender.com/api/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );

      if (data.data) {

        navigate("/")
        toast({
          title: "User register Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.log("data not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <Header/>
      <ToastContainer />
      <Flex
        minW={"100vw"}
        minH={"100vh"}
        border={"1px solid black"}
        backgroundColor={"rgb(2, 2, 36,1)"}
        align={"center"}
        justify={"center"}
      >
        <FormControl
          className="form"
          w={"400px"}
          h={"400px"}
          border={"1px solid white"}
          borderRadius={"10px"}
          p={"10px"}
          pt={"30px"}
          backgroundColor={" background-color: rgb(2, 2, 36,.2)"}
        >
          <Input
            type="text"
            placeholder="Enter name"
            color={"white"}
            mb={"30px"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Enter email"
            color={"white"}
            mb={"30px"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter password"
            color={"white"}
            mb={"30px"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button w={"200px"} backgroundColor={"orange"} onClick={handleSubmit}>
            Register
          </Button>
        </FormControl>
      </Flex>
    </>
  );
};

export default Register;
