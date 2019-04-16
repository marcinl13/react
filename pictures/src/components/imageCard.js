import React from "react"


class imageCard extends React.Component {
  constructor(props) {
    super()
    this.imageRef = React.createRef()
    this.state = { spans: 0 }
  }

  render() {
    return (
      <div style={{gridRowEnd: `span ${this.state.spans}`}}>
        <img
          ref={this.imageRef}
          alt={this.props.description}
          src={this.props.src}
        />
      </div>
    )
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpan)
  }

  setSpan = () => {
    const heigth = this.imageRef.current.clientHeight;
    const spans = Math.ceil(heigth / 10);
    this.setState({ spans })
  }
}

export default imageCard