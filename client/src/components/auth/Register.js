import React, { Component } from 'react'

class Register extends Component {
  constructor() {
    super();
    //Local State of Component
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange=this.onChange.bind(this);
  }
    onChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }
  render() {
    return (
      <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <h3 className="lead text-center">Create your account</h3>
          <form action="create-profile.html">
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" 
              value={this.state.name}
              onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
              <small className="form-text text-muted" > Enter your Gravatar email address to automatically upload your personal online avatar </small>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password}
              onChange={this.onChange} />
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2}
              onChange={this.onChange} />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
export default Register;