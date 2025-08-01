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

export const authTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  req.apifyToken = token;
  next();
};
