export interface IAuthToken {
    access_token: string;
    refresh_token: string;
}

export interface ILoginRequest {
    identifier: string;
    password: string;
}

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
}
