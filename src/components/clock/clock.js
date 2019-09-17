import React, { Component } from 'react';
import './style.css';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
        secondDegrees: {},
        minuteDegrees: {},
        hourDegrees: {}
    }

    this.seconds = 0;
    this.minutes = 0;
    this.hours   =  0; 
    this.clockInterval = null;

    this.updateClock    = this.updateClock.bind(this);
    this.setSecondHand  = this.setSecondHand.bind(this);
    this.setMinuteHand  = this.setMinuteHand.bind(this);
   
  }

  updateClock(time) {

    this.seconds = time.getSeconds();
    this.minutes = time.getMinutes();
    this.hours = time.getHours();
    
    this.setSecondHand();
    this.setMinuteHand();
    this.setHourHand();
  }

  setSecondHand() {
    const degrees = (this.seconds / 60 * 360) + 90;
    this.setState({
        secondDegrees : { transform : `rotate(${degrees}deg)`} 
    })
  }

  setMinuteHand() {
    const degrees = (( this.minutes + this.seconds / 60 ) / 60 * 360) + 90;
    this.setState({
        minuteDegrees : { transform : `rotate(${degrees}deg)`} 
    })
  }

  setHourHand() {
    const degrees = (( this.hours + this.minutes / 60 + this.seconds / 3600 ) / 12 * 360) + 90;
    this.setState({
        hourDegrees : { transform : `rotate(${degrees}deg)`} 
    })
  }

  componentDidMount() {
    if(this.clockInterval===null){
      this.updateClock( new Date() );
      this.clockInterval = setInterval( () => this.updateClock( new Date ), 1000 );
    }
  }

  componentWillUnmount() {
    this.clockInterval = null;
  }

  render() {
    return (
        <div ref={this.element}>
            <div id="clock" ref={this.clock}>
                <div className="top"></div>
                <div className="right"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div id='second-hand' className='hand' style={this.state.secondDegrees}></div>
                <div id='minute-hand' className='hand' style={this.state.minuteDegrees}></div>
                <div id='hour-hand' className='hand' style={this.state.hourDegrees}></div>
            </div>
        </div>
    )
  }
}
