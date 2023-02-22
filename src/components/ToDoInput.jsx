import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../assets/scss/inputTask.scss';

library.add(faPlus);
export default class ToDoInput extends Component {
  constructor(props) {
    super();
    this.taskName = '';
  }
  handleChangeTask = (e) => {
    this.taskName = e.target.value;
  }
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleAddTask();
    }
  }
  handleAddTask = () => {
    let taskName = this.taskName;
    const task = {
      id: this.props.tasks.length + 1,
      name: taskName,
      isCompleted: false,
    }
    const tasks = [task, ...this.props.tasks];
    this.props.onAddTask(tasks);
    const inputTask = document.getElementById("input-task");
    inputTask.value = '';
  }
  handleRemoveAllCompletedTasks = () => {
    const tasks = this.props.tasks;
    tasks.forEach((task, index) => {
      if(task.isCompleted === true) {
        tasks.splice(index, 1);
      }
    });
    console.log(tasks);
    this.props.onRemoveCompleted(tasks);
  };
  render() {
    return (
      <div className='input-task'>
        <input type="text" name="task" id='input-task' placeholder='Add task' onChange={this.handleChangeTask} onKeyDown={this.handleKeyDown} />
        <button onClick={this.handleAddTask}>
          <FontAwesomeIcon icon="fa-solid fa-plus" style={{
            color: "rgb(25, 118, 210)",
            fontSize: "2.4rem",
            }} />
        </button>
        <button onClick={this.handleRemoveAllCompletedTasks}>
          <svg style={{
            width: "2.1rem",
            height: "2.1rem",
            display: "inline-block",
            }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveDoneIcon">
              <path fill='rgb(25, 118, 210)' d="m1.79 12 5.58 5.59L5.96 19 .37 13.41 1.79 12zm.45-7.78L12.9 14.89l-1.28 1.28L7.44 12l-1.41 1.41L11.62 19l2.69-2.69 4.89 4.89 1.41-1.41L3.65 2.81 2.24 4.22zm14.9 9.27L23.62 7 22.2 5.59l-6.48 6.48 1.42 1.42zM17.96 7l-1.41-1.41-3.65 3.66 1.41 1.41L17.96 7z"></path>
          </svg>
        </button>
      </div>
    )
  }
}
