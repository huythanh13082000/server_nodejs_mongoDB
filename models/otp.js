const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
          await mongoose.connect('mongodb://localhost:27017/crud-mongoDB');
}
const otpSchema = new mongoose.Schema({
          email: String,
          code: String,
          createAt: {
                    type: Date,
                    default: Date.now(),
          },
}
          , {
                    collection: 'otps'
          }
);
module.exports = mongoose.model('otps', otpSchema);
