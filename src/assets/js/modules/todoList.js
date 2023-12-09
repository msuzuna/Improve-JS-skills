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

  let taskDoingArray = [];

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

  const changeOrderTaskDoingArray = () => {
    const hasDeadlineTaskArray = taskDoingArray.filter((elm) => {
      return elm.taskDeadline !== "none";
    });
    const noDeadlineTaskArray = taskDoingArray.filter((elm) => {
      return elm.taskDeadline === "none";
    });
    hasDeadlineTaskArray.sort((a, b) => {
      return a.taskDeadline > b.taskDeadline ? 1 : -1;
    });
    taskDoingArray = hasDeadlineTaskArray.concat(noDeadlineTaskArray);
  };

  taskNameInputElement.addEventListener("input", () => {
    switchAddButtonDisabled();
  });

  taskAddElement.addEventListener("click", () => {
    addTaskObjTotaskDoingArray();
    changeOrderTaskDoingArray();
  });
};
