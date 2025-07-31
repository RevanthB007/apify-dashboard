export function authTokenMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.replace(/^Bearer\s+/, '');
  if (!token) {
    return res.status(401).json({ error: 'No API token provided' });
  }
  req.apifyToken = token;
  next();
}