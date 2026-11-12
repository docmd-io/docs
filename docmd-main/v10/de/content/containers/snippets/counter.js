/**
 * Interaktives Zähler-Snippet
 * Demonstriert das Einbinden externer Repository-Skripte in docmd-Playgrounds.
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
console.log("Ursprünglicher Zählerstand:", counter.get());
counter.increment();
counter.increment();
console.info("Aktualisierter Zählerstand:", counter.get());

return `Zählerwert: ${counter.get()}`;