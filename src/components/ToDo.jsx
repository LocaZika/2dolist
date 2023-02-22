import React, { Component } from 'react';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';

export default class ToDo extends Component {
  constructor(props) {
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
    this.setState({tasks: tasks});
  }
  handleCompletedTask = (tasks) =>{
    this.setState({tasks : tasks})
  }
  handleRemoveCompletedTask = (tasks) =>{
    this.setState({tasks : tasks})
  }
  handleDeleteTask = (tasks) =>{
    this.setState({tasks : tasks})
  }
  render() {
    const tasks = this.state.tasks;
    console.log(tasks);
    return (
      <div className='todo'>
        <ToDoList
          tasks={tasks}
          onCompletedTask={this.handleCompletedTask}
          onDeleteTask={this.handleDeleteTask}
        />
        <ToDoInput
          tasks={tasks}
          onAddTask={this.handleAddTask}
          onRemoveCompleted={this.handleRemoveCompletedTask}
        />
      </div>
    )
  }
}
