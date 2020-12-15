
module.exports = require("require-directory")(module, {
  include: path => {
    return /routes/.test(path);
  }
});
