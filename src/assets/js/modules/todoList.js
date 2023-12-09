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

  const resetTaskInputValue = () => {
    taskNameInputElement.value = "";
    taskDeadlineElement.value = "";
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

  const updateTaskListElement = () => {
    while (taskListElement.firstChild) {
      taskListElement.removeChild(taskListElement.firstChild);
    }
    taskDoingArray.forEach((elm) => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      const label = document.createElement("label");
      const deadline = document.createElement("span");
      checkbox.type = "checkbox";
      label.textContent = elm.taskName;
      deadline.textContent =
        elm.taskDeadline !== "none"
          ? elm.taskDeadline.toLocaleDateString()
          : "";
      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(deadline);
      taskListElement.appendChild(listItem);
    });
  };

  taskNameInputElement.addEventListener("input", () => {
    switchAddButtonDisabled();
  });

  taskAddElement.addEventListener("click", () => {
    addTaskObjTotaskDoingArray();
    resetTaskInputValue();
    changeOrderTaskDoingArray();
    updateTaskListElement();
  });
};
