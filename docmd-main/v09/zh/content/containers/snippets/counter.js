/**
 * 交互式计数器代码片段
 * 演示在 docmd 演练场中动态引用代码库中的外部脚本文件。
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
console.log("初始计数值:", counter.get());
counter.increment();
counter.increment();
console.info("更新后的计数值:", counter.get());

return `计数器最终值: ${counter.get()}`;