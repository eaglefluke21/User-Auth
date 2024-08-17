import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    
    console.log('cook', req.cookies);
  const token = req.cookies.token; 
  console.log(JSON.stringify(req.cookies));


  if (!token) {
    console.log('token value', token);
      return res.sendStatus(403); 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('token value verify', token);
          return res.sendStatus(403);
      }
      req.user = user; 
      next();
  });
};

export default authenticateJWT;