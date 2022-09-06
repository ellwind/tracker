import dotenv from 'dotenv';

dotenv.config();

const { HOST, HTML_PORT } = process.env;

const config = {
  cors: {
    credentials: true,
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
    origin: (origin: string, callback) => {
      if (origin && origin.includes(HOST + HTML_PORT)) {
        return callback(false);
      }

      return callback(null, true);
    },
  },
  JSON_LIMIT: '50mb',
  HTTP_ERRORS: {
    BAD_REQUEST: {
      STATUS: 400,
      MESSAGE: 'Bad request',
    },
  },
};

export default config;
