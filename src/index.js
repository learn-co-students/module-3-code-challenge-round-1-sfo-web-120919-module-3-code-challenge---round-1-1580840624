//user is able to see IMAGE, COMMENTS of that said image, # of LIKES image has. 
//render images from imageURL, like from likeURL, comments from commentURL
//like button 

let imageId = 4475
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const oneImage = document.getElementById('.container')
  document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchIMG();
  increaseLikes();
})

function renderSingleImg(image){
  const imageContainer = document.getElementById("image_card")

    imageContainer.innerHTML = "";
    imageContainer.innerHTML += `
   <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
          <span>Likes:
            <span id="likes">${image.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
               <!-- <li> for each comment goes here -->
          </ul>
  `
  
}

function increaseLikes(likes) {
const imageContainer = document.getElementById("image_card");
imageContainer.addEventListener('click', function(event){
  let likeButton = event.target.id === "like_button"
    let like = event.target.id
    let likeCount = parseInt(event.target.id.innerText)
    like.innerText = `${++likeCount}`
    let imageId = event.target.previousElementSibling.previousElementSibling.previousElementSibling.dataset.id
    fetch(likeURL, {
      method: "POST", 
    
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
        })
    })
    
    
    })
  }

function fetchIMG() {

  return fetch(imageURL)
  .then(res => res.json())
  .then(renderSingleImg)
}