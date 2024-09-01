import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
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
  FormControl,
  Select,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

const Update = ({ _id, handle }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Please fill all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const { data } = await axios.put(
        `https://backend-task-bwtw.onrender.com/api/v1/task/update/${_id}`,
        { title, description, category }
      );

      if (data) {
        handle();
        toast({
          title: "Task updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTitle("");
        setDescription("");
        setCategory("");
        setErrors({});
        onClose();
      } else {
        console.log("No data returned from update API.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occurred!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Box onClick={onOpen}>
        <FaRegEdit size={"35px"} cursor={"pointer"} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!errors.title} isRequired>
              <Input
                placeholder="Title"
                mb={"10px"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.category} isRequired>
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
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description} isRequired>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Update;
