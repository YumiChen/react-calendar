import React from 'react'
import Calendar from './Calendar'
import DateInput from './DateInput'

const App = (props) => {
  return (
    <div>
      <Calendar
        containerStyle={{
          margin: '10px'
        }}
        onMonthChange={data => {
          console.log(data)
        }}
        onYearChange={data => {
          console.log(data)
        }}
        onDateChange={data => {
          console.log(data)
        }}/>
      <Calendar
        lang="en"
        containerStyle={{
          margin: '10px'
        }}
        date="2019-03-06"
        onMonthChange={data => {
          console.log(data)
        }}
        onYearChange={data => {
          console.log(data)
        }}
        onDateChange={data => {
          console.log(data)
        }}/>
      <Calendar
        lang="ja"
        containerStyle={{
          margin: '10px'
        }}
        onMonthChange={data => {
          console.log(data)
        }}
        onYearChange={data => {
          console.log(data)
        }}
        onDateChange={data => {
          console.log(data)
        }}/> {/* <DateInput/> */}
    </div>
  )
}

module.exports = App
