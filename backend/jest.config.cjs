module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  rootDir: '',
  testRegex: ['.*\.step\.js$'],  
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',  
  },
  setupFilesAfterEnv: ['./setupTests.js'],  
};
