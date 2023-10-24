import { incrementTotalLength, getTotalLength, resetTotalLength } from './src/module/movieCounter.js'; // Replace 'yourModule' with the actual module path

// Test case to ensure incrementTotalLength increments the totalLength correctly
test('incrementTotalLength should increment totalLength correctly', () => {
  resetTotalLength(); // Reset the totalLength before each test case
  incrementTotalLength(5);
  expect(getTotalLength()).toBe(5); // Expect the totalLength to be 5
});

// Test case to check if incrementTotalLength handles negative values correctly
test('incrementTotalLength should handle negative values', () => {
  resetTotalLength(); // Reset the totalLength before each test case
  incrementTotalLength(-3);
  expect(getTotalLength()).toBe(-3); // Expect the totalLength to be -3
});

// Test case to ensure getTotalLength returns the correct value initially
test('getTotalLength should return 0 initially', () => {
  resetTotalLength(); // Reset the totalLength before each test case
  expect(getTotalLength()).toBe(0);
});

// Test case to check if getTotalLength returns the correct value after multiple increments
test('getTotalLength should return the correct value after multiple increments', () => {
  resetTotalLength(); // Reset the totalLength before each test case
  incrementTotalLength(10);
  incrementTotalLength(7);
  incrementTotalLength(3);
  expect(getTotalLength()).toBe(20); // Expect the totalLength to be 20
});
