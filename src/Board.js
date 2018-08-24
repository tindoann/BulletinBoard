
import React, { Component } from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'


// The state of the note is held in the board component 

class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {
//the variable notes will be an array of data that store the number of notes
			notes: []
		}
		this.eachNote = this.eachNote.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.add = this.add.bind(this)
		this.nextId = this.nextId.bind(this)
	}

	componentWillMount() {
		var self = this
		if (this.props.count) {
// fetch API 
			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				.then(response => response.json())
				.then(json => json[0]
					.split('. ')
					.forEach(sentence => self.add(sentence.substring(0, 25))))
		}
	}

	add(text) {
		this.setState(prevState => ({
			notes: [
// We are going to take all the notes that are in state, so previous 
// states and we're going to push them into a new array. Then append on a new note. 
				...prevState.notes,
				{
					id: this.nextId(),
					note: text
				}
			]
		}))
	}

	nextId() {
        this.uniqueId = this.uniqueId || 0
// Each time we add a new note, it will increment the note id. 
		return this.uniqueId++
	}

// Update the text when updating the note1
	update(newText, i) {
		console.log("Updating item at index ",i , newText)
		this.setState(prevState => ({
			notes: prevState.notes.map(
// If we are note updating the note, we will return it as is. Otherwise return a new object that passes in all of the keys of the note but it's going to overwrite the text for the note key. 
				note => (note.id !==i) ? note : {...note, note: newText})
		}))
	}

// This is going to return a new array that will remove the item where this is true
// The item where we're removing by the ID. 
	remove(id) {
		console.log("Removing note at ", id)
		this.setState(prevState => ({
			notes: prevState.notes.filter(note => note.id !== id)
		}))
	}

	// For each note do this
	eachNote(note, i) {
    // This is how we get the new text from the note, and update the note
		return (
			<Note key={note.id} index={note.id} onChange={this.update} onRemove={this.remove}>
				  {note.note}
			</Note>
		)
	}

// map over all the notes that are in state, it will call the each note 
// function for each instanst of a note

	render() {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={this.add.bind(null, "New Note")}
					id="add"><FaPlus /></button>
			</div>
		)
	}	
}

export default Board