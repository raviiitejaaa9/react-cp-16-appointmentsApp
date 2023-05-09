// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onChangeIsFavourite} = props
  const {id, title, date, isFavourite} = eachAppointment

  const onClickStar = () => {
    onChangeIsFavourite(id)
  }
  const emptyStarSrc =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const fullStarSrc =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const reqSrc = isFavourite ? fullStarSrc : emptyStarSrc

  return (
    <li className="list-item">
      <div className="title-container1">
        <p> {title} </p>
        <button data-testid="star" className="star-btn" onClick={onClickStar}>
          <img className="star" src={reqSrc} alt="star" />
        </button>
      </div>
      <div>
        <p> Date: {date} </p>
      </div>
    </li>
  )
}
AppointmentItem.defaultProps = {
  title: 'Python',
  date: '22/22/23',
}

export default AppointmentItem
