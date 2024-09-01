import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../store/auth";
import Header from "../Header";
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
  const [auth, setAuth] = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // console.log(name)
  const handleSubmit = async () => {
    // e.preventDefault();
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
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
    <Header/>
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
          pt={"60px"}
          backgroundColor={" background-color: rgb(2, 2, 36,.2)"}
        >
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
            Login
          </Button>
        </FormControl>
      </Flex>
    </>
  );
};

export default Login;
