/**
 * Main logic module for what should happen on initial page load for Giffygram
 */



// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/DataManager.js"
import{PostList} from "./PostList.js"


const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}


const startGiffyGram = () => {
	showPostList();
}

startGiffyGram();

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
