const bcrypt = require("bcrypt");

const hashPassword = async (pwd) => {
    const hashed = await bcrypt.hash(pwd, parseInt(process.env.SALT));
    return hashed;
};

const comparePassword = async (pwd, hashed) => {
    const result = await bcrypt.compare(pwd, hashed);
    return result;
};

module.exports = {
    hashPassword,
    comparePassword,
};
