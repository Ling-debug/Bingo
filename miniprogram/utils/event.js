// utils/event.js
// 自定义事件中心（Event Bus）
// 作用：在不同页面或组件之间进行通信，尤其是在没有直接父子关系的组件之间传递消息。
class Event {
  constructor() {
    this.events = {};
  }

  on(event, fn, context) {
    if (typeof fn !== 'function') return;
    this.events[event] = this.events[event] || [];
    this.events[event].push({ fn, context });
  }

  off(event, fn, context) {
    if (!this.events[event]) return;
    
    for (let i = 0; i < this.events[event].length; i++) {
      const listener = this.events[event][i];
      if (
        listener.fn === fn && 
        (!context || listener.context === context)
      ) {
        this.events[event].splice(i, 1);
        break;
      }
    }
  }

  trigger(event, ...args) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(listener => {
      listener.fn.apply(listener.context, args);
    });
  }
}

module.exports = Event;