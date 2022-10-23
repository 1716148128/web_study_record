;(function () {
  // 实现 js instanceof 关键字
  function instanceOf(target, type) {
    type = type.prototype
    target = target.__proto__

    while (true) {
      // 找到原型链顶端找不到
      if (target === null) {
        return false
      }
      if (target === type) {
        return true
      }
      target = target.__proto__
    }
  }

  class Test {}
  const test = new Test()

  console.log(instanceOf(test, Test))
  console.log(instanceOf([], Object))
})()
