import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    mygit: [],
    name: [],
    followers: [],
    search: ''
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

    handleSearch = e => {
      e.preventDefault()
      fetch(`https://api.github.com/users/kpace622/${this.state.search}`)
      .then(res => res.json())
      .then(search => {
        if (search.status !== 'error') {
          this.setState({ ...this.state, search: search})
        }
      })
    };

    handleSearchText = e => {
      this.setState({ ...this.state, search: e.target.value });
    }

  render () {
    return (
      <div className="App">
        <div className='header'>
          <h1>Github followers</h1>
          <form>
            <input
            type='text'
            value={this.state.search}
            placeholder=''
            onChange={this.handleSearch}
            />
            <button onClick={this.handleSearchText}>Search followers</button>
          </form>
        </div>

        <div className='my-card'>
          <h2>{this.state.name}</h2>
          <img src={this.state.mygit} />
        </div>

        <h2>My followers</h2>
            <div className='follower-card'>
              {this.state.followers.map(follower => (
              <img src={follower.avatar_url} />
            ))}
          </div>
      </div>  
  )}
}
export default App;
