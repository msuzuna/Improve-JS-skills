export const todoList = () => {
  const taskNameInputElement = document.querySelector(
    '[data-input="taskname"]'
  );
  const taskDeadlineElement = document.querySelector('[data-input="deadline"]');
  const taskAddElement = document.querySelector('[data-input="addbutton"]');
  const taskListElement = document.querySelector('[data-taskList="doing"]');

  if (
    !taskNameInputElement ||
    !taskDeadlineElement ||
    !taskAddElement ||
    !taskListElement
  )
    return;

  const taskDoingArray = [];

  const switchAddButtonDisabled = () => {
    const isInputLength = taskNameInputElement.value.length;
    if (isInputLength) {
      taskAddElement.disabled = false;
    } else {
      taskAddElement.disabled = true;
    }
  };

  const addTaskObjTotaskDoingArray = () => {
    const taskName = taskNameInputElement.value;
    const taskDeadline = taskDeadlineElement.value
      ? new Date(taskDeadlineElement.value)
      : "none";
    const taskObj = {
      taskName,
      taskDeadline,
      isCompleted: false,
    };
    taskDoingArray.push(taskObj);
  };

  taskNameInputElement.addEventListener("input", () => {
    switchAddButtonDisabled();
  });

  taskAddElement.addEventListener("click", () => {
    addTaskObjTotaskDoingArray();
  });
};
