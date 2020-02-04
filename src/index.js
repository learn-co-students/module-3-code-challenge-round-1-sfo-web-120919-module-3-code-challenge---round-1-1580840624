let imageId = 4473
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

   //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchPicture().then(picture => renderPicture(picture))
  increaseLikes()
})

function fetchPicture(){
  return fetch(`https://randopic.herokuapp.com/images/${imageId}`).then(resp => resp.json())
}

function renderPicture(picture){
const imageContainer = document.getElementById('image')
const titleContainer = document.getElementById('name')
const likesContainer = document.getElementById('likes')
const commentsContainer = document.getElementById('comments')

imageContainer.src = `https://randopic.herokuapp.com/images/4473`;
titleContainer.innerText = picture.name
likesContainer.innerText = picture.like_count
//  debugger
commentsContainer.innerHTML += picture.comments.map(function(comment){
  return `<li> ${comment.content}</li>`
})
}

function increaseLikes(picture){
  const likeButton = document.getElementById('like_button')
  
  likeButton.addEventListener('click', function(event){
    // debugger
    let likeCount = parseInt(document.getElementById('likes').innerText)
    likeCount += 1
  })
}
function addComment(){
  const commentForm = document.getElementById('comment_form')

  commentForm.addEventListener('submit', function(event){
    let inputComment = document.getElementById('comment-input').value;
    

  })
}


//event.target.previousElementSibling.innerText.split(' ')[1]