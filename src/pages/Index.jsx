import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, Container, Heading, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center" mb={6}>
        <Heading mb={4}>Todo App</Heading>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
          mb={4}
        />
        <Button onClick={addTask} colorScheme="blue" px={8}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => toggleTaskCompletion(task.id)}
                colorScheme={task.isCompleted ? 'green' : 'gray'}
                aria-label="Complete Task"
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete Task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;