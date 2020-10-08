import React, { Component } from 'react';
import axios from "axios";
import classnames from "classnames";


 class Login extends Component {
   constructor() {
     super();
     //Local State of Register Component
     this.state = {
       email: "",
       password: "",
      errors: {},
     };
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }
   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }
   onSubmit(e) {
     e.preventDefault();
     const User = {
       email: this.state.email,
       password: this.state.password
      
     };
     axios
       .post("/api/users/login", User)
       .then((res) => console.log(res.data))
       .catch((err) => this.setState({ errors: err.response.data }));
   }

   render() {

    const { errors } = this.state;


     return (
       <div className="login">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center" Style="font-weight:Bold;margin-bottom:30px;">Log In</h1>
               
               <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                   <input
                     type="email"
                     className={classnames("form-control form-control-lg", {
                       "is-invalid": errors.email,
                     })}
                     placeholder="Email Address"
                     name="email"
                     value={this.state.email}
                     onChange={this.onChange}
                   />
                   {errors.email && (
                     <div className="invalid-feedback"> {errors.email}</div>
                   )}
                 </div>
                 <div className="form-group">
                   <input
                     type="password"
                     className={classnames("form-control form-control-lg", {
                       "is-invalid": errors.password,
                     })}
                     placeholder="Password"
                     name="password"
                     value={this.state.password}
                     onChange={this.onChange}
                   />
                   {errors.password && (
                     <div className="invalid-feedback"> {errors.password}</div>
                   )}
                 </div>
                 <div className="form-group">
                   <input type="submit" className="btn btn-info btn-block mt-4" Style="float:left;" />
                   </div>
               </form>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }

export default Login;