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
  const taskAddButtonElement = document.querySelector(
    '[data-input="addbutton"]'
  );
  /**
   * @type {HTMLElement}
   */
  const taskListDoingElement = document.querySelector(
    '[data-taskList="doing"]'
  );
  /**
   * @type {HTMLElement}
   */
  const taskListDoneElement = document.querySelector('[data-taskList="done"]');

  if (
    !taskNameInputElement ||
    !taskDeadlineElement ||
    !taskAddButtonElement ||
    !taskListDoingElement ||
    !taskListDoneElement
  )
    return;

  /**
   * @type {NodeList}
   */
  const taskListItemDoingElements = taskListDoingElement.querySelectorAll("li");

  /**
   * @type {NodeList}
   */
  const taskListItemDoneElements = taskListDoneElement.querySelectorAll("li");

  /**
   * @type {object[]}
   */
  const taskArray = [];

  /**
   * 初期で表示されているタスクを進行中タスク配列もしくは完了後タスクに追加する関数
   * @function
   */
  const addInitialTaskObj = (nodeList, targetArray) => {
    nodeList.forEach((elm) => {
      const isCompleted = elm.querySelector("input").checked;
      const taskName = elm.querySelector("label").innerText;
      const taskDeadline =
        elm.querySelector("span").innerText !== ""
          ? new Date(elm.querySelector("span").innerText)
          : "none";
      const taskObj = {
        taskName,
        taskDeadline,
        isCompleted,
      };
      targetArray.push(taskObj);
    });
  };

  /**
   * タスク追加ボタンの活性非活性を切り替える関数
   * @function
   */
  const switchAddButtonDisabled = () => {
    const isInputLength = taskNameInputElement.value.length;
    if (isInputLength) {
      taskAddButtonElement.disabled = false;
    } else {
      taskAddButtonElement.disabled = true;
    }
  };

  /**
   * タスク入力input要素をリセットする関数
   * @function
   */
  const resetTaskInputStatus = () => {
    taskNameInputElement.value = "";
    taskDeadlineElement.value = "";
    switchAddButtonDisabled();
  };

  /**
   * タスクオブジェクトを進行中タスク配列に追加する関数
   * @function
   */
  const addTaskObjFromInput = (targetArray) => {
    const taskName = taskNameInputElement.value;
    const taskDeadline = taskDeadlineElement.value
      ? new Date(taskDeadlineElement.value)
      : "none";
    const taskObj = {
      taskName,
      taskDeadline,
      isCompleted: false,
    };
    targetArray.push(taskObj);
  };

  /**
   * 対応中タスク配列から対応済みタスク配列へタスクを移動させる関数
   * @function
   * @param {*} event
   */
  const switchTaskIsCompleted = (event) => {
    const { target } = event;
    const targetElements =
      event.currentTarget.querySelectorAll("li label input");
    targetElements.forEach((targetElement) => {
      if (targetElement === target) {
        const taskName = target.parentElement.innerText;
        const targetTask = taskArray.find((taskItem) => {
          return taskItem.taskName === taskName;
        });
        targetTask.isCompleted = target.checked;
      }
    });
  };

  /**
   * タスクリストul要素にli要素を追加する関数
   * @function
   * @param {HTMLElement} listElement
   * @param {object} arrayItem
   */
  const createTaskListItemElement = (listElement, arrayItem) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const deadline = document.createElement("span");
    checkbox.type = "checkbox";
    checkbox.checked = arrayItem.isCompleted;
    label.textContent = arrayItem.taskName;
    deadline.textContent =
      arrayItem.taskDeadline !== "none"
        ? arrayItem.taskDeadline.toLocaleDateString()
        : "";
    label.prepend(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deadline);
    listElement.appendChild(listItem);
  };

  /**
   * 進行中タスクリスクの表示を更新する関数
   * @function
   */
  const updateTaskListDoingElements = () => {
    taskListDoingElement.innerHTML = "";

    let taskDoingArray = taskArray.filter((elm) => {
      return elm.isCompleted === false;
    });
    const noDeadLineArray = taskDoingArray.filter((elm) => {
      return elm.taskDeadline === "none";
    });
    const hasDeadLineArray = taskDoingArray
      .filter((elm) => {
        return elm.taskDeadline !== "none";
      })
      .toSorted((a, b) => {
        return a.taskDeadline > b.taskDeadline ? 1 : -1;
      });
    taskDoingArray = hasDeadLineArray.concat(noDeadLineArray);
    taskDoingArray.forEach((elm) => {
      createTaskListItemElement(taskListDoingElement, elm);
    });
  };

  /**
   * 完了後タスクリスクの表示を更新する関数
   * @function
   */
  const updateTaskListDoneElements = () => {
    taskListDoneElement.innerHTML = "";

    const taskDoneArray = taskArray.filter((elm) => {
      return elm.isCompleted === true;
    });
    taskDoneArray.forEach((elm) => {
      createTaskListItemElement(taskListDoneElement, elm);
    });
  };

  // 初期画面のタスクを進行中タスクリストに追加
  if (taskListItemDoingElements.length > 0) {
    addInitialTaskObj(taskListItemDoingElements, taskArray);
  }
  if (taskListItemDoneElements.length > 0) {
    addInitialTaskObj(taskListItemDoneElements, taskArray);
  }

  taskNameInputElement.addEventListener("input", () => {
    switchAddButtonDisabled();
  });

  taskAddButtonElement.addEventListener("click", () => {
    addTaskObjFromInput(taskArray);
    resetTaskInputStatus();
    updateTaskListDoingElements();
  });

  taskListDoingElement.addEventListener("click", (event) => {
    switchTaskIsCompleted(event);
    updateTaskListDoingElements();
    updateTaskListDoneElements();
  });

  taskListDoneElement.addEventListener("click", (event) => {
    switchTaskIsCompleted(event);
    updateTaskListDoingElements();
    updateTaskListDoneElements();
  });
};
