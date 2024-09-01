import React, { useState } from "react";
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
  Box,
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

const Create = ({ handle }) => {
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
      const data = await axios.post(
        "https://backend-task-bwtw.onrender.com/api/v1/task/create",
        {
          title,
          description,
          category,
        }
      );

      if (data.data) {
        handle();
        toast({
          title: "Task created successfully",
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
        console.log("Data not present");
      }
    } catch (error) {
      console.log(error);
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
      <Button
        onClick={onOpen}
        height={[200, 200]}
        width={[300, 300]}
        backgroundColor={"rgba(76, 76, 79, 0.4)"}
        color={"white"}
        _hover={{ backgroundColor: "rgba(76, 76, 79, 0.2)" }}
        border={"1px solid white"}
        fontSize={"30px"}
      >
        Add <IoAdd size={"40px"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create task</ModalHeader>
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Create;
