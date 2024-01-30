const generateOrQuery = ({ table, items }) => {
    
  //*: sanitize object
  const sanitizedObject = Object.fromEntries(
    Object.entries(items).filter(([key, value]) => value !== undefined)
  );

  const queries = Object.keys(sanitizedObject);

  if (queries?.length > 0) {
    let qString = `SELECT * FROM ${table}`;

    queries?.map((q, index) => {
      if (index == 0) {
        qString = `${qString} WHERE ${q} = "${sanitizedObject[q]}"`;
      } else {
        qString = `${qString} OR ${q} = "${sanitizedObject[q]}"`;
      }
    });

    return qString;
  } else {
    return `SELECT * FROM ${table}`;
  }
};

module.exports = {
  generateOrQuery,
};
