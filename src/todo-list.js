
import { isToday, parseISO, isWithinInterval, subDays, format, isValid} from 'date-fns';
import { ca, da } from 'date-fns/locale';
import './style.css'
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import exitIcon from '../assets/exit.svg';



// export let myTodoList = [];
// localStorage.setItem("tasks", JSON.stringify(myTodoList));
// localStorage.getItem("tasks");

export let myTodoList = JSON.parse(localStorage.getItem("tasks")) || [];

let currentEditIndex = null;




export class Task {
    constructor(title, description, priority, date) {

        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date;

    }
}

export function createTaskForm() {

    const formContainer = document.createElement("div");
    formContainer.classList.add("todo__form-wrapper"); 

    const title = document.createElement("h1");
    title.classList.add("todo__title");
    title.textContent = "Inbox"

    const inboxForm = document.createElement("form");
    inboxForm.classList.add("inbox__form");
    inboxForm.setAttribute("method", "POST");
    inboxForm.setAttribute("action", "");

    const inboxTitleItem = document.createElement("div");
    inboxTitleItem.classList.add("todo__title");

    const inboxDescriptionItem = document.createElement("div");
    inboxDescriptionItem.classList.add("todo__description");

    const inboxSelectItem = document.createElement("div");
    inboxSelectItem.classList.add("todo__select");

    const inboxDateItem = document.createElement("div");
    inboxDateItem.classList.add("todo__date");


    //title input
    const titleLabel = document.createElement("label");
    titleLabel.classList.add("inbox__label");
    titleLabel.setAttribute("for", "task-title");
    titleLabel.textContent = "Title"

    const titleTask = document.createElement("input");
    titleTask.classList.add("inbox__title");
    titleTask.type = "text";
    titleTask.id = "task-title";
    titleTask.name = "task-title";
    titleTask.placeholder = "Title";
    titleTask.required = true;


    //description input
    const descriptionLabel = document.createElement("label");
    descriptionLabel.classList.add("inbox__label");
    descriptionLabel.setAttribute("for", "task-description");
    descriptionLabel.textContent = "Description"

    const descriptionTask = document.createElement("input");
    descriptionTask.classList.add("inbox__description");
    descriptionTask.type = "text";
    descriptionTask.id = "task-description";
    descriptionTask.name = "task-description";
    descriptionTask.placeholder = "Description";
    descriptionTask.required = true;

    //priority and date input parent
    const inboxMeta = document.createElement("div");
    inboxMeta.classList.add("inbox__meta");

    //priority input
    const priorityOptions = [
        { value: "low", text: "Low" },
        { value: "medium", text: "Medium" },
        { value: "high", text: "High" },
    ];

    const priorityLabel = document.createElement("label");
    priorityLabel.classList.add("inbox__priority");
    priorityLabel.setAttribute("for", "task-priority");
    priorityLabel.textContent = "Priority"

    const priorityTask = document.createElement("select");
    priorityTask.classList.add("inbox__select");
    priorityTask.id = "task-select";
    priorityTask.name = "task-select";
    priorityTask.required = true;


    priorityOptions.forEach(option => {
        const options = document.createElement("option");
        options.classList.add("todo__select-option");

        options.textContent = option.text;
        priorityTask.appendChild(options);
    });


    //date input
    const dateLabel = document.createElement("label");
    dateLabel.classList.add("inbox__label");
    dateLabel.setAttribute("for", "task-date");
    dateLabel.textContent = "Date"

    const dateTask = document.createElement("input");
    dateTask.classList.add("inbox__date");
    dateTask.type = "date";
    dateTask.id = "task-date";
    dateTask.name = "task-date";
    dateTask.required = true;


    // inboxTitleItem.appendChild(titleLabel);
    inboxTitleItem.appendChild(titleTask);
    inboxForm.appendChild(inboxTitleItem);

    // inboxDescriptionItem.appendChild(descriptionLabel);
    inboxDescriptionItem.appendChild(descriptionTask);
    inboxForm.appendChild(inboxDescriptionItem);


    // inboxSelectItem.appendChild(priorityLabel);
    inboxSelectItem.appendChild(priorityTask);

    // inboxDateItem.appendChild(dateLabel);
    inboxDateItem.appendChild(dateTask);

    //save and cancel button parent
    const inboxActions = document.createElement("div");
    inboxActions.classList.add("inbox__actions");

    //save and cancel button
    const saveTaskBtn = document.createElement("button");
    saveTaskBtn.classList.add("todo__save-task");
    saveTaskBtn.type = "submit";
    saveTaskBtn.textContent = "Add Task";

    const cancelTaskBtn = document.createElement("button");
    cancelTaskBtn.classList.add("todo__cancel-task");
    cancelTaskBtn.textContent = "Cancel";

    inboxActions.appendChild(cancelTaskBtn);
    inboxActions.appendChild(saveTaskBtn);

    inboxMeta.appendChild(inboxDateItem);
    inboxMeta.appendChild(inboxSelectItem);

    inboxForm.appendChild(inboxMeta);
    inboxForm.appendChild(inboxActions);

    formContainer.appendChild(title);
    formContainer.appendChild(inboxForm);


    return {
        formContainer,
        inboxForm,
        titleTask,
        descriptionTask,
        priorityTask,
        dateTask,
        inboxActions,
        saveTaskBtn,
        cancelTaskBtn,
      };
      

}




function todoList() {


    const todoListParent = document.createElement("div");
    todoListParent.classList.add("todo__list-item");

    const taskModal = document.createElement("div");
    taskModal.classList.add("task__modal");

    const editDetails = document.createElement("div");
    editDetails.classList.add("task__details");

    const {
        formContainer,
        inboxForm,
        titleTask,
        descriptionTask,
        priorityTask,
        dateTask,
        inboxActions,
        saveTaskBtn,
        cancelTaskBtn
      } = createTaskForm();

    todoListParent.appendChild(formContainer);


    //to-do list (task) items 
    const todoListTask = document.createElement("div");
    todoListTask.classList.add("todo__list-task");

    const todoListTaskItem = document.createElement("div");
    todoListTaskItem.classList.add("todo__task-item");


    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("todo__add-task");

    const addIcon = document.createElement("div");
    addIcon.classList.add("add__task-icon");
    addIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`

    const taskBtn = document.createElement("button");
    taskBtn.classList.add("add__task-btn");
    taskBtn.textContent = "Add Task";

    taskBtn.appendChild(addIcon);
    addTaskBtn.appendChild(taskBtn);


    //edit (save & cancel) button parent
    const editTaskDetails = document.createElement("div");
    editTaskDetails.classList.add("task__details-edit");

    //edit (save & cancel) button 
    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add("task__details-save");
    saveEditBtn.textContent = "Save Changes";

    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.classList.add("task__details-cancel");
    cancelEditBtn.textContent = "Cancel";
    

     taskBtn.addEventListener("click", () => {
        inboxForm.style.display = "flex";
        inboxActions.style.display = "flex";
        addTaskBtn.style.display = "none";
        editTaskDetails.style.display = "none";
    });
 

     todoListParent.appendChild(addTaskBtn); 

    



function handleCreateTask() {

    let title =  titleTask.value;
    let description =  descriptionTask.value;
    let priority =  priorityTask.value;
    let date =  dateTask.value;
    
    let newTask = new Task(title, description, priority, date);
    localStorage.setItem("tasks", JSON.stringify(myTodoList));  
    myTodoList.push(newTask);
    console.log(myTodoList);


    inboxForm.style.display = "none";
    handleDisplayTask(myTodoList);
}

function handleViewTask(item) {
    
    let viewTaskDetails = "";

    const viewTaskInfo = document.createElement("div");
    viewTaskInfo.classList.add("task__modal-info")

    document.querySelectorAll(".btn-details").forEach((detailsBtn, index) => {
        detailsBtn.addEventListener("click", () => {
            viewTaskDetails = `
                <div class="task__modal-item">

                        <div class="btn task__btn-exit">
                            <button class="btn btn-exit">
                                <img src="${exitIcon}" alt="Exit">
                            </button>
                        </div>

                        <div class="task__modal-title">
                            <p>${item[index].title}</p>
                        </div>
                
                    <div class="task__modal-text">
                        <p>Description:  ${item[index].description}</p>
                        <p>Priority:  ${item[index].priority}</p>
                        <p>Due Date:   ${item[index].date}</p>
                    </div>
                </div>
            `
            taskModal.style.display = "flex";

            viewTaskInfo.innerHTML = viewTaskDetails;

            document.querySelector(".btn-exit").addEventListener("click", () => {
                taskModal.style.display = "none";
                viewTaskInfo.innerHTML = "";
            });
        });

    });

    taskModal.appendChild(viewTaskInfo);

    todoListParent.appendChild(taskModal);
}


function handleDisplayTask(tasks) {

  
   let task = "";

   todoListTaskItem.innerHTML = "";
   todoListTask.innerHTML = "";
   console.log(todoListTaskItem);


    tasks.forEach((taskItem) => {
        task += `
        <div class="task__item">
            <div class="task__item-title">
                <input type="checkbox" class="isDone" />
                <p>${taskItem.title}</p>
            </div>

            <div class="task__item-btn">
                <button class="btn btn-details">Details</button>
                <div>${format(parseISO(taskItem.date), "MMMM d, yyyy")}</div>

                <button class="btn btn-edit">
                    <img src="${editIcon}" alt="Edit">
                </button>

                <button class="btn btn-delete">
                    <img src="${deleteIcon}" alt="Delete">
                </button>
            </div>

            <div class="task-line"></div>
        </div>
             `;
    });

    todoListTaskItem.innerHTML = task;
    todoListTask.appendChild(todoListTaskItem);
    todoListParent.appendChild(todoListTask);

    handleViewTask(tasks);
    handleEditTask(tasks);
    handleDeleteTask();
    isDone();
}


function handleEditTask(task) {

    let isEditing = true;

    editTaskDetails.appendChild(saveEditBtn);
    editTaskDetails.appendChild(cancelEditBtn);
    editDetails.appendChild(editTaskDetails);
    inboxForm.appendChild(editDetails);

    document.querySelectorAll(".btn-edit").forEach((editBtn, index) => {
        editBtn.onclick = () => {  
            currentEditIndex = index;

            inboxForm.style.display = "flex";
            editDetails.style.display = "flex";
            editTaskDetails.style.display = "flex";
            inboxActions.style.display = "none";

            // pre-fill values
            titleTask.value = task[index].title;
            descriptionTask.value = task[index].description;
            priorityTask.value = task[index].priority;
            dateTask.value = task[index].date;
        };
    });

    saveEditBtn.onclick = () => {
        let updatedTaskDetails = new Task(
            titleTask.value,
            descriptionTask.value,
            priorityTask.value,
            dateTask.value
        );

        myTodoList[currentEditIndex] = updatedTaskDetails;

        // re-render tasks fresh
        localStorage.setItem("tasks", JSON.stringify(myTodoList));  
        handleDisplayTask(myTodoList);
        inboxForm.style.display = "none";
        inboxForm.reset();

        todoListParent.appendChild(addTaskBtn);
    };

    cancelEditBtn.onclick = () => {
        inboxForm.style.display = "none";
        inboxForm.reset();
    };
    
}


function handleDeleteTask() {

    document.querySelectorAll(".btn-delete").forEach((button, index) => {
        button.addEventListener("click", () => {
           myTodoList.splice(index, 1);
           localStorage.setItem("tasks", JSON.stringify(myTodoList));  
           handleDisplayTask(myTodoList);
           todoListParent.appendChild(addTaskBtn);  
           inboxForm.reset();
        });
    });


    if(myTodoList.length === 0) {
        addTaskBtn.style.display = "flex";
        addTaskBtn.style.marginTop = "10rem";
        addTaskBtn.style.justifyContent = "center";
        taskBtn.style.backgroundColor = "rgb(220, 60, 34)";
        taskBtn.style.color = "white";
        addIcon.style.filter = "brightness(0) invert(1)";
    }

}


inboxForm.addEventListener("submit",  function(event) {
    event.preventDefault();
    console.log("Form submitted");
    handleCreateTask();
    inboxForm.reset();
    
    if(myTodoList.length !== 0) {
        addTaskBtn.style.display = "flex";
        addTaskBtn.style.marginTop = "10px";
        addTaskBtn.style.justifyContent = "flex-start";
        taskBtn.style.backgroundColor = "white";
        taskBtn.style.color = "rgb(158, 158, 158)";
        addIcon.style.filter = "invert(19%) sepia(46%) saturate(6923%) hue-rotate(2deg) brightness(104%) contrast(73%)";
        todoListParent.appendChild(todoListTask);  
        todoListParent.appendChild(addTaskBtn);  
    }
});


function isDone() {

    const isTaskDone = document.querySelectorAll(".task__item");

    document.querySelectorAll(".isDone").forEach((isCheck, index) => {
        isCheck.onclick = (e) => {
            console.log("Task is successfully done! Congrats!", e.target.checked);
                isCheck.style.transform = "scale(1.05) translateY(-5px)";
                isCheck.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
                myTodoList.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(myTodoList));  
                handleDisplayTask(myTodoList);
                todoListParent.appendChild(addTaskBtn);  
        }
    });
}

cancelTaskBtn.addEventListener("click", () => {
    inboxForm.reset();
    inboxForm.style.display = "none";
    addTaskBtn.style.display = "flex";
});


return todoListParent;
    

}




export default todoList;