import axios from "~/axios";

export const apiCreateNewPropertyType = (data) =>
    axios({
        url: "/property-type/",
        method: "post",
        data,
    });

export default apiCreateNewPropertyType;
