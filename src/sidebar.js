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

    
    sidebarItemList.forEach((item) => {

        const itemList = document.createElement("li");
        itemList.classList.add("sidebar__item-list");
        
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = item.title;
        
        itemList.appendChild(link);       
        sidebarItem.appendChild(itemList);

        //the condition check the if the title is existing in sideBarItemList (item.title)
        if(link.textContent === item.title) {
                let renderPage =  renderPages[link.textContent];
                link.addEventListener('click', (e) => {
                 e.preventDefault();
                 todoListParent.innerHTML = "";
                 getTasks(link.textContent);
                 todoListParent.appendChild(renderPage());
                });
        }
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



  // if(link.textContent === "Inbox") {
        //     link.addEventListener('click', () => {
        //          todoListParent.innerHTML = "";
        //          todoListParent.appendChild(todoList());
        //     });
        // }else if(link.textContent === "Today") {
        //     link.addEventListener('click', () => {
        //         todoListParent.innerHTML = "";
        //         todoListParent.appendChild(today());
        //    });
        // }else {
        //     link.addEventListener('click', () => {
        //         todoListParent.innerHTML = "";
        //         todoListParent.appendChild(lastWeek());
        //    });
        // }