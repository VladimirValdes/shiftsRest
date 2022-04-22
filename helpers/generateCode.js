
const generateId = () => {
    return Date.now().toString(35) + Math.random().toString(35).substring(2);
}

module.exports = generateId;