import React, {Component} from 'react';
import './Note.css';
import propTypes from 'prop-types';

class Note extends Component{
  constructor(props){
    super(props);
    // Bind functions
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  // Remove notes call send to app.js with note id
  handleRemoveNote(id){
    this.props.removeNote(id);
  }

  render(props){
    return(
      <div className="note fade-in">
        <p className="noteContent">{ this.props.noteContent }</p>
        <span className="closeBtn" onClick={() => this.handleRemoveNote(this.props.noteId)}>&times;</span>
      </div>
    )
  }
}

Note.propTypes = {
  noteContent: propTypes.string
}

export default Note;