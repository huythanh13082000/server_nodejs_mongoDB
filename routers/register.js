const express = require('express');
const route = express.Router();
const argon2 = require('argon2');
const userModel = require("../models/user");
const otpModel = require("../models/otp");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const sendMail = require("../utils/sendMail")
route.post('/register', async (req, res) => {
          const { email, passWord, verificationCode } = req.body;
          console.log(email, passWord, verificationCode);
          // if (!email || !passWord) {
          //           return res.status(400).json({ success: false, message: "Chưa nhập email or mật khẩu" })
          // }
          try {
                    const user = await userModel.findOne({ email: email });
                    if (user) {
                              return res.json({ success: false, message: "email đã tồn tại", type: 'error' })
                    }
                    else {
                              if (email && !passWord && !verificationCode) {
                                        await sendMail({ email: email })
                                                  .then(async (data) => {
                                                            const findOpt = await otpModel.findOne({ email: email })
                                                            if (findOpt) {
                                                                      await otpModel.updateOne({ _id: findOpt._id }, {
                                                                                code: data
                                                                      })
                                                            }
                                                            else {
                                                                     await otpModel.create({
                                                                                email: email,
                                                                                code: data
                                                                      })

                                                            }
                                                            setTimeout(async () => {
                                                                      await otpModel.deleteOne({ email: email })
                                                            }, 180000)


                                                  })
                              }
                              else {
                                        const checkCode = await otpModel.findOne({ email: email });
                                        if (checkCode.code === verificationCode) {
                                                  const newPassWord = await argon2.hash(passWord);
                                                  const user = await userModel.create({
                                                            email: email,
                                                            passWord: newPassWord,
                                                  })
                                                  await otpModel.deleteOne({ email: email });
                                                  const token = jwt.sign({ userId: user._id }, 'thanhph');
                                                  res.json({ success: true, message: "Tạo tài khoản thành công!", accessToken: token, type: "success" })
                                        }
                                        else res.json({ success: false, message: "Mã xác nhận không đúng!", type: 'error' })

                              }
                    }
          } catch (error) {
          }
})
module.exports = route;