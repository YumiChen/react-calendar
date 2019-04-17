import { i18n } from '../utils.js'
import PropTypes from 'prop-types'

export default class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this.months = [
      i18n('jan', this.props.lang),
      i18n('feb', this.props.lang),
      i18n('mar', this.props.lang),
      i18n('apr', this.props.lang),
      i18n('may', this.props.lang),
      i18n('jun', this.props.lang),
      i18n('jul', this.props.lang),
      i18n('aug', this.props.lang),
      i18n('sep', this.props.lang),
      i18n('oct', this.props.lang),
      i18n('nov', this.props.lang),
      i18n('dec', this.props.lang)
    ]
    this.weekdays = [
      i18n('su', this.props.lang),
      i18n('mo', this.props.lang),
      i18n('tu', this.props.lang),
      i18n('we', this.props.lang),
      i18n('th', this.props.lang),
      i18n('fr', this.props.lang),
      i18n('sa', this.props.lang)
    ]

    this.state = {
      mode: 3, // 3: select date, 2: select month, 1: select year

      startYearForDisplay: null,
      year: null,
      month: null, // 0-based
      date: null,

      firstWeekDay: null, // 0-based, 0 is Sunday, 1 is Monday... etc.
      dayNum: null
    }
  }
  render () {
    // if this.state.year is falsy, then initial date is not set yet
    if (!this.state.year) { return null }

    return (
      <div className="react-calendar" style={this.props.containerStyle}>
        {this.loadToolbar()}
        {this.loadContent()}
      </div>
    )
  }
  componentDidMount () {
    if (this.props.date) { this.setDataWithISOString(this.props.date) } else { this.setInitDate() }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.date !== this.props.date) {
      this.setDataWithISOString(this.props.date)
    }
  }
    setInitDate = () => {
      const date = new Date()
      this.setState({
        year: date.getFullYear(),
        startYearForDisplay: date.getFullYear() - date.getFullYear() % 10,
        month: date.getMonth(),
        date: null,
        dayNum: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
        firstWeekDay: new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      })
    }
    setDataWithISOString (ISOString) {
      try {
        const regex = /([012]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        if (typeof ISOString !== typeof '' || !regex.test(ISOString)) {
          throw new TypeError('date props format is invalid, it should be string and in format "YYYY-MM-DD"')
        }
        const dateData = ISOString.split('-')
        this.setState({
          year: +dateData[0],
          startYearForDisplay: +dateData[0] - +dateData[0] % 10,
          month: +dateData[1] - 1,
          date: +dateData[2],
          dayNum: new Date(+dateData[0], +dateData[1], 0).getDate(),
          firstWeekDay: new Date(+dateData[0], +dateData[1] - 1, 1).getDay()
        })
      } catch (err) {
        console.error(error.message)
        this.setInitDate()
      }
    }

    loadToolbar = () => {
      switch (this.state.mode) {
        case 1:
          return (
            <p className="toolbar" style={this.props.toolbarContainerStyle}>
              <span
                onClick={() => {
                  this.setState({
                    startYearForDisplay: this.state.startYearForDisplay - 10
                  })
                }}
                className="prev">{'<'}</span>
              <span className='toolbar-center'>{`${this.state.startYearForDisplay}-${this.state.startYearForDisplay + 9}`}</span>
              <span
                onClick={() => {
                  this.setState({
                    startYearForDisplay: this.state.startYearForDisplay + 10
                  })
                }}
                className="next">{'>'}</span>
            </p>
          )
        case 2:
          return (
            <p className="toolbar" style={this.props.toolbarContainerStyle}>
              <span
                onClick={this
                  .setYearWithPayload
                  .bind(null, -1)}
                className="prev">{'<'}</span>
              <span
                onClick={() => (this.setState({
                  mode: this.state.mode - 1
                }))}
                className='toolbar-center'>{this.state.year}</span>
              <span
                onClick={this
                  .setYearWithPayload
                  .bind(null, 1)}
                className="next">{'>'}</span>
            </p>
          )
        case 3:
          return (
            <p className="toolbar" style={this.props.toolbarContainerStyle}>
              <span onClick={this.changeToPrevMonth} className="prev">{'<'}</span>
              <span
                onClick={() => (this.setState({
                  mode: this.state.mode - 1
                }))}
                className='toolbar-center'>{`${this.months[this.state.month]} ${this.state.year}`}</span>
              <span onClick={this.changeToNextMonth} className="next">{'>'}</span>
            </p>
          )
        default:
      }
    }
    loadContent = () => {
      switch (this.state.mode) {
        case 1:
          const years = []

          for (let i = 0; i < 12; i++) {
            let year = this.state.startYearForDisplay + i - 1
            years.push(
              <span
                className={this.state.year === year
                  ? 'selected year'
                  : 'selectable year'}
                onClick={() => {
                  this.setYear(this.state.startYearForDisplay + i - 1)
                  this.setState({ mode: 2 })
                }}>{year}</span>
            )
          }
          return (
            <div>
              {years}
            </div>
          )
        case 2:
          return (
            <div>
              {this
                .months
                .map((data, i) => {
                  return <span
                    key={i}
                    className={i === this.state.month
                      ? 'selected month'
                      : 'selectable month'}
                    onClick={() => {
                      this.setMonth(new Date(this.state.year, i, 1))
                      this.setState({ mode: 3 })
                    }}>{data}</span>
                })}
            </div>
          )
        case 3:
          return (
            <div>
              <p className="weekdays" style={this.props.weekdaysContainerStyle}>{this
                .weekdays
                .map((day, index) => {
                  return (
                    <span key={index}>{day}</span>
                  )
                })}</p>
              <p
                className="days"
                style={{
                  ...this.props.daysStyle
                }}>{this.loadDays()}</p>
            </div>
          )
        default:
      }
    }
    loadDays = () => {
      const days = []

      const lastDayNum = new Date(this.state.year, this.state.month, 0).getDate()

      const isCurrentMonth = this.state.month === new Date().getMonth() && this.state.year === new Date().getFullYear()
      const todayDate = new Date().getDate()

      var counter = 0
      for (let i = 0; i < 42; i++) {
        let num
        let notInthisMonth = false
        if (i < this.state.firstWeekDay) {
          num = lastDayNum - this.state.firstWeekDay + i + 1
          notInthisMonth = true
        } else if (i >= this.state.firstWeekDay && i < this.state.dayNum + this.state.firstWeekDay) {
          num = ++counter
        } else {
          num = ++counter % this.state.dayNum
          notInthisMonth = true
        }

        let isToday = isCurrentMonth
          ? num === todayDate
          : false

        days.push(
          <span
            key={i}
            className={notInthisMonth
              ? 'notInThisMonth day'
              : (num === this.state.date && !notInthisMonth
                ? 'selected day'
                : isToday
                  ? 'today selectable day'
                  : 'selectable day')}
            onClick={notInthisMonth
              ? () => {}
              : this
                .setDate
                .bind(null, num)}>{num}</span>
        )
      }
      return days
    }

    setMonth = (date, noCallback) => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      const dayNum = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

      this.setState({
        year: date.getFullYear(),
        startYearForDisplay: date.getFullYear() + (date.getFullYear() % 10),
        month: date.getMonth(),
        firstWeekDay: firstDay.getDay(),
        dayNum
      }, () => {
        if (typeof this.props.onMonthChange === typeof function () {} && !noCallback) {
          this
            .props
            .onMonthChange(this.getDateDateOfCalendar())
        }
      })
    }
    changeToPrevMonth = () => {
      let prevMonth = this.state.month - 1

      this.setMonth(new Date(prevMonth < 0
        ? this.state.year - 1
        : this.state.year, prevMonth < 0
        ? prevMonth + 12
        : prevMonth), true)
    }
    changeToNextMonth = () => {
      let nextMonth = this.state.month + 1

      this.setMonth(new Date(nextMonth >= 12
        ? this.state.year + 1
        : this.state.year, nextMonth >= 12
        ? 0
        : nextMonth), true)
    }
    setDate = date => {
      this.setState({
        date
      }, () => {
        if (typeof this.props.onDateChange === typeof function () {}) {
          this
            .props
            .onDateChange(this.getDateDateOfCalendar())
        }
      })
    }
    setYear = year => {
      this.setState({
        year,
        startYearForDisplay: year - year % 10
      }, () => {
        if (typeof this.props.onYearChange === typeof function () {}) {
          this
            .props
            .onYearChange(this.getDateDateOfCalendar())
        }
      })
    }
    setYearWithPayload = payload => {
      this.setState({
        year: this.state.year + payload,
        startYearForDisplay: this.state.year + payload - ((this.state.year + payload) % 10)
      })
    }
    getDateDateOfCalendar = () => {
      const month = this.state.month !== null
        ? this.state.month + 1 > 10
          ? this.state.month + 1
          : '0' + (this.state.month + 1)
        : '00'
      const date = this.state.date !== null
        ? this.state.date > 10
          ? this.state.date
          : '0' + this.state.date
        : '00'

      return {
        year: this.state.year,
        month: this.state.month + 1, // 0-based to 1-based
        date: this.state.date,
        ISOString: `${this.state.year}-${month}-${date}`
      }
    }
}

Calendar.propTypes = {
  date: PropTypes.string,
  containerStyle: PropTypes.object,
  weekdaysContainerStyle: PropTypes.object,
  toolbarContainerStyle: PropTypes.object,
  onYearChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  onDateChange: PropTypes.func,
  lang: PropTypes.string
}

Calendar.defaultProps = {
  date: null,
  containerStyle: {},
  weekdaysContainerStyle: {},
  toolbarContainerStyle: {},
  onYearChange: () => {},
  onMonthChange: () => {},
  onDateChange: () => {},
  lang: null
}
