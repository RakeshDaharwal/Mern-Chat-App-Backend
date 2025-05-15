const User = require('../Model/userSchema');
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')



const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    console.log(req.body);

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'Email Already Exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const data = new User({
            name,
            email,
            password: hashPassword
        });



        await data.save();

        return res.status(201).json({ message: 'User Registered Successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Something Went Wrong' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);


    try {
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: 'User Not Registered' });
        }

        const matchPassword = await bcrypt.compare( password, userExist.password)


        if (!matchPassword) {
            return res.status(400).json({ message: 'Password Incorrect' });
        }

        const token = Jwt.sign({
            userId: userExist._id
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3d' }

        )

console.log('token', token)


        return res.status(201).json({ message: 'User Login Successfully', token });
    } catch (err) {
        return res.status(500).json({ message: 'Something Went Wrong' });
    }
};


const userDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the user details by ID (exclude password)
    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};



const allUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    // Find all users except the current user and exclude password field
    const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


module.exports = { registerUser, loginUser, userDetails, allUsers };
