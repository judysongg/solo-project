
import React, { Component } from 'react';
import newTextBox from './newTextBox';
import style from '../style.css'; 
import { RecipeList } from './RecipeList'
import axios from 'axios'

class MainContainer extends Component {
    constructor() {
      super()
      this.state = {
        recipeList: [],
        description: '',
        title: ''
      }

      this.createRecipe = this.createRecipe.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleEdit = this.handleEdit.bind(this)
      this.handleDelete = this.handleDelete.bind(this)

    }

    componentDidMount() {
      axios.get('http://localhost:3000/recipes')
      .then(res => {
        this.setState({recipeList: res.data.sort((a , b) => a.recipe_id - b.recipe_id)})
      })
    }

    handleEdit(editPayload) {
      const { id , title, description } = editPayload
      axios.put(`http://localhost:3000/recipe/${id}`, {
          title,
          description,
      }).then(res => {
          let index;
          for (let i = 0; i < this.state.recipeList.length; i++){
            if (this.state.recipeList[i].recipe_id === id) {
              index = i
            }
          }
          const updatedList = this.state.recipeList
          updatedList[index] = res.data
          //jank you want to update the actual domain model from the parent container....
          this.setState({
              recipeList: updatedList
          })
      })
  }

    handleDelete(id) {
      axios.delete(`http://localhost:3000/recipe/${id}`)
      .then(() => {
        const updatedList = this.state.recipeList
        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i].recipe_id === id) {
            updatedList.splice(i, 1)
          } 
        }
        this.setState({recipeList: updatedList})
      })
    }

    createRecipe(e) {
      e.preventDefault()
      axios.post('http://localhost:3000/recipe', {
        title: this.state.title,
        description: this.state.description
      }).then(res => {
        const currentRecipeList = this.state.recipeList
        currentRecipeList.push(res.data)
        this.setState({recipeList: currentRecipeList})
      })
    }

    handleChange(e, field) {
      e.preventDefault()
      this.setState({[field]: e.target.value}, () => {
        console.log(this.state)
      })
    }

    render() {
      return (
        <div className="flex flex-col">
          <div>
            <RecipeList handleDelete={this.handleDelete} handleEdit={this.handleEdit}recipeList={this.state.recipeList} />
            <form className = 'input-text' onSubmit={(e) => this.createRecipe(e)}>
              <input className="edit-box z-2" type="text" placeholder="title" onChange={(e) => this.handleChange(e, 'title')} id="recipe-title"></input>
              <input className="edit-box z-2" type="text" placeholder="description" onChange={(e) => this.handleChange(e, 'description')} id="recipe-description"></input>
              <button>Submit</button>
            </form>
          </div>
        </div>
      )
      }
    }


export default MainContainer; 
