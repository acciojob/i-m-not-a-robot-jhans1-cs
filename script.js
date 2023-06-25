//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
  var images = document.querySelectorAll('img');
  var resetButton = document.getElementById('reset');
  var verifyButton = document.getElementById('verify');
  var para = document.getElementById('para');
  var clickedImages = [];

  // Randomly assign image URLs to the image elements
  function assignImageURLs() {
    var imageURLs = [
      'https://api.example.com/images/img1.jpg',
      'https://api.example.com/images/img2.jpg',
      'https://api.example.com/images/img3.jpg',
      'https://api.example.com/images/img4.jpg',
      'https://api.example.com/images/img5.jpg',
    ];

    var repeatIndex = Math.floor(Math.random() * 5);

    for (var i = 0; i < images.length; i++) {
      var index = (i === 5) ? repeatIndex : i;
      images[i].src = imageURLs[index];
    }
  }

  // Shuffle the images in the container
  function shuffleImages() {
    var container = document.getElementById('image-container');
    for (var i = container.children.length; i >= 0; i--) {
      container.appendChild(container.children[Math.random() * i | 0]);
    }
  }

  // Reset the app state to the initial state
  function resetState() {
    clickedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';
  }

  // Check if all clicked images are identical
  function checkIdenticalImages() {
    var firstImageClass = clickedImages[0].className;
    var identical = clickedImages.every(function(image) {
      return image.className === firstImageClass;
    });
    return identical;
  }

  // Handle image click events
  function handleClick(event) {
    var clickedImage = event.target;

    // Ignore clicks on the same image
    if (clickedImages.includes(clickedImage)) {
      return;
    }

    clickedImages.push(clickedImage);

    if (clickedImages.length === 1) {
      resetButton.style.display = 'block';
    }

    if (clickedImages.length === 2) {
      verifyButton.style.display = 'block';
    }
  }

  // Handle reset button click event
  resetButton.addEventListener('click', function() {
    resetState();
  });

  // Handle verify button click event
  verifyButton.addEventListener('click', function() {
    var identical = checkIdenticalImages();

    if (identical) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }

    verifyButton.style.display = 'none';
  });

  // Assign image URLs and shuffle the images on page load
  assignImageURLs();
  shuffleImages();

  // Add click event listeners to images
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', handleClick);
  }
});