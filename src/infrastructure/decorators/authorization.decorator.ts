import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../services';

function Authorization(...roles: string[]) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      // Get the authorization token from the request header
      const token = req.header('Authorization');

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      try {
        // Verify and decode the token
        const sourceBearerToken = token.split(' ')[1];
        const decodedToken = new TokenService().setToken(sourceBearerToken).verify();

        // Check if the decodedToken role is included in the allowed roles
        const userRole = (decodedToken as { role: string }).role;

        if (!roles.includes(userRole)) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = decodedToken;
        // If authorized, call the original controller method
        return originalMethod.call(this, req, res, next);
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    };

    return descriptor;
  };
}

export const Auth = Authorization;
