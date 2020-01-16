import _ from 'lodash'
import moment from 'moment'

const MESSAGE = {
  REQUIRED: 'Please specify',
  URGENT: 'Urgent Traveling',
  VALID_DATE: 'valid date'
}

const getFormatDate = (date: any) => {
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ]
}

const validation = (values: any) => {
  console.log('validation', values)
  const errors: any = {}
  if (!_.trim(values.tripObjective)) {
    errors.tripObjective = MESSAGE.REQUIRED
  }
  if (!_.trim(values.travelerName)) {
    errors.travelerName = MESSAGE.REQUIRED
  }
  if (!_.trim(values.trFrom)) {
    errors.trFrom = MESSAGE.REQUIRED
  }
  if (!values.tripDestination.length) {
    errors.tripDestination = MESSAGE.REQUIRED
  }
  if (!values.travelType) {
    errors.travelType = MESSAGE.REQUIRED
  }
  const currentDate = new Date()
  const currentTravellingDate = values.travellingDate.date
  const currentReturnDate = values.returnDate.date

  const diffDay = moment(getFormatDate(currentTravellingDate)).diff(getFormatDate(currentDate), 'days')
  if (!values.travellingDate.isSelected) {
    errors.travellingDate = MESSAGE.REQUIRED
  } else {
    if (diffDay < 7) {
      errors.travellingDate = MESSAGE.URGENT
    }
  }
  const isMoreThanTravellingDate = moment(getFormatDate(currentReturnDate)).diff(getFormatDate(currentTravellingDate), 'days') <= 0
  if (!values.returnDate.isSelected) {
    errors.returnDate = MESSAGE.REQUIRED
  } else {
    if (isMoreThanTravellingDate && values.travellingDate.isSelected) {
      errors.returnDate = MESSAGE.VALID_DATE
    }
  }

  return errors
}
export default validation
