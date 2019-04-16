import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './spinner'

class App extends React.Component {

  state = { lat: null, errMsg: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => { this.setState({ lat: position.coords.latitude }) },
      err => { this.setState({ errMsg: err.message }) }
    )
  }

  render() {
    if (this.state.errMsg && !this.state.lat) {
      return <div>        Error {this.state.errMsg}      </div>
    }
    if (!this.state.errMsg && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner message="Loading"/>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
