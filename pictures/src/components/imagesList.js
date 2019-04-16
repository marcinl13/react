import React from "react"
import ImageCard from "./imageCard"
import "./imageList.css"

const ImageList = props => {

  const images = props.images.map(({ description, id, urls }) => {
    return <ImageCard key={id} src={urls.regular} description={description} ></ImageCard>
  })

  return <div className="image-list">{images}</div>
}
export default ImageList