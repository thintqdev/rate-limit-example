const express = require("express");
const app = express();
const port = 3000;
const rateLimit = require("express-rate-limit");
const db = require('./db')
const bodyParser = require("body-parser");
const User = require('./user.model');
db.connect(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rateLimit({
    windowMs:  60 * 1000, // 10 minutes
    max: 5,
    message: 'Bạn đã nhập sai quá 5 lần, vui lòng thử lại sau 1 phút',
    headers: true
}))

app.post('/login', async (req, res) =>{
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username, password });
        if(!user){
            res.status(401).send('Sai tên đăng nhập hoặc mật khẩu');
        }
        else{
            res.status(200).send(user);
        }
    }catch(err){
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });