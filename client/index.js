import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import store, {fetchUser} from './store'
import Login from './login'
import UserPage from './user-page'



class _Main extends Component {
  constructor(){
    super();
    this.state = {
      errors: {},
    }
  }
  componentDidMount () {
    this.props.fetchUser().catch(err => this.setState({errors: err}))
  }
  render () {
    const { isLoggedIn } = this.props;
    const { errors } = this.state;
    return (
      <div>
        {errors ? <h1 style={{color: 'red', textAlign: 'center', animationName: 'spin', animationTimingFunction: 'linear', animationIterationCount: 'infinite', animationDuration: '5000ms'}}>Email or Password are incorrect!</h1> :
          <div/>
        }
        <Switch>
        {
          isLoggedIn && (<Route path='/home' component={UserPage} />)
        }
        {
          !isLoggedIn && (
            <Route component={Login} />
          )
        }
        <Redirect to='/home' />
      </Switch>
      </div>
    )
  }
};

const mapStateToProps = ({user})=> {
  return {
    isLoggedIn: !!user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(_Main);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
