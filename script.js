// Photo gallery with actual photo files
const photos = [
  'photo1.jpg',
  'photo2.jpg',
  'photo3.jpg'
];

// Rest of the script continues...
let currentPhotoIndex = 0;

function displayPhoto() {
  const photoElement = document.getElementById('photo-display');
  if (photoElement) {
    photoElement.src = photos[currentPhotoIndex];
  }
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  displayPhoto();
}

function previousPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  displayPhoto();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  displayPhoto();
});