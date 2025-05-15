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




module.exports = { registerUser, loginUser };
