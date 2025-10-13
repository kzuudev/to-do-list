import todoListParent from "./todo-list.js";
import today from './today';
import lastWeek from './lastWeek';
import project, { projectHeader, projectAddBtn, projectAdd }from './project.js';
import './style.css'

function todoList() {
    return todoListParent
}

function projectsPage() {
    return project
}


function sidebar() {

    const todoListParent = document.getElementById("todo-list");
    
    const sidebarItem = document.createElement("div");
    sidebarItem.classList.add("sidebar__item");

    const sidebarItemList = [
        { title: "Inbox",},
        { title: "Today",},
        { title: "Last Week",},
 
    ]

    const renderPages = {
        "Inbox": () => todoList(),
        "Today": () => today(),
        "Last Week": () => lastWeek(),
        [projectHeader.textContent]: () => projectsPage()
    };
    
    const pageSections = {} // store the actual DOM nodes

    // render the pages all once
    for(let key in renderPages) {
        const section = renderPages[key]() // return function and the DOM element that page creates.
        todoListParent.appendChild(section);
        section.style.display = "none";
        pageSections[key] = section; 
        console.log( pageSections[key] = section)
    }

    sidebarItemList.forEach((item) => {

        const itemList = document.createElement("li");
        itemList.classList.add("sidebar__item-list");
        
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = item.title;
        
        itemList.appendChild(link);       
        sidebarItem.appendChild(itemList);
          
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            for(let page in pageSections) {
                pageSections[page].style.display = "none";
                
            }

            pageSections[link.textContent].style.display = "block";
            });
        });

        const projectListItem = document.createElement("li");
        projectListItem.classList.add("sidebar__item-list");
        projectListItem.appendChild(projectAdd);  // contains My Projects + button
        sidebarItem.appendChild(projectListItem);

        // handle My Projects click manually
        projectListItem.addEventListener("click", (e) => {
            e.preventDefault();
        
            // hide all pages first
            for (let page in pageSections) {
            pageSections[page].style.display = "none";
            }
        
            // show My Projects section
            pageSections["My Projects"].style.display = "block";
        });
  
      
    return sidebarItem;

    
}






export default sidebar;


