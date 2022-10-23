;(function () {
  // 实现原生 new 方法
  function myNew() {
    // 拿到函数
    let constructor = [].shift.call(arguments),
      // 生成一个对象
      _this = {}
    // 对象的 __proto__ 等于函数的 prototype
    _this.__proto__ = constructor.prototype
    // 执行函数,把 this 指向和参数传进去
    const res = constructor.apply(_this, arguments)
    // 如果执行函数里面用户手动返回，那我们就返回他指定的对象，否则返回我们创建的对象
    return typeof res === 'object' ? res : _this

    // 最后返回这个对象
    return _this
  }

  // 测试
  function Test(a, b) {
    this.a = a
    this.b = b
  }

  const text = myNew(Test, 1, 2)
})()
