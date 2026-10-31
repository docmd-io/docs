/**
 * Interactive Counter Snippet
 * Demonstrates sourcing external repository scripts into docmd playgrounds.
 */
function createCounter(initialValue = 0) {
  let count = initialValue;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

const counter = createCounter(10);
console.log("Initial count:", counter.get());
counter.increment();
counter.increment();
console.info("Updated count:", counter.get());

return `Counter value: ${counter.get()}`;