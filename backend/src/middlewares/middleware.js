// export function authTokenMiddleware(req, res, next) {
//   console.log("inside middleware");
//   console.log("req.headers", req.headers);
//   console.log("request",req)
//   const authHeader = req.headers['authorization'];
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Missing or invalid Authorization header' });
//   }
//   const token = authHeader.replace(/^Bearer\s+/, '');
//   if (!token) {
//     return res.status(401).json({ error: 'No API token provided' });
//   }
//   req.apifyToken = token;
//   next();
// }

export function authTokenMiddleware(req, res, next) {
  console.log("inside middleware");
  console.log("req.headers", req.headers);
  
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  
  const token = authHeader.replace(/^Bearer\s+/, '');
  if (!token) {
    return res.status(401).json({ error: 'No API token provided' });
  }
  
  // Store the user's API key for use in route handlers
  req.apifyToken = token;
  next();
}