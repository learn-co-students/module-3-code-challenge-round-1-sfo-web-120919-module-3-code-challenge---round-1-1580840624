document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4468
   //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchData(imageURL);  //fetch the data from api
  listenForLike();      //hit like button on page
  addComment();         //add comments for the image
  // deleteComment();          //delete the comments for the image
})

//delete the comments for the image
function deleteComment()
{
  let deleteElements = document.querySelectorAll(".delete-comment")
  Array.from(deleteElements).forEach(button => {
    console.log(button)
    button.addEventListener('click','handleDelete')
  })
}

function handleDelete()
{
  console.log("I am going to be deleted")
}


//add comments for the image
function addComment()
{
  document.getElementById("comment_form").addEventListener('submit',handleComment);
}

function handleComment(event)
{
  imageId = 4468;
  event.preventDefault();
  let newComment = event.target.comment_input.value;
  const ulEle = document.getElementById("comments");
  let display = `<li>${newComment}&nbsp<button class="delete-comment">x</button></li><br>`;
  ulEle.innerHTML += display;
  event.target.comment_input.value = ""

  fetch(`https://randopic.herokuapp.com/comments`,
  {
    method:"POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({image_id:imageId,content:newComment})
  })
  .then(resp => resp.json())
  .then(data => console.log(data))

  deleteComment(event);          //delete the comments for the image
}

//hit like button on page
function listenForLike()
{
  document.getElementById("like_button").addEventListener('click',handleClick)
}

function handleClick(event)
{
  imageId = 4468;
  let like_count = parseInt(event.target.previousElementSibling.textContent.split(":")[1]);
  event.target.previousElementSibling.textContent = "Likes: " +(like_count + 1);
  fetch(`https://randopic.herokuapp.com/likes`,
  {
    method:"POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({image_id:imageId})
  })
  .then(resp => resp.json())
  .then(data => console.log(data))

}

//fetch the data from api
function fetchData(imageURL)
{
  fetch(imageURL)
  .then(resp => resp.json())
  .then(data => renderPage(data))
}

function renderPage(data)
{
  console.log(data);
  document.getElementById("image").src = data.url
  document.getElementById("name").textContent = data.name
  document.getElementById("likes").textContent = data.like_count 
  const ulEle = document.getElementById("comments");
  data.comments.forEach(comment => {
    const createLi = document.createElement("Li")
    createLi.textContent = comment.content
    // const delBut = document.createElement("Button")
    // delBut.value = "X"
    let delBut = `${comment.content} &nbsp<button class="delete-comment">x</button><br>`
    createLi.innerHTML = delBut;
    ulEle.appendChild(createLi);
  });
}