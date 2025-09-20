import { parseISO, isWithinInterval, subWeeks, startOfWeek, endOfWeek, format} from "date-fns";
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import exitIcon from '../assets/exit.svg';
import { myTodoList, handleDisplayTask, createTaskForm, Task} from "./todo-list.js";



function lastWeek() {
    
    let currentEditIndex = null;

    const title = document.createElement("h1");
    title.classList.add("todo__title");


    const lastWeekList = document.createElement("div");
    lastWeekList.classList.add("lastweek__list");

    const lastWeekListItem = document.createElement("div");
    lastWeekListItem.classList.add("lastweek__list-item");

    title.textContent = "Last Week"
    

    const lastWeekTaskModal = document.createElement("div");
    lastWeekTaskModal.classList.add("task__modal");

        const {
            form,
            titleTask: laskWeekTitleTask,
            descriptionTask: lastWeekDescriptionTask,
            priorityTask: lastWeekPriorityTask,
            dateTask: lastWeekDateTask,
            inboxActions: lastWeekActions,
            saveTaskBtn,
            cancelTaskBtn
          } = createTaskForm("lastWeek");
    
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


       lastWeekList.appendChild(title);
       lastWeekList.appendChild(form);
       form.style.display = "none";

       function getTaskDate(date) {
        return typeof date === "string" ? parseISO(date) : date;
    }

    function renderLastWeekTasks() {

        let lastWeekTask = "";
        lastWeekListItem.innerHTML = "";

        //get the date today
        const today = new Date();

         // Load all tasks from localStorage
         let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

         const isLastWeekTask = myTodoList.filter((task) => {
            const taskDate = getTaskDate(task.date);

        
            return isWithinInterval(taskDate, {
                start: startOfWeek(subWeeks(today, 1)),  // start of last week
                end: endOfWeek(subWeeks(today, 1))       // end of last week
            });
        });

        if(isLastWeekTask.length > 0) {
            isLastWeekTask.forEach((lastWeekItem) => {
                lastWeekTask += `
                                    <div class="task__item">
                                        <div class="task__item-title">
                                            <input type="checkbox" class="isDone" data-id="${lastWeekItem.id}" />
                                            <p>${lastWeekItem.title}</p>
                                        </div>
                        
                                        <div class="task__item-btn">
                                            <button class="btn btn__lastweek-details" data-id="${lastWeekItem.id}">Details</button>
                                            <div>${format(parseISO(lastWeekItem.date), "MMMM d, yyyy")}</div>
                        
                                            <button class="btn btn__lastweek-edit" data-source="last-week" data-id="${lastWeekItem.id}">
                                                <img src="${editIcon}" alt="Edit">
                                            </button>
                        
                                            <button class="btn btn__lastweek-delete" data-id="${lastWeekItem.id}">
                                                <img src="${deleteIcon}" alt="Delete">
                                            </button>
                                        </div>
                        
                                        <div class="task-line"></div>
                                    </div>
                                `;
            });
        }else {
            console.log("There's no tasks from last week.")
        }


        lastWeekListItem.innerHTML = lastWeekTask;
        lastWeekList.appendChild(lastWeekListItem);

        handleViewTask();
        handleEditTask();
        handleDeleteTask();
        handleCompletedTask();
        helper();

        return lastWeekList;
    }

    // add View, Delete, completed task functions 
    function handleViewTask() {

        let viewTaskLastWeekDetails = "";

        const viewTaskInfo = document.createElement("div");
        viewTaskInfo.classList.add("task__modal-lastweek-info")

        document.querySelectorAll(".btn__lastweek-details").forEach((detailsBtn) => {
            detailsBtn.addEventListener("click", () => {
                console.log("clicked")
                const taskId = Number(detailsBtn.dataset.id);
                const task = myTodoList.find(taskItem => taskItem.id === taskId);
                viewTaskLastWeekDetails = `
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
            lastWeekTaskModal.style.display = "flex";

            viewTaskInfo.innerHTML = viewTaskLastWeekDetails;

                document.querySelector(".btn-exit").addEventListener("click", () => {
                    lastWeekTaskModal.style.display = "none";
                    viewTaskInfo.innerHTML = ""
                });
            });

        });



        lastWeekTaskModal.appendChild(viewTaskInfo);
        lastWeekList.appendChild(lastWeekTaskModal);

    }

    function handleEditTask() {
        editTaskDetails.appendChild(saveEditBtn);
        editTaskDetails.appendChild(cancelEditBtn);
        editDetails.appendChild(editTaskDetails);
        form.appendChild(editDetails);

        document.querySelectorAll(".btn__lastweek-edit").forEach((editLastWeekBtn) => {
            editLastWeekBtn.onclick = () => {
                const source = editLastWeekBtn.dataset.source
                let taskId = Number(editLastWeekBtn.dataset.id)
                console.log("Edit button source:", source);
                
                const taskIndex = myTodoList.findIndex(task => task.id === taskId);
                currentEditIndex = taskIndex;

                form.style.display = "flex";
                editDetails.style.display = "flex";
                editTaskDetails.style.display = "flex";
                lastWeekActions.style.display = "none";
                
                // pre-fill values
                laskWeekTitleTask.value = myTodoList[currentEditIndex].title;
                lastWeekDescriptionTask.value = myTodoList[currentEditIndex].description;
                lastWeekPriorityTask.value = myTodoList[currentEditIndex].priority;
                lastWeekDateTask.value = myTodoList[currentEditIndex].date;                 
            }
        });

        saveEditBtn.onclick = (e) => {
            e.preventDefault(); 

            let updatedTaskDetails = new Task(
                laskWeekTitleTask, lastWeekDescriptionTask, lastWeekPriorityTask, lastWeekDateTask)

                 // preserve the original ID
                updatedTaskDetails.id = myTodoList[currentEditIndex].id;

                myTodoList[currentEditIndex] = updatedTaskDetails;

                // re-render tasks fresh
                localStorage.setItem("tasks", JSON.stringify(myTodoList));  
                renderLastWeekTasks();
                document.dispatchEvent(new CustomEvent("lastWeekUpdatedTask", {
                    detail: {
                        task: updatedTaskDetails
                    }
                }));

                form.style.display = "none";
                form.reset();
        }

        cancelEditBtn.onclick = () => {
            form.style.display = "none";
            form.reset();
        };
        
    }

    function handleDeleteTask() {

        document.querySelectorAll(".btn__lastweek-delete").forEach((button) => {
            button.onclick = (e) => {
                const taskId = e.currentTarget.dataset.id;
                const index = myTodoList.findIndex(task => task.id == taskId);
                myTodoList.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(myTodoList));
                renderLastWeekTasks();

                document.dispatchEvent(new CustomEvent("lastWeekDeletedTask", {
                    detail: {
                        task: myTodoList
                    }
                }));

                form.reset();
            }
        }); 
    }

    function handleCompletedTask() {

        document.querySelectorAll(".isDone").forEach((isDone) => {
            isDone.addEventListener("change", (e) => {
                const taskId = e.currentTarget.dataset.id;
                const index = myTodoList.findIndex(task => task.id === taskId);

                myTodoList.splice(index, 1);

                document.dispatchEvent(new CustomEvent("lastWeekDoneTask", {
                    detail: {
                        task: myTodoList
                    }
                }))
            })

        })
    }

    function helper() {
        document.addEventListener("taskAdded", () => {
            renderLastWeekTasks();
        })

        document.addEventListener("taskUpdate", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));
            renderLastWeekTasks();
        })

        document.addEventListener("taskDeleted", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));
            renderLastWeekTasks();
        })

        document.addEventListener("doneTask", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));
            renderLastWeekTasks();
        })

        //it triggers when a task created from today section.
        document.addEventListener("todayTaskAdded", (e) => {
            console.log("Inbox received new task:", e.detail.task);
            localStorage.setItem("tasks", JSON.stringify(myTodoList));  
            handleDisplayTask(myTodoList); // auto-refresh today section
            form.reset();
            form.style.display = "none";
        });
        
        //it triggers when a task updated, deleted, or done in today section
        document.addEventListener("todayUpdatedTask", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));  
            handleDisplayTask(myTodoList); 
            form.reset();
            form.style.display = "none";
            todoListParent.appendChild(addTaskBtn);  
        });

        document.addEventListener("todayDeletedTask", () => {
            localStorage.setItem("tasks", JSON.stringify(myTodoList));  
            handleDisplayTask(myTodoList); 
            form.reset();
            form.style.display = "none";
            todoListParent.appendChild(addTaskBtn);  
        });

        document.addEventListener("todayDoneTask", () => {
            localStorage.setItem('tasks', JSON.stringify(myTodoList));
            handleDisplayTask(myTodoList); 
            form.reset();
            form.style.display = "none";
            todoListParent.appendChild(addTaskBtn);
        })

    }


    renderLastWeekTasks();  




    return lastWeekList;
}



export default lastWeek;