module.exports = require('@babel/preset-react');

// jest.config.js
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};

module.exports = {
    "testEnvironment": "jsdom"
}
