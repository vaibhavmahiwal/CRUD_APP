
import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  email: {
    type: String,      
    required: true,
    unique: true
  },
  address: {
    type: String       
  }
});

// create person model
const Person = mongoose.model('Person', personSchema);
export default Person; // ✅ ES module export
