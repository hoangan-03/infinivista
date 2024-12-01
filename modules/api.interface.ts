export interface ResponseAPI<Data> {
    status: number;
    message: string;
    data: Data;
    errors?: object; // object can be any key - value pair
}
