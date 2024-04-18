import Secretary from "../models/Secretary.js";
import imgToB64 from "./imgToB64.js";
import path from 'path';

export const getDefaultProfpic = async (gender) => {
    const img = gender == 'm' ? 'defaultBoy.jpg' : 'defaultGirl.jpg';
    const imgPath = path.resolve('middlewares', img);
    return await imgToB64(imgPath);
}

export const getTempSecretaryID = async (sName) => {
    return Secretary.findOne({name: sName}, '_id');
}