interface IUserAuthenticateDTO {
    user: {
        name: string,
        email: string,
        password?: string,
    },
    token: string
}

export default IUserAuthenticateDTO;
