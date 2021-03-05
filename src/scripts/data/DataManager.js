export const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
}
//COMMENT
const loggedInUser = {
    id: 1,
    name: "David",
    email: "david@webdevpro.com"
}

export const getLoggedInUser = () => {
    return loggedInUser;
}