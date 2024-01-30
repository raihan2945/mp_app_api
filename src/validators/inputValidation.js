const Joi = require("joi");
const { sequelize } = require("@/src/model");

// Function to dynamically build the query schema based on included properties and their required status
function inputSchema(properties, requiredProp) {
  const totalValues = [];

  const baseSchema = {
    // work_area: Joi.number().required(),
  };

  properties.forEach(
    ({
      name,
      type,
      required,
      properties: nestedProperties,
      items,
      item_type,
    }) => {
      if (requiredProp && requiredProp.values[name]) {
        totalValues.push(requiredProp.values[name]);
      }

      let propertySchema;
      switch (type) {
        case "number":
          if (
            name == "mobile_number" ||
            name == "mobile" ||
            name == "whatsapp"
          ) {
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
          if (Array.isArray(items) && items.length > 0) {
            if (item_type == "string") {
              propertySchema = Joi.array().items(Joi.string());
            } else if (item_type == "object") {
              propertySchema = Joi.array().items(Joi.object());
            } else {
              propertySchema = Joi.array().items(Joi.number());
            }
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

  
  //* : REQUIRED MINIMUM COUNT & CHECKING
  if (requiredProp) {
    console.log("required total : ",requiredProp.min, totalValues);
    if (totalValues.length < requiredProp.min) {
      const lastObject = properties[properties.length - 1];
      baseSchema[lastObject.name] = baseSchema[lastObject.name]
        .required()
        .messages({ "any.required": `Minimum One data is required` });
    }
  }

  // console.log("base schema is : ", baseSchema);

  return Joi.object(baseSchema).custom((value, helpers) => {
    return value;
  });
}

module.exports = inputSchema;
