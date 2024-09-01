import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Stack,
} from "@chakra-ui/react";

const DragDropExample = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [progressTasks, setProgressTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [dropIndicator, setDropIndicator] = useState(null);

  // Fetch tasks for each category
  useEffect(() => {
    const fetchTasksByCategory = async (category, setTasks) => {
      try {
        const response = await axios.post(
          "https://backend-task-bwtw.onrender.com/api/v1/task/tasks",
          { category }
        );
        setTasks(response.data.tasks);
      } catch (err) {
        console.error(`Error fetching ${category} tasks:`, err);
        if (!sessionStorage.getItem("showError")) {
          const ok = window.confirm(
            `There was an error fetching ${category} tasks. Please check the API endpoint.`
          );
          if (ok) {
            window.location.reload();
            sessionStorage.setItem("showError", "true");
          }
        }
      }
    };

    fetchTasksByCategory("Incomplete", setIncompleteTasks);
    fetchTasksByCategory("In Progress", setProgressTasks);
    fetchTasksByCategory("Completed", setCompleteTasks);
  }, []);

  // Update the task's category on the server
  const updateTaskCategory = async (task) => {
    try {
      await axios.put(
        `https://backend-task-bwtw.onrender.com/api/v1/task/update/${task._id}`,
        task,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Handle drag start
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDropIndicator(null);
  };

  // Handle drop and update task category
  const handleDrop = (e, newCategory) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");

    const allTasks = [...incompleteTasks, ...progressTasks, ...completeTasks];
    const task = allTasks.find((task) => task._id === taskId);

    if (task) {
      task.category = newCategory;
      updateTaskCategory(task);

      // Update task lists
      setIncompleteTasks((prevTasks) =>
        prevTasks.filter((t) => t._id !== taskId)
      );
      setProgressTasks((prevTasks) =>
        prevTasks.filter((t) => t._id !== taskId)
      );
      setCompleteTasks((prevTasks) =>
        prevTasks.filter((t) => t._id !== taskId)
      );

      if (newCategory === "Incomplete") {
        setIncompleteTasks((prevTasks) => [...prevTasks, task]);
      } else if (newCategory === "In Progress") {
        setProgressTasks((prevTasks) => [...prevTasks, task]);
      } else if (newCategory === "Completed") {
        setCompleteTasks((prevTasks) => [...prevTasks, task]);
      }
    }

    setDropIndicator(null);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setDropIndicator(e.currentTarget.id);
  };

  // Render tasks for a specific category
  const renderTasks = (tasks, category) => {
    return tasks.map((task) => (
      <Card
        key={task._id}
        draggable
        onDragStart={(e) => handleDragStart(e, task._id)}
        onDragEnd={handleDragEnd}
        bg={dropIndicator === category ? "blue.100" : "gray.100"}
        w="100%"
        h="150px" // Fixed height
        boxShadow="md"
        overflow="hidden"
        backgroundColor={" rgb(2, 2, 36,.8)"}
        color={"white"}
        border={"1px solid white"}
      >
        <CardHeader>
          <Heading size="sm">{task.title}</Heading>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3}>{task.description}</Text>
        </CardBody>
      </Card>
    ));
  };

  return (

    <>
    <Header/>
    <Box p={6} minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}  backgroundColor={" rgb(2, 2, 36,.8)"}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        h="100%"
      >
        <GridItem>
          <Heading mb={4} textAlign="center" color="cyan.700">
            Incomplete
          </Heading>
          <Flex
            id="Incomplete"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Incomplete")}
            flexDirection="column"
            border="2px dashed"
            borderRadius="md"
            p={2}
            gap={2}
            h="100%"
            minH="200px"
            bg={useColorModeValue("white", "gray.800")}
            backgroundColor={" rgb(2, 2, 36,.8)"}
          >
            <Stack spacing={3}>
              {renderTasks(incompleteTasks, "Incomplete")}
            </Stack>
          </Flex>
        </GridItem>

        <GridItem>
          <Heading mb={4} textAlign="center" color="cyan.700">
            In Progress
          </Heading>
          <Flex
            id="In Progress"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "In Progress")}
            flexDirection="column"
            border="2px dashed"
            borderRadius="md"
            p={2}
            gap={2}
            h="100%"
            minH="200px"
            bg={useColorModeValue("white", "gray.800")}
            backgroundColor={" rgb(2, 2, 36,.8)"}
          >
            <Stack spacing={3}>
              {renderTasks(progressTasks, "In Progress")}
            </Stack>
          </Flex>
        </GridItem>

        <GridItem>
          <Heading mb={4} textAlign="center" color="cyan.700">
            Completed
          </Heading>
          <Flex
            id="Completed"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Completed")}
            flexDirection="column"
            border="2px dashed"
            borderRadius="md"
            p={2}
            gap={2}
            h="100%"
            minH="200px"
            bg={useColorModeValue("white", "gray.800")}
            backgroundColor={" rgb(2, 2, 36,.8)"}
          >
            <Stack spacing={3}>
              {renderTasks(completeTasks, "Completed")}
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
    </>
  );
};

export default DragDropExample;
