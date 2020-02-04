document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage();
  updateLikes(); 
  let imageId = 4467 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageLi = document.createElement("li");

  const image = document.getElementById("image_card");

  const imageSource = imageURL;

  //.src = imageURL;

  function fetchImage(){
    const imageLi = document.createElement("li");
    const cardForImage = document.getElementById("image");
    const imageTitle = document.getElementById("name")
    let imageId = 4467 //Enter the id from the fetched image here
    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
    const imageSource = imageURL;
    const imageName = "Science Fair"
    const imageLikes = document.getElementById("likes")

    fetch("https://randopic.herokuapp.com/images/4467")
    .then(function(resp){
        return resp.json();
    }).then(function(imageData){
      
      console.log(imageData)
      cardForImage.src = imageData.url
      imageTitle.innerHTML = imageName
      imageData.likes = imageLikes
      //imageLi.innerText += imageSource
      // image.appendChild(imageLi);
      // imageData.innerhtml += image
      //whatever we want to do with this image goes here
      //i know imageData is a hash
      // we want to append it to the DOM

      //this function ends//DONE
    });
  }

  function updateLikes(){
    let imageId = 4467 //Enter the id from the fetched image here
    let data = {
      "id": 112,
      "image_id": imageId,
      "created_at": "2017-11-17T13:52:22.167Z",
      "updated_at": "2017-11-17T13:52:22.167Z"
      }

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
    fetch(imageURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      .then(function(data) { //keep getting the error 
        return data.json()
    })
      .then(function(data) {
        const likeButton = document.getElementById("like_button")
        const likes = document.getElementById("likes")
        likes.innerHTML = 0
        likeButton.addEventListener("click",function() {
          console.log(likes)
          likeButton.innerHTML = parseINT(likes) + 1

        })

      })
      });

    } 
  
})















