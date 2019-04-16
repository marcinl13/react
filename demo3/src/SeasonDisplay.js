import './seasonDisplay.css'
import React from 'react'


const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter'
  }
  else {
    return lat > 0 ? 'winter' : 'summer'
  }
}

const seasonConfig = {
  summer: {
    text: "too hot",
    icon: "sun"
  },
  winter: {
    text: "too frosty",
    icon: "snowflake"
  }
}

const SeasonDisplay = (props) => {
  const season = getSeason(props.lat, new Date().getMonth())
  const { text, icon} = seasonConfig[season]

  return (
    <div className={`seasonContainer ${season}`}>
      <i className={`icon-left ${icon} icon huge`} />
      <h1>{text}</h1>
      <i className={`icon-right ${icon} icon huge`} />
    </div>
  )
}

export default SeasonDisplay