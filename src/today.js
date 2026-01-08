import './style.css'
import { isToday, format, parseISO } from 'date-fns';
import { myTodoList } from './todo-list.js';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import exitIcon from '../assets/exit.svg';
import { createTaskForm } from './todo-list.js';
import { Task } from './todo-list.js';


let currentEditIndex = null;

function today() {
  
    const title = document.createElement("h1");
    title.classList.add("todo__title");
    title.textContent = "Today";

    const todayList = document.createElement("div");
    todayList.classList.add("today__list");

    const todayListItem = document.createElement("div");
    todayListItem.classList.add("today__list-item");

    const allTodayListItem = document.createElement("div");
    allTodayListItem.classList.add("today__list-item");

    const todayTaskModal = document.createElement("div");
    todayTaskModal.classList.add("task__modal-today");

    const viewTodayTaskInfo = document.createElement("div");
    viewTodayTaskInfo.classList.add("task__modal-today-info")

    const { form, 
            titleTask: todayTitleTask,
            descriptionTask: todayDescriptionTask,
            priorityTask: todayPriorityTask,
            dateTask: todayDateTask,
            inboxActions: todayActions,
            cancelTaskBtn 
        } = createTaskForm("today");


    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("today__add-task");
    
    const addIcon = document.createElement("div");
    addIcon.classList.add("add__task-icon");
    addIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`

    const taskBtn = document.createElement("button");
    taskBtn.classList.add("add__task-btn");
    taskBtn.textContent = "Add Task";


    //edit (save & cancel) button parent
    const editTaskDetails = document.createElement("div");
    editTaskDetails.classList.add("task__details-edit");

    const editDetails = document.createElement("div");
    editDetails.classList.add("task__details");

    //edit (save & cancel) button 
    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add("task__details-save");
    saveEditBtn.textContent = "Save Changes";
 
    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.classList.add("task__details-cancel");
    cancelEditBtn.textContent = "Cancel";

    taskBtn.appendChild(addIcon);
    addTaskBtn.appendChild(taskBtn);

    todayList.appendChild(title);
    todayList.appendChild(form);
    todayList.appendChild(addTaskBtn);
    
    todayList.appendChild(todayListItem);

    
    taskBtn.addEventListener("click", () => {
        form.style.display = "flex";
        todayActions.style.display = "flex";
        addTaskBtn.style.display = "none";
        editTaskDetails.style.display = "none";
        console.log("form opened:", form);
    });

    

    function helper() {
        //it triggers when a task (that has date today) created from inbox section.
        document.addEventListener("taskAdded", () => {
            renderTodayTasks(); 
        });

        //it triggers when a task has ben update, deleted, or done
        document.addEventListener("taskUpdated", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));
            handleDisplayTask(myTodoList);
        })

        document.addEventListener("taskDeleted", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));
            handleDisplayTask(myTodoList)
        })

        document.addEventListener("doneTask", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));
            handleDisplayTask(myTodoList)
        })
    }
    
    function handleCreateTask() {
        let title = todayTitleTask.value;
        let description = todayDescriptionTask.value;
        let priority = todayPriorityTask.value;
        let date = todayDateTask.value;
    
        let newTask = new Task(title, description, priority, date);
    
        myTodoList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(myTodoList));
        handleDisplayTask(myTodoList);
        
        // Broadcast event that a task was created
        document.dispatchEvent(new CustomEvent("todayTaskAdded", {
            detail: { task: newTask } // optional, you can pass the new task
        }));


        form.reset();
        form.style.display = "none";
    }

    function handleDisplayTask(task) {

        let todayTask = "";
        // todayListItem.innerHTML = "";

        task.forEach((taskToday) => {
            todayTask += `
                <div class="task__item">
                    <div class="task__item-title">
                        <input type="checkbox" class="isDone" data-id="${taskToday.id}" />
                        <p>${taskToday.title}</p>
                    </div>
    
                    <div class="task__item-btn">
                        <button class="btn btn__today-details" data-id="${taskToday.id}">Details</button>
                        <div>${format(parseISO(taskToday.date), "MMMM d, yyyy")}</div>
    
                        <button class="btn btn__today-edit" data-source="today" data-id="${taskToday.id}">
                            <img src="${editIcon}" alt="Edit">
                        </button>
    
                        <button class="btn btn__today-delete" data-id="${taskToday.id}">
                            <img src="${deleteIcon}" alt="Delete">
                        </button>
                    </div>
    
                    <div class="task-line"></div>
                </div>
            `;
        });

    
    
        todayListItem.innerHTML = todayTask;
        // todayList.appendChild(todayListItem);

        handleEditTask();
        handleViewTask(); 
        handleDeleteTask();
        isDone();
    }

    function handleViewTask() {
        
        let viewTodayTaskDetails = "";
        
            document.querySelectorAll(".btn__today-details").forEach((detailsBtn) => {
                detailsBtn.addEventListener("click", () => {
                    const taskId = Number(detailsBtn.dataset.id)
                    const task = myTodoList.find(taskItem => taskItem.id === taskId);
                    viewTodayTaskDetails = `
                        <div class="today-task__modal-item">
                                <div class="btn task__btn-exit">
                                    <button class="btn btn-exit">
                                        <img src="${exitIcon}" alt="Exit">
                                    </button>
                                </div>
        
                                <div class="today-task__modal-title">
                                    <p>${task.title}</p>
                                </div>
                        
                            <div class="today task__modal-text">
                                <p>Description:  ${task.description}</p>
                                <p>Priority:  ${task.priority}</p>
                                <p>Due Date:   ${task.date ? format(parseISO(task.date), "MMMM d, yyyy"): "No Due Date"}</p>
                            </div>
                        </div>
                    `
                    todayTaskModal.style.display = "flex";
        
                    viewTodayTaskInfo.innerHTML = viewTodayTaskDetails;
        
                    document.querySelector(".btn-exit").addEventListener("click", () => {
                        todayTaskModal.style.display = "none";
                        viewTodayTaskInfo.innerHTML = "";
                    });
                });
        
            });
        
            todayTaskModal.appendChild(viewTodayTaskInfo);
            todayList.appendChild(todayTaskModal);
    }

    function handleEditTask() {

        editTaskDetails.appendChild(saveEditBtn);
        editTaskDetails.appendChild(cancelEditBtn);
        editDetails.appendChild(editTaskDetails);
        form.appendChild(editDetails);

        
        document.querySelectorAll(".btn__today-edit").forEach((editTodayBtn) => {
            editTodayBtn.onclick = () => {  
                const source = editTodayBtn.dataset.source;
                let taskId = Number(editTodayBtn.dataset.id);
                console.log("Edit button source:", source);

                const taskIndex = myTodoList.findIndex(task => task.id === taskId);
                currentEditIndex = taskIndex;

                form.style.display = "flex";
                editDetails.style.display = "flex";
                editTaskDetails.style.display = "flex";
                todayActions.style.display = "none";

                // pre-fill values
                todayTitleTask.value = myTodoList[currentEditIndex].title;
                todayDescriptionTask.value = myTodoList[currentEditIndex].description;
                todayPriorityTask.value = myTodoList[currentEditIndex].priority;
                todayDateTask.value = myTodoList[currentEditIndex].date; 
             

            }     
        });
    
        saveEditBtn.onclick = () => {
            let updatedTaskDetails = new Task(
                todayTitleTask.value,
                todayDescriptionTask.value,
                todayPriorityTask.value,
                todayDateTask.value
            );
    
            // preserve the original ID
            updatedTaskDetails.id = myTodoList[currentEditIndex].id;
            
            myTodoList[currentEditIndex] = updatedTaskDetails;
    
            // re-render tasks fresh
            localStorage.setItem("tasks", JSON.stringify(myTodoList));  
            handleDisplayTask(myTodoList);

            // Create a custom event that will broadcast event that a task was created in today section
            document.dispatchEvent(new CustomEvent("todayUpdatedTask", {
                detail: {
                    task: updatedTaskDetails
                }
            }));

            form.style.display = "none";
            form.reset();
            // todayList.appendChild(addTaskBtn);
        };
    
        cancelEditBtn.onclick = () => {
            form.style.display = "none";
            form.reset();
        };
        
    }
    
    function handleDeleteTask() {

        document.querySelectorAll(".btn__today-delete").forEach((button) => {
            button.onclick = (e) => {
                const taskId = e.currentTarget.dataset.id;
                // find the index of the task
                const index = myTodoList.findIndex(task => task.id == taskId);
                myTodoList.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(myTodoList));
                handleDisplayTask(myTodoList);

                document.dispatchEvent(new CustomEvent("todayDeletedTask", {
                    detail: {
                        task: myTodoList
                    }
                }));

                form.reset();
                todayList.appendChild(addTaskBtn);
                
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

    function handleSubmit() {
        form.addEventListener("submit",  function(event) {
            event.preventDefault();
            handleCreateTask()
            form.reset();
            addTaskBtn.style.display = "flex";
            addTaskBtn.style.marginTop = "10px";
            addTaskBtn.style.justifyContent = "flex-start";
            taskBtn.style.backgroundColor = "white";
            taskBtn.style.color = "rgb(158, 158, 158)";
            addIcon.style.filter = "invert(19%) sepia(46%) saturate(6923%) hue-rotate(2deg) brightness(104%) contrast(73%)";
            todayList.appendChild(todayListItem);  
            todayList.appendChild(addTaskBtn);  
        });
    }

    function renderTodayTasks() {

        let allTodayTask = '';
        todayListItem.innerHTML = "";

        // only gets the task that has today date
        const isTodayTask = myTodoList.filter((task) =>
            isToday(parseISO(task.date))
        );

        if(isTodayTask.length > 0) {
            isTodayTask.forEach((todayTaskItem) => {
                allTodayTask += `
                    <div class="task__item">
                        <div class="task__item-title">
                            <input type="checkbox" class="isDone" data-id="${todayTaskItem.id}" />
                            <p>${todayTaskItem.title}</p>
                        </div>
        
                        <div class="task__item-btn">
                            <button class="btn btn__today-details" data-id="${todayTaskItem.id}">Details</button>
                            <div>${format(parseISO(todayTaskItem.date), "MMMM d, yyyy")}</div>
        
                            <button class="btn btn__today-edit" data-source="today" data-id="${todayTaskItem.id}">
                                <img src="${editIcon}" alt="Edit">
                            </button>
        
                            <button class="btn btn__today-delete" data-id="${todayTaskItem.id}">
                                <img src="${deleteIcon}" alt="Delete">
                            </button>
                        </div>
        
                        <div class="task-line"></div>
                    </div>
                `;
            });
    
            // Style adjustments for when tasks are present
            todayListItem.innerHTML = allTodayTask;
            addTaskBtn.style.display = "flex";
            addTaskBtn.style.marginTop = "10px";
            addTaskBtn.style.justifyContent = "flex-start";
            taskBtn.style.backgroundColor = "white";
            taskBtn.style.color = "rgb(158, 158, 158)";
            addIcon.style.filter = "invert(19%) sepia(46%) saturate(6923%) hue-rotate(2deg) brightness(104%) contrast(73%)";  
            todayList.appendChild(addTaskBtn);  

             // re-attach events for today
            handleEditTask(isTodayTask);
            handleViewTask(isTodayTask);
            handleDeleteTask();
            isDone();

        }else {
            // No tasks for today - show empty state
            addTaskBtn.style.display = "flex";
            addTaskBtn.style.marginTop = "10rem";
            addTaskBtn.style.justifyContent = "center";
            taskBtn.style.backgroundColor = "rgb(220, 60, 34)";
            taskBtn.style.color = "white";
            addIcon.style.filter = "brightness(0) invert(1)";
        }
        
        return todayListItem;
    }

    function isDone() {

        document.querySelectorAll(".isDone").forEach((isCheck) => {
            isCheck.addEventListener("change", (e) => {
                const taskId = e.currentTarget.dataset.id;
                 // find the index of the task
                 const index = myTodoList.findIndex(task => task.id == taskId);
                 myTodoList.splice(index, 1)
                localStorage.setItem("tasks", JSON.stringify(myTodoList));
                handleDisplayTask(myTodoList);


                document.dispatchEvent(new CustomEvent("todayDoneTask", {
                    detail: {
                        task: myTodoList
                    }
                }));

                todayList.appendChild(addTaskBtn);  
            });
        });
        

        
    }

    cancelTaskBtn.addEventListener("click", () => {
        form.reset();
        form.style.display = "none";
        addTaskBtn.style.display = "flex";
    });

   
    handleSubmit();
    helper();
   

    
    return todayList;
}




export default today;