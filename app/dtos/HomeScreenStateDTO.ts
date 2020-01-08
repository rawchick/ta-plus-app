import ITripDTO from './TripDTO'

interface IHomeScreenStateDTO {
    trips: [ITripDTO] | []
    total: number
}

export default IHomeScreenStateDTO;