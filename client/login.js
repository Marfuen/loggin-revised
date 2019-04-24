import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from './store';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
    }
  }
  handleChange = ({target}) => {
    this.setState({
      [target.name]: target.value
    });
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.login(this.state)
      .catch(err => console.error(err));
  };
  render(){
    return (
      <div className='h100 w100 flex column align-items-center justify-center'>
        <h1>Let's Loggin'!</h1>
        <div className='flex w50'>
          <img src='/loggin.png' />
          <form className='grow1' onSubmit={this.handleSubmit}>
            <div className='flex column'>
              <div className='flex column m1'>
                <label htmlFor='email'>Email</label>
                <input onChange={this.handleChange} type='email' name='email' className='input' value={this.state.email}/>
              </div>
              <div className='flex column m1'>
                <label htmlFor='email'>Password</label>
                <input onChange={this.handleChange} type='password' name='password' className='input' value={this.state.password}/>
              </div>
              <div className='m1'>
                <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
  };
}

export default connect(null, mapDispatchToProps)(Login)
