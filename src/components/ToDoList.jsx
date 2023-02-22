import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../assets/scss/todolist.scss';

library.add(faCheck, faTrash);
export default class ToDoList extends Component {
  constructor(props) {
    super();
    // this.isCompleted;
  }
  handleCheckCompleted = (id) => {
    let tasks = this.props.tasks;
    let selectedTask = {};
    tasks.forEach((task, index) => {
      if (task.id === id) {
        let indexTask  = index;
        let isCompleted = false;
        task.isCompleted === false ? isCompleted = true : isCompleted = false;
        selectedTask = {...task, isCompleted}
        tasks[indexTask] = selectedTask;
      }
    });
    this.props.onCompletedTask(tasks);
  }
  handleDeleteTask = (index) => {
    let tasks = this.props.tasks;
    tasks.splice(index, 1);
    this.props.onDeleteTask(tasks);
  }
  render() {
    const {tasks} = this.props;
    return (
      <ul className="todo-list">
        {
          tasks.map((task, index) => {
            const { id, name, isCompleted} = task;
            return(
              <li key={id}>
                <button id='btn-isCompleted' onClick={
                  () => this.handleCheckCompleted(id)
                }>
                  <FontAwesomeIcon icon="fa-solid fa-check" className='check' />
                </button>
                <p className={isCompleted === true ? "completed" : null}>{name}</p>
                <button onClick={
                  () => this.handleDeleteTask(index)
                }>
                  <FontAwesomeIcon icon="fa-solid fa-trash" className='delete' />
                </button>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
