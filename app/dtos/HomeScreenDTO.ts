interface IHomeScreenDTO {
    id: string;
    displayName?: string;
    mail?: string;
    displayImagePath?: string
}

export const initialUserProfile: IUserDTO = {
    id: "TEST-USER-1",
    displayName: 'Tony Stark',
    mail: "tony.stark@banpu.co.th",
    displayImagePath: 'http://images2.fanpop.com/image/photos/12900000/Tony-Stark-tony-stark-12952978-419-600.jpg'
}

export default IUserDTO;