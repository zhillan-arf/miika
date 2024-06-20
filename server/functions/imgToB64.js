import sharp from 'sharp';

const imgToB64 = async (imgPath) => {
    try {
        const buffer = await sharp(imgPath)
            .resize(40, 40)
            .composite([{
                input: Buffer.from('<svg><circle cx="20" cy="20" r="20" /></svg>'),
                blend: 'dest-in'
            }])
            .png()
            .toBuffer();
            
        return buffer.toString('base64');

    } catch (err) {
        console.error(`Img load error: ${err}`);
    }
}

export default imgToB64;