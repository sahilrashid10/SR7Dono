import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String},
  username: { type: String, required:true},
  profilepic: { type: String },
  coverpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
