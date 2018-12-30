import React, {Component} from 'react';
import './NoteForm.css';

class NoteForm extends Component{
  constructor(props){
    super(props);
    // Set component state
    this.state ={
      newNoteContent: '',
    };
    // Bind functions
    this.handleUserInput = this.handleUserInput.bind(this);
    this.newNote = this.newNote.bind(this);
  }

  // Set content of note to form value, check that form is not empty
  handleUserInput(e){
    this.setState({
      newNoteContent: e.target.value,
    })
  }

  // Add new note
  newNote(e){
    e.preventDefault();

    // Send addNote call to app,js with content from input
    this.props.addNote(this.state.newNoteContent);
    
    // Empty out input field
    this.setState({
      newNoteContent: '',
    })
  }

  render(){
    // Set variables for input field to check if input is not empty.
    const { newNoteContent } = this.state;
    const isInvalid = newNoteContent === '';

    return(
      <div className="formWrapper">
        <form onSubmit={this.newNote}>
          <input className="noteInput" placeholder="Write some shit!" name="toDo"  value={this.state.newNoteContent} onChange={this.handleUserInput} />
          <button type="submit" className="NoteButton" disabled={isInvalid}>Add Note!</button>
        </form>
      </div>
    )
  }
}

export default NoteForm;