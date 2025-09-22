
import './style.css';
import sidebar  from './sidebar'
import todoList from './todo-list';
import today from './today';
import project , { projectSideBar }from './project';



const sidebarParent = document.getElementById("sidebar");
const todoListParent = document.getElementById("todo-list");
const todayListParent = document.getElementById("today-list");


const sidebarItem = sidebar();
// const projectList = project;
// const todoListItem = todoList();
// const todayListItem = today();


sidebarParent.appendChild(sidebarItem);

// sidebarParent.appendChild(projectList);
// todoListParent.appendChild(todoListItem);
// todayListParent.appendChild(todayListItem);






