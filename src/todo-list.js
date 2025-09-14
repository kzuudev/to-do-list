
import {  parseISO, format } from 'date-fns';

import './style.css'
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import exitIcon from '../assets/exit.svg';



export let myTodoList = JSON.parse(localStorage.getItem("tasks")) || [];

export let currentEditIndex = null;

export class Task {
    constructor(title, description, priority, date) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date;

    }
}

export function createTaskForm(sectionName = "inbox") {

    console.log("🔥 createTaskForm() called!"); 
    console.trace("Called from:");
    
    const formContainer = document.createElement("div");
    formContainer.classList.add("todo__form-wrapper"); 

    const title = document.createElement("h1");
    title.classList.add("todo__title-headings");
    title.textContent = "Inbox"

    const form = document.createElement("form");
    form.classList.add(`${sectionName}__form`);
    form.setAttribute("method", "POST");
    form.setAttribute("action", "");

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


    const priorityTask = document.createElement("select");
    priorityTask.classList.add("inbox__select");

    priorityTask.id = "task-select";
    priorityTask.name = "task-select";
    priorityTask.required = true;

 
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Priority";
    placeholderOption.value = "";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    priorityTask.appendChild(placeholderOption);

    priorityOptions.forEach(option => {
        const options = document.createElement("option");
        options.classList.add("todo__select-option");
        options.textContent = option.text;
        options.value = option.value;

        if (option.text === "Low") {
            options.style.color = "blue";  
        } else if (option.text === "Medium") {
            options.style.color = "yellow";  
        } else {
            options.style.color = "red";  
        }
    
        priorityTask.appendChild(options);
    });
    


    //date input
    const dateLabel = document.createElement("label");
    dateLabel.classList.add("inbox__label");
    dateLabel.setAttribute("for", "task-date");
    

    const dateTask = document.createElement("input");
    dateTask.classList.add("inbox__date");
    dateTask.placeholder = "Date";
    dateTask.type = "date";
    dateTask.id = "task-date";
    dateTask.name = "task-date";
    dateTask.required = true;


    // inboxTitleItem.appendChild(titleLabel);
    inboxTitleItem.appendChild(titleTask);
    form.appendChild(inboxTitleItem);

    // inboxDescriptionItem.appendChild(descriptionLabel);
    inboxDescriptionItem.appendChild(descriptionTask);
    form.appendChild(inboxDescriptionItem);


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

    form.appendChild(inboxMeta);
    form.appendChild(inboxActions);

    formContainer.appendChild(title);
    formContainer.appendChild(form);


    return {
        formContainer,
        form,
        titleTask,
        descriptionTask,
        priorityTask,
        dateTask,
        inboxActions,
        saveTaskBtn,
        cancelTaskBtn,
      };
      

}

    const todoListParent = document.createElement("div");
    todoListParent.classList.add("todo__list-item");

    const taskModal = document.createElement("div");
    taskModal.classList.add("task__modal");

    const editDetails = document.createElement("div");
    editDetails.classList.add("task__details");

    const {
        formContainer,
        form,
        titleTask,
        descriptionTask,
        priorityTask,
        dateTask,
        inboxActions,
        saveTaskBtn,
        cancelTaskBtn
      } = createTaskForm("inbox");

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
        form.style.display = "flex";
        inboxActions.style.display = "flex";
        addTaskBtn.style.display = "none";
        editTaskDetails.style.display = "none";
    });
 

     todoListParent.appendChild(addTaskBtn); 

    
export function inboxHelper() {

    //it triggers when a task created from today section.
    document.addEventListener("taskAdded", (e) => {
        console.log("Inbox received new task:", e.detail.task);
        localStorage.setItem("tasks", JSON.stringify(myTodoList));  
        handleDisplayTask(myTodoList); // auto-refresh today section
        form.reset();
        form.style.display = "none";

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
    
    //it triggers when a task updated, deleted, or done in today section
    document.addEventListener("updatedTask", () => {
        localStorage.setItem("tasks", JSON.stringify(myTodoList));  
        handleDisplayTask(myTodoList); 
        form.reset();
        form.style.display = "none";
        todoListParent.appendChild(addTaskBtn);  
    });

    document.addEventListener("deletedTask", () => {
        localStorage.setItem("tasks", JSON.stringify(myTodoList));  
        handleDisplayTask(myTodoList); 
        form.reset();
        form.style.display = "none";
        todoListParent.appendChild(addTaskBtn);  
    });

    document.addEventListener("doneTask", () => {
        localStorage.setItem('tasks', JSON.stringify(myTodoList));
        handleDisplayTask(myTodoList)
        handleDisplayTask(myTodoList); // auto-refresh today section
        form.reset();
        form.style.display = "none";
        todoListParent.appendChild(addTaskBtn);
    })

}

export function handleCreateTask() {

    let title =  titleTask.value;
    let description =  descriptionTask.value;
    let priority =  priorityTask.value;
    let date =  dateTask.value;
    
    let newTask = new Task(title, description, priority, date);
    myTodoList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(myTodoList));  

    // Broadcast event that a task was created
    document.dispatchEvent(new CustomEvent("taskAdded", {
        detail: { 
            task: newTask 
        } // optional, you can pass the new task
    }));

    form.reset();
    form.style.display = "none";
    
  
}

export function handleDisplayTask(tasks) {

    let task = "";
 
    todoListTaskItem.innerHTML = "";
    todoListTask.innerHTML = "";
    console.log(todoListTaskItem);
 
 
     tasks.forEach((taskItem) => {
         task += `
         <div class="task__item">
             <div class="task__item-title">
                 <input type="checkbox" class="isDone" data-id="${taskItem.id}" />
                 <p>${taskItem.title}</p>
             </div>
 
             <div class="task__item-btn">
                 <button class="btn btn-details" data-id="${taskItem.id}">Details</button>
                 <div>${format(parseISO(taskItem.date), "MMMM d, yyyy")}</div>
 
                 <button class="btn btn-edit" data-source="inbox" data-id="${taskItem.id}">
                     <img src="${editIcon}" alt="Edit">
                 </button>
 
                 <button class="btn btn-delete" data-id="${taskItem.id}">
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
 
     handleViewTask();
     handleEditTask();
     handleDeleteTask();
     isDone();
}

export function handleViewTask() {
    
    let viewTaskDetails = "";

    const viewTaskInfo = document.createElement("div");
    viewTaskInfo.classList.add("task__modal-info")

    document.querySelectorAll(".btn-details").forEach((detailsBtn, index) => {
        detailsBtn.addEventListener("click", () => {
            const taskId = Number(detailsBtn.dataset.id);
            const task = myTodoList.find(taskItem => taskItem.id === taskId);
            viewTaskDetails = `
                <div class="task__modal-item">
                        <div class="btn task__btn-exit">
                            <button class="btn btn-exit">
                                <img src="${exitIcon}" alt="Exit">
                            </button>
                        </div>

                        <div class="task__modal-title">
                            <p>${task.title}</p>
                        </div>
                
                    <div class="task__modal-text">
                        <p>Description:  ${task.description}</p>
                        <p>Priority:  ${task.priority}</p>
                        <p>Due Date:   ${format(parseISO(task.date), "MMMM d, yyyy")}</p>
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

export function handleEditTask() {
    console.log("handleEditTask called"); // Debug log

    editTaskDetails.appendChild(saveEditBtn);
    editTaskDetails.appendChild(cancelEditBtn);
    editDetails.appendChild(editTaskDetails);
    form.appendChild(editDetails);

    const editButtons = document.querySelectorAll(".btn-edit");
    console.log("Found edit buttons:", editButtons.length);

    if(editButtons.length === 0) {
        console.log("No edit buttons found, skipping handleEditTask");
        return;
    }
    

    document.querySelectorAll(".btn-edit").forEach((editBtn, index) => {
        console.log("Found edit button:", editBtn); // Debug log
        console.log(`Found edit button ${index}:`, editBtn);
        
        editBtn.onclick = () => {  
            console.log("Edit button clicked!"); // Debug log
            const source = editBtn.dataset.source;
            console.log("Edit button source:", source);

            let taskId = Number(editBtn.dataset.id);
            console.log("Task ID:", taskId); // Debug log
            
            const taskIndex = myTodoList.findIndex(task => task.id === taskId);
            console.log("Task Index:", taskIndex); // Debug log
            currentEditIndex = taskIndex;

            // Check how many forms exist
            const allForms = document.querySelectorAll('.inbox__form');
            console.log("Number of inbox forms found:", allForms.length);

            form.style.display = "flex";
            editDetails.style.display = "flex";
            editTaskDetails.style.display = "flex";
            inboxActions.style.display = "none";

            // Debug: Check if styles were applied
            console.log("form display:", form.style.display);

            console.log("editDetails display:", editDetails.style.display);

            // pre-fill values
            titleTask.value = myTodoList[currentEditIndex].title;
            descriptionTask.value = myTodoList[currentEditIndex].description;
            priorityTask.value = myTodoList[currentEditIndex].priority;
            dateTask.value = myTodoList[currentEditIndex].date;
            
            // Debug the pre-filled values
            console.log("Pre-filled values:");
            console.log("Title:", titleTask.value);
            console.log("Description:", descriptionTask.value);
            console.log("Priority:", priorityTask.value);
            console.log("Date:", dateTask.value);
            
        };
    });

    // Debug save button
    saveEditBtn.onclick = () => {
        console.log("Save edit clicked, currentEditIndex:", currentEditIndex);
        
      
            let updatedTaskDetails = new Task(
                titleTask.value,
                descriptionTask.value,
                priorityTask.value,
                dateTask.value
            );

            console.log("Updated task details:", updatedTaskDetails);

            // preserve the original ID
            updatedTaskDetails.id = myTodoList[currentEditIndex].id;
            myTodoList[currentEditIndex] = updatedTaskDetails;

            console.log("Updated myTodoList:", myTodoList);

            // re-render tasks fresh
            localStorage.setItem("tasks", JSON.stringify(myTodoList));  

            document.dispatchEvent(new CustomEvent("taskUpdated", {
                detail: {
                    updatedTaskDetails
                }
            }))
            handleDisplayTask(myTodoList);
            todoListParent.appendChild(addTaskBtn);  
            form.style.display = "none";
            form.reset();
            addTaskBtn.style.display = "flex";
            
    };

    cancelEditBtn.onclick = () => {
        form.style.display = "none";
        form.reset();
    };
}

export function handleDeleteTask() {


    document.querySelectorAll(".btn-delete").forEach((button) => {
        button.onclick = (e) => {
            const taskId = e.currentTarget.dataset.id;
            // find the index of the task
            const index = myTodoList.findIndex(task => task.id == taskId);
            myTodoList.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(myTodoList));

            document.dispatchEvent(new CustomEvent("taskDeleted", {
                detail: {
                    myTodoList
                }
            }))

            handleDisplayTask(myTodoList);
            todoListParent.appendChild(addTaskBtn);
            form.reset();
        };
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

export function isDone() {

    document.querySelectorAll(".isDone").forEach((isCheck) => {
        isCheck.onclick = (e) => {
            const taskId = e.currentTarget.dataset.id;
             // find the index of the task
             const index = myTodoList.findIndex(task => task.id == taskId);
             myTodoList.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(myTodoList));

            document.dispatchEvent(new CustomEvent("doneTask", {
                detail: {
                    myTodoList
                }
            }))

            handleDisplayTask(myTodoList);
            todoListParent.appendChild(addTaskBtn);
        };
    });
    
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    handleCreateTask();
    form.reset();
    
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



cancelTaskBtn.addEventListener("click", () => {
    form.reset();
    form.style.display = "none";
    addTaskBtn.style.display = "flex";
});

inboxHelper();


    






export default todoListParent;