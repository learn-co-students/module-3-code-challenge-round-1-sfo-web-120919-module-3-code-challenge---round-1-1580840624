document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4470

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()

  //increaseLikes()

  createComment()

  console.log("DOM is loaded")

})

//https://randopic.herokuapp.com/images/4470

function getImage() {
  fetch('https://randopic.herokuapp.com/images/4470')
  .then(resp => resp.json())
  .then( myImage => {
     const img = document.querySelector('#image');
     const name = document.querySelector('#name');
     const likeCount = document.querySelector('#likes');

     const commentsUl = document.querySelector('#comments');
    

     img.src = myImage.url;
     name.textContent = myImage.name;
     likeCount.textContent = myImage.like_count;
     commentsUl.innerHTML = `<li>${myImage.comments[0]["content"]}<li>`
     
     
  })
}



//submit post request upon submitting a comment


function createComment () {
  const commentUl = document.querySelector('#comments')
  
  const commentForm = document.querySelector('#comment_form')
  
  commentForm.addEventListener('submit', function(event){
    event.preventDefault;

    //get input values
    const commentText = document.querySelector('#comment_input').value 
    //const myImageUrl = document.querySelector('#image').src

    const data = {
      
           };
    fetch('https://randopic.herokuapp.com/comments'{
     method: "POST",
     body: JSON.stringify(data),
       headers: { "Content-Type": "application/json" }
    })
    .then(resp => resp.json())  
    .then(newComment => {
        const commentForm = document.querySelector('#comment_form')
        commentForm.innerHTML += <li>${newComment}</li>
            });   
    
  })
  //inside event listener above



}

