let imageId = 4466 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4466 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  //functions
  // updateLikes()
  getImages()
  updateLikes()
  addComments()
})



function updateLikes(){
const likes = document.getElementById('likes')
const likeBtn = document.getElementById('like_button')
// const likeCount = parseJS

// debugger;
likeBtn.addEventListener('click', function(event){
  console.log(event.target)
  console.log('like')
})
}

function addComments() {
  const commentForm = document.getElementById('comment_form') 
  
// debugger;
  commentForm.addEventListener('submit', function(event){
    event.preventDefault()
    fetch(commentsURL,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId ,
          content: event.target.value
        })
      },
      ) 
    .then(res => res.json())
    .then(comments => {
      const commentSpace = document.getElementById('comments')
        console.log(commentSpace)
        commentSpace.innerHTML += comments
    })
  })
  


  // debugger;
}


function getImages() {
  const imageContainer = document.getElementById('image_content')
  const imageSrc = document.getElementById('image')

  fetch(imageURL)
  .then(res => res.json())
  .then(image => {
    // console.log(imageSrc)
    // imageSrc.innerHTML += renderTheImage(image)
    imageContainer.innerHTML += renderImage(image) //it said just one image..
    console.log(image)
    // console.log(image.comments)
  })
}



// function renderTheImage(image) {
//   return `<img src="${image.url}" id="image" data-id="${image.id}"/>`
// }


function renderImage(image) {
  return `<div id="image_card" class="card col-md-4">
  <img src="${image.url}" id="image" data-id="${image.id}"/>
  <h4 id="name">"${image.name}"</h4>
  <span>Likes: 
    <span id="likes">"${image.like_count}"</span>
  </span>
  
 
          <ul id="comments">
               <li>
                  ${image.comments.map(comment => {
                    return comment.content
                  })}
               </li>
          </ul>
          </div>`
}


