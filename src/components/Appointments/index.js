// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    count: 0,
    appointmentList: [],
    title: '',
    date: '',
    reqDateFormat: '',
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    // console.log(event.target.value)
    const newDate = event.target.value
    // console.log(format(new Date(newDate), 'dd MMMM yyyy, EEEE'))
    const reqDateFormat = format(new Date(newDate), 'dd MMMM yyyy, EEEE')
    // console.log(reqDateFormat)
    this.setState({reqDateFormat: newDate})
    this.setState({date: reqDateFormat})
  }

  addAppointment = event => {
    event.preventDefault()

    const {appointmentList, title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavourite: false,
    }
    // console.log(newAppointment)
    this.setState(prevState => ({
      appointmentList: [...appointmentList, newAppointment],
      title: '',
      date: '',
      reqDateFormat: '',
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onFilterList = () => {
    const {count, appointmentList} = this.state
    if (count % 2 !== 0) {
      const filteredList = appointmentList.filter(
        eachItem => eachItem.isFavourite === true,
      )
      return filteredList
    }
    return appointmentList
  }

  onChangeIsFavourite = id => {
    // console.log('star triggered')
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFavourite: !eachItem.isFavourite}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {count, appointmentList, title, date, reqDateFormat} = this.state

    // console.log(appointmentList)
    // console.log(title)
    // console.log(date)

    const filteredList = this.onFilterList()
    console.log(filteredList)

    let starButtonDecoration

    if (count % 2 !== 0) {
      starButtonDecoration = 'starred-btn-decoration'
    }
    starButtonDecoration = ''

    return (
      <div className="app-container">
        <div className="card">
          <div className="form-image-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <h1> Add Appointment </h1>
              <div className="title-container">
                <label htmlFor="title"> TITLE </label>
                <input
                  id="title"
                  type="input"
                  className="title"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={title}
                />
              </div>
              <div className="date-container">
                <label htmlFor="date-input"> DATE </label>
                <input
                  type="date"
                  id="date-input"
                  className="date-sec"
                  onChange={this.onChangeDate}
                  value={reqDateFormat}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </form>

            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
          <hr className="line-break" />
          <div className="starred-sec">
            <h1> Appointments </h1>
            <button
              className={`starred-btn ${starButtonDecoration}`}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredList.map(eachItem => (
              <AppointmentItem
                eachAppointment={eachItem}
                key={eachItem.id}
                onChangeIsFavourite={this.onChangeIsFavourite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
