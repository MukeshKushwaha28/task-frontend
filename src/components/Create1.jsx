import React, { useState,useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  useToast,
  // Box,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { IoAdd } from "react-icons/io5";

const Create1 = ({handle}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();

  const handleSubmit = async () => {
    if (!title || !description || !category) {
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
        "https://backend-task-bwtw.onrender.com/api/v1/task/create",
        {
          title,
          description,
          category,
        }
      );

      console.log(data.data);

      if (data.data) {
        handle();
        toast({
          title: "Task create Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        console.log(data.data);
        onClose();
      } else {
        console.log("data not present");
      }
    } catch (error) {
      console.log(error);
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
      <Box
        onClick={onOpen}
        w={"40px"}
        h={"40px"}
        backgroundColor={"rgba(76, 76, 79, 0.4)"}
        borderRadius={"50%"}
      >
        <IoAdd size={"40px"} color={"white"} />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <Input
                  placeholder="Title"
                  mb={"10px"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Select
                  placeholder="Select category"
                  mb={"10px"}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Incomplete">Incomplete</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Select>

                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                close
              </Button>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Create1;
