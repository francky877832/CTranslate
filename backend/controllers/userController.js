const User = require('../models/userModel');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const JWT_SECRET = 'WINKEL_RANDOM_TOKEN_SECRET'
const generateToken = (userId) => {
    const token = jwt.sign({ userId : userId }, JWT_SECRET, { expiresIn: '7d' });
    return token;
};

function isBcryptHash(pass) {
  const password = pass
  //console.log(password)
  return typeof password === 'string' && password.startsWith('$2') && password.length === 60;
}



async function generateUniqueUsername() {
  const baseName = 'dkb';
  let uniqueUsername = '';
  let isUnique = false;

  while (!isUnique) {
    const randomPart = Math.floor(Math.random() * 100); // entre 0 et 9999999999
    uniqueUsername = `${baseName}${randomPart}`;

    const existingUser = await User.findOne({ username: uniqueUsername });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return uniqueUsername;
}


exports.signupUser = async (req, res, next) => {
  //console.log(req.body)
  const {email, username, password, adminPassword, role, location} = req.body
  console.log(req.body)
  try {
    let user;
    user = await User.findOne({ email: email })
    //console.log(user)
    if(user)
    {
        return res.status(401).json({ error: 'auth/user-already-exists' });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    user = new User({
      email: email,
      password: hash,
      username: await generateUniqueUsername(),
      role : role,
      location:location
    });
    
      if(adminPassword == 'dkbadmin')
      {
        await user.save();
      }
      else
      {
        throw new Error('auth/only-admin-can-register')
      }

    res.status(200).json({ success: true, message: 'auth/user-created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'auth/error-creating-user' });
  }
};

  exports.loginUser =  async (req, res, next) => {
    console.log("LOGIN")

    /*await Accountancy.updateMany(
      { date: { $lt: new Date("2000-01-01T00:00:00.000Z") } }, // Remplace ISODate par new Date
      [{ $set: { date: { $add: ["$date", 100 * 365 * 24 * 60 * 60 * 1000] } } }]
  );*/

  /*
  await Accountancy.updateMany(
    { date: { $type: "date" } },  // Cibler uniquement les documents avec "date" de type Date
    [
      {
        $set: {
          date: "$createdAt"  // Affecter la valeur de "createdAt" à "date"
        }
      }
    ]
  );*/
  

    let validePassword=false;
    
    User.findOne({ email: req.query.email })
        .then( async (user) => {
            if (!user) 
            {
 
                  return res.status(401).json({ error: 'auth/user-not-found--' });
            }
           
      
            if(!isBcryptHash(req.query.password))
            {
              validePassword = await bcrypt.compare(req.query.password, user.password)
            }
            else
            {
              validePassword = req.query.password.toString() === user.password.toString()
            }
              
            if (!validePassword) {
              return res.status(401).json({ error: 'auth/incorrect-password' });
            }
            else
            {
              const token = generateToken(user._id);
              res.status(200).json({ token:token, user : user });
            }  

        })
        .catch(error =>{ 
          console.log(error)
          res.status(500).json({ error })
      });
 };





 
