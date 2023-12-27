// import theo dang common
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
// Cài middleware cho con app, ai được phép truy cập vào link này
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

// middleware xử lý data trên server: người dùng gửi data dạng mảng -> máy tính đổi thành json -> khi lên server thì sẽ được tự động đổi lại thành dạng mảng
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

// Trả về cho người dùng thông tin khi vào trang chủ
// app.use("/", (req, res, next) => res.send("sever on!!!"));

const PORT = process.env.PORT || 3001;
// Trả về console.log ở server
app.listen(5000, () => console.log("::::sever ready::::" + PORT));
