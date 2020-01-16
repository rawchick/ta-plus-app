import _ from 'lodash'
import moment from 'moment'

const MESSAGE = {
  REQUIRED: 'Please specify'
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
  const currentTravellingDate = values.travellingDate
  const currentRetureDate = values.returnDate

  const diffDay = moment(currentTravellingDate).diff(currentDate, 'days')
  if (diffDay < 7) {
    errors.travellingDate = 'Urgent Traveling'
  }
  const isMoreThanTravellingDate = moment(currentRetureDate).diff(currentTravellingDate, 'days') <= 0
  if (isMoreThanTravellingDate) {
    errors.returnDate = 'fail date'
  }
  return errors
}
export default validation
