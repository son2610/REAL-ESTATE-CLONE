import axios from "axios";

export const apiUploadImages = (data) =>
    axios({
        method: "POST",
        url: `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        data,
    });
