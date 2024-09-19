const validator = require("validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.status = (req, res, next) => {
  const authenticated = req.user ? true : false
  return res.send({
    msg: "Status check",
    auth: authenticated,
    user: req.user._id
  })
}

exports.postLogin = async (req, res, next) => {
      req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
      });
      

      try {
        //check if user exists
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists)
          return res.send({
            status: "error",
            msg: "User does not exist"
        })
    
        // check if password is correct
        const passMatch = await bcrypt.compare(req.body.password, userExists.password)
        if(!passMatch) {
          return res.send({
            status: "error",
            msg: "Incorrect password"
          })
        }
        
    
        // Generate access token
        const accessToken = jwt.sign(
            {
              id: userExists._id,
            },
            "secret",
            { expiresIn: "1d" }
          )

          const token = accessToken;
          res.cookie('token', token, { 
            maxAge: 1000 * 60 * 60 * 24, // expire after 1 day
            httpOnly: true, // unexposed to client side code
            sameSite: "none", // If client and server origins are different
            secure: true,
           });
        
        return res.send({
                status: "sucess",
                msg: "Success! You are now logged in:)",
              });
      } catch (error) {
        return res.send({
          status: "error",
          msg: "User does not exist",
          err: error
          })
        
      }
};

exports.postLogout = async (req, res)=> {
  req.logout((err)=> {
    if (err) { 
      return res.send({
        status: "error",
        msg: err
      })
     }
     
    res.header("Clear-Site-Data", '"cookies"');
    return res.send({
      status: 'success',
      msg: 'You have been logged out'
    })
  });
};

exports.postSignup = async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });

    if (validationErrors.length) {
      console.log(validationErrors)
      
      return res.send({
        status: "error",
        msg: validationErrors[0].msg
      });
    } else {
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });

        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        });

        const data = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] })
        if (data) {
         return res.send({
          status: "error",
          msg: "Account with that email address or username already exists."
          });
        } else {
            const newAccount = await user.save()

            // generate access token
            const accessToken = jwt.sign(
              { 
                id: newAccount._id,
              },
              "secret",
              { 
                expiresIn: "1d",
               }
            )
          
            const token = accessToken;
            res.cookie('token', token, { 
              maxAge: 1000 * 60 * 60 * 24, // expire after 1 day
              httpOnly: true, // unexposed to client side code
              sameSite: "none", // If client and server origins are different
              secure: true,
             });
            
            return res.send({
              status: "success",
              msg: "Account created successfully!",
              loggedin: req.user
              });
          }

    }
};