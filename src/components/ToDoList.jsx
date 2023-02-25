import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../assets/scss/todolist.scss';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

library.add(faCheck, faTrash);
export default class ToDoList extends Component {
  constructor(props) {
    super(props);
  }
  handleRemoveTask(id){
    const {onRemoveTask} = this.props;
    const swal = withReactContent(Swal);
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        title: 'font-size-24',
        htmlContainer: 'font-size-16',
        confirmButton: 'font-size-14',
        cancelButton: 'font-size-14',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onRemoveTask(id);
        swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      }
    })
  }
  render() {
    const {tasks, onCompletedTask} = this.props;
    return (
      <ul className="todo-list">
        {
          tasks.map((task) => {
            const { id, name, isCompleted} = task;
            return(
              <li key={id}>
                <button id='btn-isCompleted' onClick={
                  () => onCompletedTask(id)
                }>
                  <FontAwesomeIcon icon="fa-solid fa-check" className='check' />
                </button>
                <p className={isCompleted === true ? "completed" : null}>{name}</p>
                <button onClick={() => this.handleRemoveTask(id)}>
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
