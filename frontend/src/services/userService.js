import client from "./api";

export const updateUserSettings = (data) => client.put('/users/settings', data);
export const getUserProfile = () => client.get('/users/profile');