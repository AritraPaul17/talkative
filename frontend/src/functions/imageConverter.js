import {Buffer} from 'buffer';
const imageToBase64 = (file)=>{
    const buff = new Buffer(file);
    return buff.toString("base64");
}

export default imageToBase64;