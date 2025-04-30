import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schemaLogin = yup.object().shape({
    identifier: yup.string().required('Identifier is required'),
    password: yup.string().required('Password is required'),
});

const schemaRegister = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/(?=.*[0-9!@#$%^&*(),.?":{}|<>])/, 'Password must contain at least one number or special character'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export const loginResolver = yupResolver(schemaLogin);
export const registerResolver = yupResolver(schemaRegister);
