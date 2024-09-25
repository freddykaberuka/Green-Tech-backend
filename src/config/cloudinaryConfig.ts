import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'coldrooms',
            format: ['png', 'jpg'],
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            transformation: [{ width: 500, height: 500, crop: 'limit' }]
        };
    }
});

export { cloudinary, storage };
