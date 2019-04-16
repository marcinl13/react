import React from "react"

const VideoList = props => { 
  console.log(props)
  const video = props.videos.map(({ snippet, videoId, etag }) => {
    return (
      <div key={etag} id={etag} className="ui relaxed divided list" >
        <div className="item">
          <img className="ui small image" src={snippet.thumbnails.default.url} />
          <div className="content">
            <a className="header">{snippet.title}</a>
            <div className="description">{snippet.publishedAt}</div>
          </div>
        </div>
      </div>
    )

  })

  return <div>{video}</div>
}

export default VideoList