import React from "react"
import Searchbar from "./Searchbar"
import unsplash from "./unsplash.js"
import VideoItem from "./Videos"

class App extends React.Component {

  state = { videos: []}

  onSearchSubmit = async (term) => {
    const response = await unsplash.get("/search/", {
      params: {
        q: term,
        part: 'snippet',
        key: 'AIzaSyAlTic6doXb4TRbEv5MuFNVXnU0GK78TSw',
        maxResults: 5,
        type: 'video'
      }
    })

    this.setState({ videos: response.data.items })
  }

  onHandleClick = video => {
    console.log('this is:');
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearchSubmit}></Searchbar>

        <iframe id="mainVideo" className="video w100" width="640" height="360" src="" title="k" key="k" alt='k'></iframe>

        <VideoItem videos={this.state.videos} onHandleClick={this.onHandleClick}></VideoItem>

      </div>
    )
  }
}

export default App