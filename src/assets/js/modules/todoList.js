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
  /**
   * @type {HTMLElement}
   */
  const taskListDoneElement = document.querySelector('[data-taskList="done"]');

  if (
    !taskNameInputElement ||
    !taskDeadlineElement ||
    !taskAddElement ||
    !taskListDoingElement ||
    !taskListDoneElement
  )
    return;

  /**
   * @type {NodeList}
   */
  const taskListItemDoingElements = taskListDoingElement.childNodes;

  /**
   * @type {NodeList}
   */
  const taskListItemDoneElements = taskListDoneElement.childNodes;

  /**
   * @type {object[]}
   */
  let taskDoingArray = [];

  /**
   * @type {object[]}
   */
  let taskDoneArray = [];

  /**
   * 初期で表示されているタスクを進行中タスク配列もしくは完了後タスクに追加する関数
   * @function
   */
  const addTaskObjToTaskArray = (nodeList) => {
    nodeList.forEach((elm) => {
      if (elm.nodeName === "LI") {
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
        if (taskObj.isCompleted) {
          taskDoneArray.push(taskObj);
        } else {
          taskDoingArray.push(taskObj);
        }
      }
    });
  };

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
   * タスク入力input要素をリセットする関数
   * @function
   */
  const resetTaskInputStatus = () => {
    taskNameInputElement.value = "";
    taskDeadlineElement.value = "";
    taskAddElement.disabled = true;
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

  /**
   * 完了後タスクリスクの表示を更新する関数
   * @function
   */
  const updateTaskListDoneElements = () => {
    while (taskListDoneElement.firstChild) {
      taskListDoneElement.removeChild(taskListDoneElement.firstChild);
    }
    taskDoneArray.forEach((elm) => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      const label = document.createElement("label");
      const deadline = document.createElement("span");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      label.textContent = elm.taskName;
      deadline.textContent =
        elm.taskDeadline !== "none"
          ? elm.taskDeadline.toLocaleDateString()
          : "";
      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(deadline);
      taskListDoneElement.appendChild(listItem);
    });
  };

  /**
   * 対応中タスク配列から対応済みタスク配列へタスクを移動させる関数
   * @function
   * @param {*} event
   */
  const moveTaskFromDoneArrayToDoingArray = (event) => {
    const targetElement = event.target;
    const targetElementNodeName = targetElement.nodeName;
    if (targetElementNodeName === "INPUT") {
      const listItemElements = taskListDoneElement.children;
      const parentElenemt = targetElement.parentNode;
      let index = 0;
      for (let i = 0; i < listItemElements.length; i++) {
        if (listItemElements.item(i) === parentElenemt) {
          index = i;
        }
      }
      taskDoneArray[index].isCompleted = false;
      taskDoingArray.unshift(taskDoneArray[index]);
      taskDoneArray.splice(index, 1);
    }
  };

  /**
   * 対応中タスク配列から対応済みタスク配列へタスクを移動させる関数
   * @function
   * @param {*} event
   */
  const moveTaskFromDoingArrayToDoneArray = (event) => {
    const targetElement = event.target;
    const targetElementNodeName = targetElement.nodeName;
    if (targetElementNodeName === "INPUT") {
      const listItemElements = taskListDoingElement.children;
      const parentElenemt = targetElement.parentNode;
      let index = 0;
      for (let i = 0; i < listItemElements.length; i++) {
        if (listItemElements.item(i) === parentElenemt) {
          index = i;
        }
      }
      taskDoingArray[index].isCompleted = true;
      taskDoneArray.unshift(taskDoingArray[index]);
      taskDoingArray.splice(index, 1);
    }
  };

  // 初期画面のタスクを進行中タスクリストに追加
  if (taskListItemDoingElements.length > 0) {
    addTaskObjToTaskArray(taskListItemDoingElements);
  }
  if (taskListItemDoneElements.length > 0) {
    addTaskObjToTaskArray(taskListItemDoneElements);
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

  taskListDoingElement.addEventListener("click", (event) => {
    moveTaskFromDoingArrayToDoneArray(event);
    updateTaskListDoingElements();
    updateTaskListDoneElements();
  });

  taskListDoneElement.addEventListener("click", (event) => {
    moveTaskFromDoneArrayToDoingArray(event);
    changeOrderTaskDoingArray();
    updateTaskListDoingElements();
    updateTaskListDoneElements();
  });
};
