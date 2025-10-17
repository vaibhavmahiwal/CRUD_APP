import express from 'express';
import Person from '../models/Person.js';
import { jwtAuthMiddleware, generateToken } from '../jwt.js'; // ✅ named imports

const router = express.Router();

// POST route to add a person (Sign Up)
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
      id: response.id,
      username: response.username
    };
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log('Token is : ', token);

    res.status(200).json({ response, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      username: user.username
    };
    const token = generateToken(payload);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log('User Data: ', userData);

    const user = await Person.findById(userData.id);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all persons
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET by work type
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT method to update person
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true
    });

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE method to delete person
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndRemove(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data deleted');
    res.status(200).json({ message: 'Person Deleted Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
