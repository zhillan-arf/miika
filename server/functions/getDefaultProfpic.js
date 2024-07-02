import Assistant from "../models/Assistant.js";
import imgToB64 from "./imgToB64.js";
import path from 'path';

export const getDefaultProfpic = async (gender) => {
    const img = gender == 'm' ? 'defaultBoy.jpg' : 'defaultGirl.jpg';
    const imgPath = path.resolve('functions', img);
    return await imgToB64(imgPath);
}

export const getTempAssistantID = async (sName) => {
    return await Assistant.findOne({name: sName}, '_id');
}