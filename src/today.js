import { isToday, parse, isWithinInterval, subDays, format } from 'date-fns';
import { myTodoList } from './todo-list.js';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import exitIcon from '../assets/exit.svg';
import { createTaskForm } from './todo-list.js';
import { Task } from './todo-list.js';
import { da } from 'date-fns/locale';





function today() {
    let currentEditIndex = null;
    
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
    todayTaskModal.classList.add("task__modal");

    const { inboxForm, inboxActions, titleTask, descriptionTask, priorityTask, dateTask, cancelTaskBtn } = createTaskForm();

    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("todo__add-task");
    
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
    todayList.appendChild(addTaskBtn);
    todayList.appendChild(inboxForm);
    
    taskBtn.addEventListener("click", () => {
        inboxForm.style.display = "flex";
        inboxActions.style.display = "flex";
        addTaskBtn.style.display = "none";
    });

    function handleCreateTask() {

            let title =  titleTask.value;
            let description =  descriptionTask.value;
            let priority =  priorityTask.value;
            let date =  dateTask.value;
            
            let newTodayTask = new Task(title, description, priority, date);
            myTodoList.push(newTodayTask);
            console.log(myTodoList);
        
        
            inboxForm.style.display = "none";
            handleDisplayTask(myTodoList);
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
            handleDisplayTask(myTodoList);
    
            inboxForm.style.display = "none";
            inboxForm.reset();
    
            todayList.appendChild(addTaskBtn);
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
               handleDisplayTask(myTodoList);
               todayList.appendChild(addTaskBtn);  
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

    function handleViewTask(item) {
        

    let viewTaskDetails = "";
    
        // const viewTaskModal = document.createElement("div");
        // viewTaskModal.classList.add("task__modal-view");
    
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
                todayTaskModal.style.display = "flex";
    
                viewTaskInfo.innerHTML = viewTaskDetails;
    
                document.querySelector(".btn-exit").addEventListener("click", () => {
                    todayTaskModal.style.display = "none";
                    viewTaskInfo.innerHTML = "";
                });
            });
    
        });
    
        todayTaskModal.appendChild(viewTaskInfo);
    
        todayList.appendChild(todayTaskModal);
    }

    function handleDisplayTask(task) {

        let todayTask = "";
        let allTodayTask = "";

        const isTodayDate = myTodoList.filter((task) =>
            isToday(parse(task.date, 'MMMM d, yyyy', new Date()))
        );
    
        console.log(isTodayDate);
    
        task.forEach((taskToday) => {
            todayTask += `
                <div class="task__item">
                    <div class="task__item-title">
                        <p>${taskToday.title}</p>
                    </div>
    
                    <div class="task__item-btn">
                        <button class="btn btn-details">Details</button>
                        <div>${taskToday.date}</div>
    
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

        isTodayDate.forEach((allTaskToday) => {
            allTodayTask += `
                <div class="task__item">
                    <div class="task__item-title">
                        <p>${allTaskToday.title}</p>
                    </div>
    
                    <div class="task__item-btn">
                        <button class="btn btn-details">Details</button>
                        <div>${allTaskToday.date}</div>
    
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
    
        todayListItem.innerHTML = todayTask;
        allTodayListItem.innerHTML = allTodayTask;
        todayList.appendChild(allTodayListItem);
        todayList.appendChild(todayListItem);

        handleEditTask(myTodoList);
        handleDeleteTask();
        handleViewTask(myTodoList) 
    }


    inboxForm.addEventListener("submit",  function(event) {
        event.preventDefault();
        console.log("Form submitted");
        handleCreateTask()
        inboxForm.reset();
        addTaskBtn.style.display = "flex";
        addTaskBtn.style.marginTop = "10px";
        addTaskBtn.style.justifyContent = "flex-start";
        taskBtn.style.backgroundColor = "white";
        taskBtn.style.color = "rgb(158, 158, 158)";
        addIcon.style.filter = "invert(19%) sepia(46%) saturate(6923%) hue-rotate(2deg) brightness(104%) contrast(73%)";
        todayList.appendChild(todayListItem);  
        todayList.appendChild(addTaskBtn);  
    });

    cancelTaskBtn.addEventListener("click", () => {
        inboxForm.reset();
        inboxForm.style.display = "none";
        addTaskBtn.style.display = "flex";
    });
    








   


    return todayList;
}



export default today;