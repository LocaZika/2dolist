import React, { Component } from 'react'

export default class ToDoSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: ''
    }
  }
  handleSearchChange = (e) => {
    const { onSearch } = this.props;
    this.setState({keywords: e.target.value});
    onSearch(this.state.keywords);
  }
  render() {
    return (
      <div className='search'>
        <input type="search" onChange={this.handleSearchChange} />
      </div>
    )
  }
}
