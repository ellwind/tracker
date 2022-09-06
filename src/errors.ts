import config from './config';

const BadRequestError = (message?: string, details?: any) => ({
  status: config.HTTP_ERRORS.BAD_REQUEST.STATUS,
  message: message || config.HTTP_ERRORS.BAD_REQUEST.MESSAGE,
  details: details || null,
});

export { BadRequestError };
