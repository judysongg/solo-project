import React, { Component } from 'react'

export default class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            title: '',
            description: '',
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
        this.setState({isEditing: !this.state.isEditing})
    }
    handleChange(e , field) {
        e.preventDefault()
        this.setState({[field]: e.target.value}, () => {
      })
    }

    handleEditClick() {
        this.props.handleEdit({id: this.props.id, title: this.state.title, description: this.state.description})
        this.setState({isEditing: false})
    }

    render() {
        return (
            <div className="flex">
                {this.state.isEditing && (
                    <div className='flex width-100 box start flex-row border-card mb-10 space-between'>
                        <input className="edit-box z-2" type="text" placeholder="title" onChange={(e) => this.handleChange(e, 'title')}></input>
                        <input className="edit-box z-2" type="text" placeholder="description"  onChange={(e) => this.handleChange(e, 'description')} ></input>
                        <div onClick={() => this.handleEditClick()}>
                            Save 
                        </div>
                    </div>
                )}
                {!this.state.isEditing && ( 
                    <div onClick={this.handleClick} className='flex width-100 space-between flex-row border-card mb-10'>
                        <div className="flex-col">
                            <div className="bold">{this.props.title} </div>
                            <div>{this.props.description}</div>
                        </div>
                        <div className="flex flex-row">
                        <div className="action-box z-5" onClick={() => this.props.handleDelete(this.props.id)}>
                            delete
                        </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

