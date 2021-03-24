/**
 * Main logic module for what should happen on initial page load for Giffygram
 */



// Can you explain what is being imported here?

import { deletePost, getSinglePost, getPosts, updatePost, getUsers, logoutUser, usePostCollection, getLoggedInUser, createPost } from "./data/DataManager.js"

import{PostList} from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import{Footer} from"./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import {PostEdit} from "./feed/PostEdit.js"
import {RegisterForm} from "./auth/RegisterForm.js"

const applicationElement = document.querySelector(".giffygram");
const footerElement = document.querySelector("footer");


applicationElement.addEventListener("click", (event) => {
	console.log('click edit');
	
	if (event.target.id.startsWith("edit")) {
		console.log("post clicked", event.target.id.split("--"));
		console.log("zero index value", event.target.id.split("--")[0]);
		console.log("one index value, the id is", event.target.id.split("--")[1]);
	}
})

applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	  const yearAsNumber = parseInt(event.target.value)
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	  //invoke a filter function passing the year as an argument
	  showFilteredPosts(yearAsNumber);
	}
  })

  applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
	}
  })
  
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: getLoggedInUser().id,
		  timestamp: Date.now()
	  }
  
	// be sure to import from the DataManager
		createPost(postObject)
		.then(response => {
			console.log("what is the new post response", response)
			showPostList();
		})
	}
  })

//   I added this part while watching Brenda do it on Monday the 23rd... it is also in the instructions
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
	  const postId = event.target.id.split("__")[1];
	  deletePost(postId)
		.then(response => {
		  showPostList();
		})
	}
})
  
//logout user
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	}
  })

  const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
	  if (singlePost.timestamp >= epoch) {
		return singlePost
	  }
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
  }

const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts.reverse());
	})
}

const showNavBar = () => {
	//Get a reference to the location on the DOM where the nav will display
	const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}
const showFooter = () => {
	//Get a reference to the location on the DOM where the footer will display
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }

//   invoke checkForUser
//   If there is a user, set the user in the DataManager (write a function to set the user)
//   If there is a user, invoke startGiffyGram
//   If there is not a user, show login/register




/*
	This function performs one, specific task.
	1. Can you explain what that task is?
	2. Are you defining the function here or invoking it?
*/
const startGiffyGram = () => {
	showNavBar();
	showPostEntry()
	showPostList();
	showFooter();
}

//get lastes post from database
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
	  const postId = event.target.id.split("__")[1];
	  getSinglePost(postId)
		.then(response => {
		  showEdit(response);
		})
	}
  })

  const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
  }

  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
	  const postId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  const timestamp = document.querySelector("input[name='postTime']").value
	  
	  const postObject = {
		title: title,
		imageURL: url,
		description: description,
		userId: getLoggedInUser().id,
		timestamp: parseInt(timestamp),
		id: parseInt(postId)
	  }
	//get rid of the form
	  showPostEntry();

	  updatePost(postObject)
		.then(response => {
		  showPostList();
		})
	}
  })

  
//   We can now finish the conditional in the checkForUser 
// function and write a function to display the LoginForm and
//  RegisterForm.
  const checkForUser = () => {
	if (sessionStorage.getItem("user")){
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
	  startGiffyGram();
	}else {
		 showLoginRegister();
	}
}

const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
}


// User completes login form
// Click submit button
// Collect the user information into an object
// Use GET to call the database looking for a user
// If a matching user returns, setLoggedInUser in the DataManager AND
// Set the user in the sessionStorage
// Invoke startGiffyGram
// If no user found in DB, let the user know they should register.
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	  }
	  loginUser(userObject)
	  .then(dbUserObj => {
		if(dbUserObj){
		  sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		  startGiffyGram();
		}else {
		  //got a false value - no user
		  const entryElement = document.querySelector(".entryForm");
		  entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		}
	  })
	}
  })


//   User completes register form
// Click submit button
// Collect the user information into an object
// Use POST with the user object to add the user to the database.
// Use the response to setLoggedInUser in the DataManager AND
// Set the user in the sessionStorage
// Invoke startGiffyGram
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	  }
	  registerUser(userObject)
	  .then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
	  })
	}
  })

//Be sure to clear the sessionStorage and invoke checkForUser to re-render the app.
  applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	  sessionStorage.clear();
	  checkForUser();
	}
  })


// Are you defining the function here or invoking it?
checkForUser();
