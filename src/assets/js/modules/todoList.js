export const todoList = () => {
  const taskNameInputElement = document.querySelector(
    '[data-input="taskname"]'
  );
  const taskAddElement = document.querySelector('[data-input="addbutton"]');
  if (!taskNameInputElement && taskAddElement) return;

  const switchAddButtonDisabled = () => {
    const isInputLength = taskNameInputElement.value.length;
    if (isInputLength) {
      taskAddElement.disabled = false;
    } else {
      taskAddElement.disabled = true;
    }
  };

  taskNameInputElement.addEventListener("input", () => {
    switchAddButtonDisabled();
  });
};
