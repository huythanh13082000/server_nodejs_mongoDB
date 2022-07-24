const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
          await mongoose.connect('mongodb://localhost:27017/crud-mongoDB');
}
const userSchema = new mongoose.Schema({
          email: String,
          passWord: String
}
          , {
                    collection: 'Users'
          }
);
const studentSchema = new mongoose.Schema({
          name: String,
          age: Number,
          Users: {
                    type: String,
                    ref: "Users",

          },
}
          , {
                    collection: 'Students'
          }
);
const studentModel = mongoose.model('Students', studentSchema);
studentModel.find({})
.populate("Users")
.then((data) => {
          console.log(data);
})
.catch((err) => {
                    console.log(err);
          })
const userModel = mongoose.model('Users', userSchema);
// userModel.find({})
//           .populate("Students")
//           .then((data) => {
//                     console.log(data);
//           })
//           .catch((err) => {
//                     console.log(err);
//           })
// userModel.create({
//           email: 'lien@gmail4.com',
//           passWord:'444444'
// })
// userModel.updateMany({
//           email: 'Huythanh1308@gmail.com',
//           passWord: '12345'
// }, {
//           email: "lien@gmail4.com",
// }).then((data) => {
//           console.log(data);
// })
//           .catch((err) => {
//                     console.log(err);
//           })
// userModel.deleteOne({
//           passWord:'456'
// })
//           .then((data) => {
//           console.log(data);
//           })
//           .catch((err) => {
//           console.log(err);
// })