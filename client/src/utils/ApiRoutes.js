export const HOST = "http://localhost:3939";

const AUTH_ROUTE = `${HOST}/auth`;
const MESSAGE_ROUTE = `${HOST}/message`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/checkUser`;
export const REGISTER_USER = `${AUTH_ROUTE}/registerUser`;
export const GET_ALL_CONTACT = `${AUTH_ROUTE}/`;
export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/`;
export const GET_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/load`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-image-message`;
export const GET_INITIAL_CONTACTS = `${MESSAGE_ROUTE}/get-initial-contacts`;
export const GET_NOTIFICATION_2USERS = `${MESSAGE_ROUTE}/getNotification2Users`;
