import {BaseEntity} from '../common.interface';
import {CallStatus} from './calling.enum';

export interface UserReference {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
}

export interface ICallHistory extends BaseEntity {
    call_id: string;
    start_time: Date;
    end_time?: Date;
    accepted_at?: Date;
    status: CallStatus;
    caller: UserReference;
    receiver: UserReference;
}

export interface ICreateCallRequest {
    receiverId: string;
}

export interface ICreateCallResponse {
    call_id: string;
    start_time: Date;
    status: CallStatus;
    caller: UserReference;
    receiver: UserReference;
}

export interface IUpdateCallStatusRequest {
    call_id: string;
    status: CallStatus;
}
