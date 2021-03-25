import {getLikes} from "../data/DataManager.js";
// Since we know the HTML element for likes is on the DOM, we can target it 
// in the getNumberOfLikes method.
const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}

export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}"/>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <div><button id="delete__${postObject.id}">Delete</button></div>
        <div><button id="edit__${postObject.id}">Edit</button><div>
      </section>
    `
  }