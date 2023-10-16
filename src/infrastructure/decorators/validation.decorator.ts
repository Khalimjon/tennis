import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

// Validation decorator function
function Validation(schema: Schema, source: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        // Get the method name
        const methodName = propertyKey;

        // Determine the data source based on the 'source' parameter
        let data: any;

        if (source === 'body') {
          data = req.body;
        } else if (source === 'params') {
          data = req.params;
        } else if (source === 'query') {
          data = req.query;
        } else {
          return res.status(400).json({ error: 'Invalid validation source' });
        }

        // Validate the data against the schema
        const { error } = schema.validate(data);

        if (error) {
          const errorMessage = error.details.map((detail) => detail.message).join(', ');
          return res.status(400).json({ error: errorMessage, methodName });
        }

        // Call the original controller method
        await originalMethod.call(this, req, res, next);
      } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  };
}

export const Validate = Validation;
