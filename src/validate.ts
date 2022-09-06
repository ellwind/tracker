import Joi from 'joi';

const schema = Joi.object({
  event: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).min(0).optional(),
  url: Joi.string().required(),
  title: Joi.string().required(),
  ts: Joi.string().required(),
});

const validate = (data: any[]) => {
  const errors = [];
  data?.forEach((data) => {
    const { error } = schema.validate(data);
    if (error) {
      errors.push(error);
    }
  });
  return errors;
};

export default validate;
