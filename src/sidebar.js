import todoList, { myTodoList } from './todo-list';
import today from './today';
import lastWeek from './lastWeek';


//central storage
let fetchTask = {
    "Inbox": [],
    "Today": [],
    "Last Week": [],
};


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
    };

    const pageSections = {} // store the actual DOM nodes

    //render the pages all once
    for(let key in renderPages) {
        const section = renderPages[key]() //return function and the DOM element that page creates.
        todoListParent.appendChild(section);
        section.style.display = "none";
        pageSections[key] = section; 
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

    return sidebarItem;

    
}

function projectUI() {

    const sidebarItem = document.createElement("div");
    sidebarItem.classList.add("sidebar__item");

    const project = document.createElement("li");
    project.classList.add("sidebar__item-project");

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = "My Projects";

    project.appendChild(link);

    sidebarItem.appendChild(project);

    return sidebarItem;
}

function getTasks(category) {
    return fetchTask[category];
}






export default sidebar;
export { projectUI };

