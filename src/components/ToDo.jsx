import React, { Component } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {id: 1, name: 'viec 1', isCompleted: true},
        {id: 2, name: 'viec 2', isCompleted: true},
      ],
    };
    this.tasks = this.state.tasks;
  }
  handleAddTask = (tasks) =>{
    this.setState({tasks: [tasks, ...this.state.tasks]});
  }
  handleCompletedTask = (id) =>{
    const index = this.state.tasks.findIndex(task => task.id === id);
    const tasks = [...this.state.tasks];
    tasks[index].isCompleted =!tasks[index].isCompleted;
    this.setState({tasks : [...tasks]})
    toast.info("Task is updated successfully",{
      icon : "🌈",
    });
  }
  handleRemoveCompletedTask = () =>{
    const completedTasks = this.state.tasks.filter(tasks => tasks.isCompleted !== false);
    this.setState({tasks : completedTasks});
  }
  handleRemoveTask = (tasks) =>{
    this.setState({tasks : tasks})
  }
  render() {
    const tasks = this.state.tasks;
    return (
      <div className='todo'>
        <ToDoList
          tasks={tasks}
          onCompletedTask={this.handleCompletedTask}
          onRemoveTask={this.handleRemoveTask}
        />
        <ToDoInput
          tasks={tasks}
          onAddTask={this.handleAddTask}
          onRemoveCompleted={this.handleRemoveCompletedTask}
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
