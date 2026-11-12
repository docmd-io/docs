/**
 * Snippet de Contador Interactivo
 * Demuestra la vinculación de scripts externos del repositorio en playgrounds de docmd.
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
console.log("Contador inicial:", counter.get());
counter.increment();
counter.increment();
console.info("Contador actualizado:", counter.get());

return `Valor del contador: ${counter.get()}`;