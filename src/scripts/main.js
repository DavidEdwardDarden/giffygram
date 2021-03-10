/**
 * Main logic module for what should happen on initial page load for Giffygram
 */



// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/DataManager.js"
import { NavBar } from "./nav/NavBar.js";
import{PostList} from "./feed/PostList.js";
import{Footer} from"./nav/Footer.js";



const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
    console.log(allPosts)
		postElement.innerHTML = PostList(allPosts);
	})
}

const applicationElement = document.querySelector(".mainbla")
applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWhith ("edit")){
		console.log("post clicked", event.target.id.split("--"))
    console.log("the id is", event.target.id.split("--")[1])
	}
})

const startGiffyGram = () => {
	showPostList();
}

startGiffyGram();

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/

const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
navElement.innerHTML = NavBar();
}

showNavBar();
showPostList();

const showFooter = () => {
  const  footerElement = document.querySelector("footer");
  footerElement.innerHTML = Footer();
}
showFooter();