import React, { Component } from 'react';
import './style.css';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        secondDegrees: {},
        minuteDegrees: {},
        hourDegrees: {}
    }
  }

  updateClock = (time) =>  {
    this.setState({
      seconds: time.getSeconds(),
      minutes: time.getMinutes(),
      hours: time.getHours()
    })
    
    this.setSecondHand();
    this.setMinuteHand();
    this.setHourHand();
  }

  setSecondHand = () => {
    const degrees = (this.state.seconds / 60 * 360) + 90;
    this.setState({
        secondDegrees : { transform : `rotate(${degrees}deg)`} 
    })
  }

  setMinuteHand = () => {
    const degrees = (( this.state.minutes + this.state.seconds / 60 ) / 60 * 360) + 90;
    this.setState({
        minuteDegrees : { transform : `rotate(${degrees}deg)`} 
    })
  }

  setHourHand = () => {
    const degrees = (( this.state.hours + this.state.minutes / 60 + this.state.seconds / 3600 ) / 12 * 360) + 90;
    this.setState({
        hourDegrees : { transform : `rotate(${degrees}deg)`} 
    })
  }

  componentDidMount() {
      setInterval( () => this.updateClock( new Date ), 1000 );
  }

  render() {
    return (
      <div id="clock" ref={this.clock}>
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div id='second-hand' className='hand' style={this.state.secondDegrees}></div>
          <div id='minute-hand' className='hand' style={this.state.minuteDegrees}></div>
          <div id='hour-hand' className='hand' style={this.state.hourDegrees}></div>
      </div>
    )
  }
}
