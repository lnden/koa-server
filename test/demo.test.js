/**
 * @description demo test
 */

function sum(a, b) {
  return a + b
}

test('10 + 20 = 30', () => {
  const result = sum(10, 20)
  expect(result).toBe(30)
  expect(result).not.toBe(!30)
})