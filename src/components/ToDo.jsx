import React, { Component } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';
import { v4 as uuid } from 'uuid';
import { get, post, update, remove, filter } from '../api/RESTful';
import logger from '../api/consoleLog';
import ToDoSearch from './ToDoSearch';
import debounce from '../api/debounce';

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      searchResults:[],
    };
    this.tasks = this.state.tasks;
  }
  handleGetTasks = async () => {
    try {
      get('tasks').then(tasks => this.setState({ tasks: tasks }));
    }catch (e) {
      logger(e, {
        color: 'red',
        fontSize: '24px',
        border: '.5px'
      })
    }
   };
  componentDidMount(){
    this.handleGetTasks();
  }
  handleAddTask = (taskName) =>{
    if (taskName.trim() !== "") {
      const task = {
        id: uuid(),
        name: taskName,
        isCompleted: false,
      }
      try{
        post('tasks', task);
        this.setState({tasks: [task, ...this.state.tasks]});
        toast.success("Task is added successfully", {
          icon: '🔥',
        })
      }catch(e){
        logger(e, {
          color:'red',
          fontSize: '24px',
          border: '1px'
        })
      }
    }else{
      toast.error("Please enter a task", {
        icon: '😑',
      })
    }
  }
  handleCompletedTask = (id) =>{
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    let selectedTask = tasks[index].isCompleted;
    selectedTask =!tasks[index].isCompleted;
    const data = {isCompleted : selectedTask};
    try {
      update('tasks', id, data);
      tasks[index].isCompleted = !tasks[index].isCompleted;
      this.setState({tasks : [...tasks]})
      toast.info("Task is updated successfully",{
        icon : "🌈",
      });
    }catch(e) {
      logger('Task is updated successfully',{
        color:'red',
        fontSize: '24px',
        border: '1px'
      })
    }
  }
  handleRemoveCompletedTask = (ids) =>{
    const data = [...this.state.tasks];
    const completedTasks = data.filter(tasks => tasks.isCompleted !== true);
    this.setState({tasks : completedTasks});
    try {
      ids.forEach(id => remove('tasks', id));
      this.setState({tasks : completedTasks});
      toast.success("Task is removed successfully", {
        icon: '🔥',
      })
    }catch(e) {
      logger('Remove unsuccessfully',{
        color: 'red',
        fontSize: '24px',
        border: '1px'
      });
    }
  }
  handleRemoveTask = (id) =>{
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    try {
      remove('tasks', id);
      tasks.splice(index, 1);
      this.setState({tasks : tasks});
      toast.info("Task is removed successfully",{
        icon : "🌈",
      });
    } catch (e) {
      logger(e, {
        color:'red',
        fontSize: '24px',
        border: '1px'
      });
    }
  }
  handleSearchTask = (keywords) => {
    const tasks = this.state.tasks;
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(keywords.toLowerCase()));
    if(keywords.trim() == "" || keywords.trim() == null){
      this.setState({tasks: tasks})
      console.log("check keyworks null");
    }
    try {
      const searchFunction = () => filter('task', keywords);
      debounce(searchFunction, 1000)
      this.setState({tasks: filteredTasks});
    }catch (e) {
      logger(e, {
        color:'red',
        fontSize: '24px',
        border: '1px'
      });
    }
  }
  render() {
    const tasks = this.state.tasks;
    return (
      <div className='todo'>
        <ToDoSearch onSearch={this.handleSearchTask} />
        <ToDoList
          tasks={tasks}
          onCompletedTask={this.handleCompletedTask}
          onRemoveTask={this.handleRemoveTask}
        />
        <ToDoInput
          tasks={tasks}
          onAddTask={this.handleAddTask}
          onRemoveAllCompleted={this.handleRemoveCompletedTask}
        />
        <ToastContainer
          autoClose={1000}
          transitionDuration={Slide}
          style={{fontSize: '1.4rem'}}
        />
        
      </div>
    )
  }
}
