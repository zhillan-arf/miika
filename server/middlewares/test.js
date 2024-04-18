import sharp from 'sharp';
import fs from 'fs';

const getDefaultProfpic = async (gender) => {
    const filePath = gender == 'm' ? './defaultBoy.jpg' : 'defaultGirl.jpg';
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.log(`File does not exist: ${filePath}`);
        } else {
          console.log(`File exists: ${filePath}`);
        }
      });

    const buffer = await sharp(filePath)
        .resize(40, 40)
        .composite([{
            input: Buffer.from('<svg><circle cx="20" cy="20" r="20" /></svg>'),
            blend: 'dest-in'
        }])
        .toBuffer();
        
    console.log(buffer.toString('base64'));
}

getDefaultProfpic('m');