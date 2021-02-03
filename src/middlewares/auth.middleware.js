  
const jwt = require('jsonwebtoken'),
  errorConfig = require('../../config/error.config');


module.exports = (req, res, next) => {
  let token = req.headers['authorization'];
  
  if (typeof token === 'undefined') {
    return res.status(401).json({errors: [errorConfig.notAuthorized]}).end();
  }
  
  let bearer = token.split(' ');
  if (bearer[0].toLowerCase() !== 'bearer' || typeof bearer[1] === 'undefined') {
    return res.status(401).json({error: errorConfig.bearerInvalid}).end();
  }

  token = bearer[1];

  return Promise.try(() => {
    return jwt.verify(token, process.env.AUTH_JWT_SECRET)
  }).
  then(token_data => {
    res.locals.userId = token_data.userId;
    return next();
  }).
  catch(jwt.JsonWebTokenError, () => {
    res.status(401).json({error: errorConfig.jsonWebTokenError}).end();
  }).
  catch(jwt.TokenExpiredError, () => {
    res.status(401).json({error: errorConfig.tokenExpiredError}).end();
  }).
  catch(err => next(err));
};
