export const todoList = () => {
  /**
   * @type {HTMLElement}
   */
  const taskNameInputElement = document.querySelector(
    '[data-input="taskname"]'
  );
  /**
   * @type {HTMLElement}
   */
  const taskDeadlineElement = document.querySelector('[data-input="deadline"]');
  /**
   * @type {HTMLElement}
   */
  const taskAddElement = document.querySelector('[data-input="addbutton"]');
  /**
   * @type {HTMLElement}
   */
  const taskListDoingElement = document.querySelector(
    '[data-taskList="doing"]'
  );

  if (
    !taskNameInputElement ||
    !taskDeadlineElement ||
    !taskAddElement ||
    !taskListDoingElement
  )
    return;

  /**
   * @type {NodeList}
   */
  const taskListItemDoingElements = taskListDoingElement.childNodes;

  /**
   * @type {object[]}
   */
  let taskDoingArray = [];

  /**
   * タスク追加ボタンの活性非活性を切り替える関数
   * @function
   */
  const switchAddButtonDisabled = () => {
    const isInputLength = taskNameInputElement.value.length;
    if (isInputLength) {
      taskAddElement.disabled = false;
    } else {
      taskAddElement.disabled = true;
    }
  };

  /**
   * タスクオブジェクトを進行中タスク配列に追加する関数
   * @function
   */
  const addTaskObjToTaskDoingArray = () => {
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

  /**
   * タスク入力input要素をリセットする関数
   * @function
   */
  const resetTaskInputStatus = () => {
    taskNameInputElement.value = "";
    taskDeadlineElement.value = "";
    taskAddElement.disabled = true;
  };

  /**
   * 進行中タスク配列の順序を日付の昇降順に入れ替える関数
   * @function
   */
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

  /**
   * 進行中タスクリスクの表示を更新する関数
   * @function
   */
  const updateTaskListDoingElements = () => {
    while (taskListDoingElement.firstChild) {
      taskListDoingElement.removeChild(taskListDoingElement.firstChild);
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
      taskListDoingElement.appendChild(listItem);
    });
  };

  // 初期画面のタスクを進行中タスクリストに追加
  if (taskListItemDoingElements.length > 0) {
    taskListItemDoingElements.forEach((elm) => {
      if (elm.nodeName === "LI") {
        const taskName = elm.querySelector("label").innerText;
        const taskDeadline =
          elm.querySelector("span").innerText !== ""
            ? new Date(elm.querySelector("span").innerText)
            : "none";
        const taskObj = {
          taskName,
          taskDeadline,
          isCompleted: false,
        };
        taskDoingArray.push(taskObj);
      }
    });
  }

  taskNameInputElement.addEventListener("input", () => {
    switchAddButtonDisabled();
  });

  taskAddElement.addEventListener("click", () => {
    addTaskObjToTaskDoingArray();
    resetTaskInputStatus();
    changeOrderTaskDoingArray();
    updateTaskListDoingElements();
  });
};
