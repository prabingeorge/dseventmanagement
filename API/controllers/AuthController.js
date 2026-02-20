import { Op } from 'sequelize';
import model from '../models/index.cjs';

// import { registerSchema } from "../validators/auth.js";

const { User } = model;

export default {
  async signUp(req, res) {
    // const { error } = registerSchema.validate(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message });
    
    const {name, email, phone, password, status} = req.body;
    try {
      const user = await User.findOne({where: {[Op.or]: [ {phone}, {email} ]}});
      if(user) {
        return res.status(422)
        .send({message: 'User with that email or phone already exists'});
      }

      // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        status,
      });

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });
  
      res.status(201).json({
        token,
        user: { name: name, email: email }
      });

      // return res.status(201).send({message: 'Account created successfully'});
    } catch(e) {
      console.log(e);
      return res.status(500)
      .send(
        {message: 'Could not perform operation at this time, kindly try again later.'});
    }
  }
}
