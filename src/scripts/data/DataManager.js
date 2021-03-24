export const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}
export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse
      return parsedResponse;
    })
}

export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
}

let loggedInUser = {
  id: 1,
  name: "David",
  email: "david@webdevpro.com"
}

export const getLoggedInUser = () => {
  return {...loggedInUser};
}


export const logoutUser = () => {
  loggedInUser = {}
}


// method that will delete an item from the database
export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }

  })
      .then(response => response.json())
      .then(getPosts)
}


// The second step was to write a function to set the user in the DataManger
export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;

//get a single post from the database
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}

//updates the database
export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
      .then(getPosts)

}
}


// a function that requests the user information from the database. 
// One feature of json-server is the ability to filter the data. Be 
// sure to checkout the json-server documentation.
export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
  .then(response => response.json())
  .then(parsedUser => {
    //is there a user?
    console.log("parsedUser", parsedUser) //data is returned as an array
    if (parsedUser.length > 0){
      setLoggedInUser(parsedUser[0]);
      return getLoggedInUser();
    }else {
      //no user
      return false;
    }
  })
}


// In the DataManager we need to create a function 
// that POST a new user to the users table. This 
// returns an object with the user's information including the id.
export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(parsedUser => {
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}


// Now that we have multiple users, we want to know the author
//  of a post. Refactor the getPosts method and use the json-server 
//  feature to expand on the user.
export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
}