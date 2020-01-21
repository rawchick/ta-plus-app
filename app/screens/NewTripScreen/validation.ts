import _ from 'lodash'
import moment from 'moment'

const MESSAGE = {
  REQUIRED: 'Please specify',
  URGENT: 'Urgent Traveling',
  VALID_DATE: 'Please specify/A travelling date should before returned date'
}

const getDiffFormatDate = (date: any) => {
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ]
}

const validation = (values: any) => {
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
  const travellingDateDiffFormat = getDiffFormatDate(currentTravellingDate)
  const retureDateDiffFormat = getDiffFormatDate(currentReturnDate)
  const currentDateDiffFormat = getDiffFormatDate(currentDate)

  const diffDay = moment(travellingDateDiffFormat).diff(currentDateDiffFormat, 'days')
  const isMissMatchDate = moment(retureDateDiffFormat).diff(travellingDateDiffFormat, 'days') <= 0

  if (!values.travellingDate.isSelected) {
    errors.travellingDate = MESSAGE.REQUIRED
  } else {
    if (isMissMatchDate && values.returnDate.isSelected) {
      errors.travellingDate = MESSAGE.VALID_DATE
    } else if (diffDay < 7) {
      errors.travellingDate = MESSAGE.URGENT
    }
  }

  if (!values.returnDate.isSelected) {
    errors.returnDate = MESSAGE.REQUIRED
  } else {
    if (isMissMatchDate && values.travellingDate.isSelected) {
      errors.returnDate = MESSAGE.VALID_DATE
    }
  }

  return errors
}
export default validation
