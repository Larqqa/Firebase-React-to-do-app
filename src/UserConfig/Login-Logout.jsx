import React, {Component} from 'react';

class Login extends Component{
  constructor(props){
    super(props);

    // Bind functions
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.Authorize = this.Authorize.bind(this);

    // Set component states
    this.state = {
      ...this.props.INITIAL_STATE
    }
  }

  // Check if user is authorized with call to app.js
  Authorize(){
    return this.props.isAuth();
  }

  // User login
  login(e){
    e.preventDefault();

    // Set variables
    const { email, password } = this.state;

    // Authorize user with given credentials
    this.props.firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      const user = result.user;
      console.log(user.email);
      // If authorized user, get users notes
      if(this.Authorize()) this.props.getNotes();
    }).then(() => {
      // Reset login fields
      this.setState({ ...this.props.INITIAL_STATE });
    })
    .catch(error => {
      // On error, catch and display error
      this.setState({ error });
    });
  }

  // User logout
  logout(){
    // Sign user out
    this.props.firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('You have logged out!');
    }).then(() => {
      // Then authorize the logout to empty notes
      this.Authorize();
    })
  }

  // On form change, change input field content
  // Check that inputs are not empty
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(props){
    const { email, password, error } = this.state;

    return(
      <div className="Login"> 
        <form onSubmit={this.login}>
          <input
            name="email"
            value={email}
            type="text"
            onChange={this.onChange}
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            type="password"
            onChange={this.onChange}
            placeholder="Password"
          />
          <button type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <button className="logout" onClick={this.logout}>
          Sign out
        </button>
      </div>
    )
  }
}

export default Login;