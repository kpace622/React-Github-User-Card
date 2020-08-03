import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    mygit: [],
    name: [],
    followers: [],
  }

  componentDidMount() {
    fetch('https://api.github.com/users/kpace622')
    .then(res => res.json())
    .then(me => {
      console.log(me)
      this.setState({ ...this.state, mygit: me.avatar_url, name: me.name  });
    })
    .catch(err => console.log(err))

    fetch('https://api.github.com/users/kpace622/followers')
      .then(res => res.json())
      .then(follower => {
        console.log(follower)
        this.setState({ ...this.state, followers: follower });
      })
      .catch(err => console.log(err))
    }

  render () {
    return (
      <div className="App">
        <div className='header'>
          <h1>Github followers</h1>
        </div>

      <div className='my-card'>
        <h2>{this.state.name}</h2>
        <a href='https://github.com/kpace622' target='blank'><img src={this.state.mygit} alt='My github profile'/></a>
      </div>

      <h2>My followers</h2>
          <div className='follower-card'>
            {this.state.followers.map(follower => (
              <>
              <div className='test' key={follower.id}> 
                <a href={follower.html_url} target='blank'><img src={follower.avatar_url} alt='My followers github profiles'/></a>
                <h2 className='login'>{follower.login}</h2>
              </div>
              </>
            ))}
          </div>
      </div>  
  )}
}
export default App;
