import React, { Component } from 'react'
import Calendar from './Calendar'
import PropTypes from 'prop-types'

class DateInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showCalendar: false,
      date: this.props.date
    }
  }
  render () {
    return (<form className='dateInput-container'>
      <input type='text' value={this.state.date}
        onFocus={e => (this.setState({ showCalendar: true }))}
        onChange={e => (this.setState({ date: e.target.value }))}
      />
      <Calendar
        date={this.state.date}
        containerStyle={{
          display: this.state.showCalendar ? 'block' : 'none',
          position: 'absolute',
          top: '33px',
          left: 0
        }}
        onDateChange={date => (this.setState({ date: date.dateString, showCalendar: false }))}
      />
    </form>)
  }
}

Calendar.propTypes = {
  date: PropTypes.string
}

DateInput.defaultProps = {
  date: null
}

module.exports = DateInput
