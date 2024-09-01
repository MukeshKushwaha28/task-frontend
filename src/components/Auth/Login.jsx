import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../store/auth";
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

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // console.log(name)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      const data = await axios.post("https://backend-task-bwtw.onrender.com/api/v1/auth/login", {
        email,
        password,
      });

      console.log(data);

      if (data.data.success === false) {

        toast({
          title: "invalid credential !",

          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      if (data.data.success) {

        setAuth({
          ...auth,
          user: data.data.user,
          token: data.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data.data));
        toast({
          title: "User login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // console.log(data);

        navigate("/dashboard/home")
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
    <Header/>
      <Flex
        minW={"100vw"}
        minH={"90vh"}
        border={"1px solid black"}
        backgroundColor={"rgb(2, 2, 36,1)"}
        align={"center"}
        justify={"center"}
        className="form"
        pb={[110,20]}
      >
        <FormControl
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          // className="form"
          w={[400,400]}
          h={[300,400]}
          border={"1px solid white"}
          borderRadius={"10px"}
          p={"10px"}
          pt={"30px"}
          backgroundColor={" background-color: rgb(2, 2, 36,.2)"}
          
        >
          <Input
            type="email"
            placeholder="Enter email"
            color={"white"}
            mb={"30px"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter password"
            color={"white"}
            mb={"30px"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button w={"200px"} backgroundColor={"blue"} color={"white"} onClick={(e)=>{handleSubmit(e)}}>
            Login
          </Button>
        </FormControl>
      </Flex>
    </>
  );
};

export default Login;
