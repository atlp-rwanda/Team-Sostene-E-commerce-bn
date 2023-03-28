import { v2 as Cloudinary } from 'cloudinary';

Cloudinary.config(process.env.CLOUDINARY_URL);

export default Cloudinary;
