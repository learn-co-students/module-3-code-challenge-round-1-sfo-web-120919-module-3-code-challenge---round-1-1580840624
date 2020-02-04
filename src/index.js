
(() => {

  const imageId = 4465 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  document.addEventListener('DOMContentLoaded', () => {
   
     getImage().then(checkForErrors).then(resp => resp.json()).then(data => {
       setImageInfo(data)
     }).catch(error => renderErrors(error))

     listenForLikeClick()
     listenForCommentFormSubmit()
    
  })

  // listeners

  function listenForLikeClick() {
    const likeButton = document.querySelector("#like_button")
    const likeSpan = document.querySelector("#likes")
    likeButton.addEventListener('click', function(){
            incrementInnerTextNum(likeSpan)
            postLike(imageId).then(checkForErrors).then(resp => resp.json()).catch(error => render(error))
    });
  }

  function listenForCommentFormSubmit() {
     const form = document.querySelector("#comment_form")
     form.addEventListener('submit', function(e){
        e.preventDefault();
        const commentContent = document.querySelector("#comment_input").value
        const newCommentObj = createCommentObject(commentContent)
        addCommentLiToDOM(makeCommentLi(newCommentObj))
        clearCommentForm()
        postComment(imageId, commentContent).then(checkForErrors).then(resp => resp.json()).catch(error => renderErrors(error))
     })
  }
   
  // api communication functions

  function getImage() {
    return fetch(imageURL)
  }

  function postLike(imageId) {
    const configuration = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({image_id: imageId})
    }
    return fetch(likeURL, configuration)
  }

  function postComment(imageId, commentContent) {
    const configuration = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentContent
      })
    }
    return fetch(commentsURL, configuration)
  }

  // update dom


  function setImageInfo(imageData) {

    // get element references
    const imageElement = document.querySelector("#image")
    const nameElement = document.querySelector("#name")
    const likesElement = document.querySelector("#likes")
    const commentsElement = document.querySelector("#comments")
    // set dom values
    imageElement.src = imageData.url
    nameElement.innerText = imageData.name 
    likesElement.innerText = imageData.like_count
    imageData.comments.forEach(comment => addCommentLiToDOM(makeCommentLi(comment)))


  } 

  function clearCommentForm() {
    const commentContent = document.querySelector("#comment_input")
    commentContent.value = ""
  }

  function incrementInnerTextNum(element) {
    let currentValue = parseInt(element.innerText);
    currentValue += 1
    element.innerText = currentValue
  }

  function addCommentLiToDOM(commentLi) {
    const commentsElement = document.querySelector("#comments")
    commentsElement.append(commentLi)
    
  }

  // create html

  function makeCommentLi(comment) {
    const li = document.createElement("li")
    li.id = (comment.id) ? comment.id : ""
    li.className = comment.image_id
    li.innerText = comment.content
    return li
  }

  // additional helpers
  function createCommentObject(textContent) {
    const newCommentObject = {}
    newCommentObject.image_id = imageId
    newCommentObject.content = textContent
    return newCommentObject
  }

  // error handling

   async function checkForErrors(response) {
       
         if (!response.ok) {
           throw new Error("something went wrong.")
         }

         return response

   }

   function renderErrors(error) {
     const errorDiv = document.querySelector("#error")
     errorDiv.innerText = error.message
     setTimeout(() => {
        errorDiv.innerText = ""
     }, 5000)
   }
  



})()

// {
//   "id": 1,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
//   "name": "The Internet!",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 5941,
//       "content": "first comment!",
//       "image_id": 1158,
//       "created_at": "2018-10-18T17:06:14.859Z",
//       "updated_at": "2018-10-18T17:06:14.859Z"
//     }
//   ]
// }


