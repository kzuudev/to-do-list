import { parseISO, isWithinInterval, subWeeks, startOfWeek, endOfWeek, format} from "date-fns";
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import exitIcon from '../assets/exit.svg';
import { handleViewTask, handleEditTask, handleDeleteTask, isDone, myTodoList, currentEditIndex, inboxHelper } from "./todo-list.js";



function lastWeek() {
    
    const title = document.createElement("h1");
    title.classList.add("todo__title");


    const lastWeekList = document.createElement("div");
    lastWeekList.classList.add("lastweek__list");

    const lastWeekListItem = document.createElement("div");
    lastWeekListItem.classList.add("lastweek__list-item");


    title.textContent = "Last Week"
    lastWeekList.appendChild(title);
    // let lastWeekTasks = [];


    function renderLastWeekTasks() {

        let lastWeekTask = "";
        lastWeekListItem.innerHTML = "";

        //get the date today
        const today = new Date();

         // Load all tasks from localStorage
         let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

         const isLastWeekTask = myTodoList.filter((task) => {
            const taskDate = parseISO(task.date);
        
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
                                            <button class="btn btn-details" data-id="${lastWeekItem.id}">Details</button>
                                            <div>${format(parseISO(lastWeekItem.date), "MMMM d, yyyy")}</div>
                        
                                            <button class="btn btn-edit" data-source="inbox" data-id="${lastWeekItem.id}">
                                                <img src="${editIcon}" alt="Edit">
                                            </button>
                        
                                            <button class="btn btn-delete" data-id="${lastWeekItem.id}">
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

   

    }

    // add Read, Delete, isDone functions 
    handleViewTask();
    handleEditTask(); 
    handleDeleteTask(); 
    isDone();
    renderLastWeekTasks();
    inboxHelper();
    return lastWeekList;
}



export default lastWeek;