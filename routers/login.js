const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const argon2 = require('argon2');
router.post('/login', async (req, res) => {
          const { email, passWord } = req.body;
          await userModel.findOne({ email: email })
                    .then(async (data) => {
                              if (data) {
                                        const passWordCheck = await argon2.verify(data.passWord, passWord)
                                        if (passWordCheck)
                                                  res.json({ success: true, message: "Đăng nhập thành công!", type: 'success' })
                                        else res.json({ success: false, message: "Sai email hoặc mật khẩu!", type: "error" })
                              }

                              else res.json({ success: false, message: "Sai email hoặc mật khẩu!", type: "error" })
                    })
                    .catch((err) => {
                              console.log(err);
                    })
})
module.exports = router
