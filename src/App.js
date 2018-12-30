import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
// Which server is to be used? Commented wont show in build
//import firebase from './Config/Development_config';
import firebase from './Config/Production_config';
import 'firebase/database';
import 'firebase/auth';
import Login from './UserConfig/Login-Logout';
import './App.css';

// Set values for initial state of login
// Used for clearing the fields
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class App extends Component {
  constructor(props){
    super(props);
    // Bind functions
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.getNotes = this.getNotes.bind(this);

    // Setup for component states
    this.state = {
      notes: [],
      ...INITIAL_STATE,
      login: 'Not logged in!',
    }
  }
  
  // Authentication checker
  // Returns Boolean for checks
  isAuth() {
    // If is authenticated,
    if(firebase.auth().currentUser){
      // Get users ID and connect to the database as user and display logged in message
      let userId = firebase.auth().currentUser.uid;
      this.database = firebase.database().ref('users/' + userId).child('notes');
      this.setState({login: 'Logged in'});
      return true;
    } else {
      // If not, empty notes and display no login message
      this.setState({login: 'Not logged in!', notes: []});
      return false;
    }
  }

  // Get users notes
  getNotes(){
    // Get previous notes if there are some
    const previousNotes = this.state.notes;

    // If user is logged in
    if(this.isAuth()) {

      // On initial load of page and if new notes are added, get notes from DB
      this.database.on('child_added', snap => {
        previousNotes.push({
          id: snap.key,
          noteContent: snap.val().noteContent,    
        })

        // Set all notes to app state
        this.setState({
          notes: previousNotes
        })
      })

      // On note removal, remove note from state array and update content
      this.database.on('child_removed', snap => {
        for(let i=0; i < previousNotes.length; i++) {
          if(previousNotes[i].id === snap.key) {
            previousNotes.splice(i, 1);
          }
        }
        
        // Set rest of notes to app state
        this.setState({
          notes: previousNotes
        })
      })
    }
  }

  // Add new note to database, if authenticated
  addNote(note){
    if(this.isAuth()) this.database.push().set({ noteContent: note });
  }

  // Remove wanted note from database, if authenticated
  removeNote(noteId){
    if(this.isAuth()) this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="notesHeader">
            <h1>React  Firebase To-Do list</h1>
            <p>{this.state.login}</p>
            <Login firebase={firebase} INITIAL_STATE={INITIAL_STATE} state={this.state} isAuth={this.isAuth} getNotes={this.getNotes} />
          </div>
        </header>
        <div className="notesWrapper">
          <div className="notesBody">
            {
              this.state.notes.map((note) => {
                return(
                  <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote}/>
                )
              })
            }
          </div>
          <div className="notesFooter">
            <NoteForm addNote={this.addNote} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
