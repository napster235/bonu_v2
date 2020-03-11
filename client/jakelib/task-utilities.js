const invoke = (task, ...args) => new Promise((resolve) => {
  const jakeTask = jake.Task[task];
  jakeTask.addListener('complete', () => {
    resolve();
  });
  jakeTask.invoke(...args);
});


module.exports = {
  invoke,
};
