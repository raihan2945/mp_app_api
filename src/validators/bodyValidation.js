const Joi = require("joi");

// Function to dynamically build the query schema based on included properties and their required status
function buildBodySchema(properties) {
  const baseSchema = {
    work_area: Joi.number().required(),
  };

  properties.forEach(
    ({ name, type, required, properties: nestedProperties }) => {
      let propertySchema;

      switch (type) {
        case "number":
          if (name == "mobile_number" || name == "whatsapp") {
            //* : CHECKING MOBILE OR WHATSAPP 10 DIGIT

            propertySchema = Joi.number()
              .custom((value, helpers) => {
                const stringValue = value.toString();

                if (stringValue.length !== 10) {
                  return helpers.error("number.minDigits", { minDigits: 11 });
                }

                return value;
              }, "Minimum number of digits: 11")

              .messages({
                "number.minDigits": `${name} must be {{#minDigits}} digit`,
              });
          } else {
            propertySchema = Joi.number();
          }
          break;

        case "string":
          propertySchema = Joi.string();
          break;

        case "email":
          propertySchema = Joi.string().email();
          break;

        case "object":
          if (nestedProperties) {
            propertySchema = buildQuerySchema(nestedProperties);
          } else {
            propertySchema = Joi.object();
          }
          break;

        case "array":
          if (items && items.length > 0) {
            propertySchema = Joi.array().items(buildQuerySchema(items));
          } else {
            propertySchema = Joi.array();
          }
          break;

        // Add more types as needed

        default:
          propertySchema = Joi.any();
      }

      baseSchema[name] = required ? propertySchema.required() : propertySchema;
    }
  );

  return Joi.object(baseSchema).custom((value, helpers) => {
    return value;
  });
}

module.exports = buildBodySchema;
