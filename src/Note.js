// Creates a sticky note component 

import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'
// npm i --save react-icon

class Note extends Component {
    // The constructor gives access to this 
	constructor(props) {
		super(props)
		this.state = {
			editing: false
        }
        
// We bind in order to use the event method, puts it in scope. 

		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
		this.randomBetween = this.randomBetween.bind(this)
	}

	componentWillMount() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth -150, 'px'),
			top: this.randomBetween(0, window.innerHeight - 159, 'px'),
			transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}

	randomBetween(x, y, s) {
		return x + Math.ceil(Math.random() * (y-x)) + s
	}

	componentDidUpdate() {
		var textArea
		if (this.state.editing) {
			textArea = this._newText
			textArea.focus()
			textArea.select()
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

// if nothing has changed, no re-render to update

		return (
			this.props.children !== nextProps.children || this.state !== nextState.children
		)
	}

	edit() {
		this.setState({
			editing: true
		})
	}

	remove() {
		this.props.onRemove(this.props.index)
	}

	save(e) {
        e.preventDefault()
// onChange refers to the update method
		this.props.onChange(this._newText.value, this.props.index)
        
// put the setState back to false         
        this.setState({
			editing: false
		})
	}

	renderForm() {
		return (
			<div className="note" style={this.style}>
				<form onSubmit={this.save}>

    {/* } ref is use to capture the user input */}

					<textarea ref={input => this._newText = input} defaultValue={this.props.children}/>
					<button id="save"><FaFloppyO /></button>
				</form>
			</div>
		)
	}

	renderDisplay() {
// display anything that is a child of the element
		return (
			<div className="note" style={this.style}>
				<p>{this.props.children}</p>
				<span>
    {/* Handling events */}
					<button onClick={this.edit} id="edit"><FaPencil /></button>
					<button onClick={this.remove} id="remove"><FaTrash /></button>
				</span>
			</div>
		)
    }
    
// If-else ternary statement
	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay()
	}

}

export default Note