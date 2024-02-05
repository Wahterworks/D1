const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 51;
const currentFrame = index => (
  `https://raw.githubusercontent.com/Wahterworks/images/main/${index.toString().padStart(4, '0')}.png`)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1440;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));

  // Function to handle the opacity for overlay texts
  function handleOverlayTextFade(id, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd) {
    const overlayText = document.getElementById(id);
    if (frameIndex + 1 >= fadeInStart && frameIndex + 1 <= fadeInEnd) {
      // Fade in
      const opacityIncrement = (frameIndex + 1 - fadeInStart) / (fadeInEnd - fadeInStart);
      overlayText.style.opacity = opacityIncrement;
    } else if (frameIndex + 1 > fadeInEnd && frameIndex + 1 <= fadeOutEnd) {
      // Remain visible
      overlayText.style.opacity = 1;
    } else if (frameIndex + 1 > fadeOutEnd) {
      // Fade out if scrolling down past the visible frame
      overlayText.style.opacity = 0;
    } else if (frameIndex + 1 < fadeInStart || (frameIndex + 1 < fadeOutStart && frameIndex + 1 >= fadeOutEnd)) {
      // Hide if before fade in or if scrolling back before fade in start
      overlayText.style.opacity = 0;
    }
  }

  // Apply the function to each overlay text with their specific frames
  handleOverlayTextFade('overlayText', 37, 39, 39, 51); // Already set up
  handleOverlayTextFade('overlayText2', 41, 44, 44, 51);
  handleOverlayTextFade('overlayText3', 44, 46, 46, 51);
  handleOverlayTextFade('overlayText4', 48, 50, 50, 51);
});


preloadImages();

document.querySelectorAll('.overlay-text').forEach(item => {
  item.addEventListener('click', function() {
    // Check current styles and toggle
    if (this.style.backgroundColor === 'black' || this.style.backgroundColor === '') {
      this.style.backgroundColor = 'white';
      this.style.color = 'black';
      this.style.borderColor = 'black';
    } else {
      this.style.backgroundColor = 'black';
      this.style.color = 'white';
      this.style.borderColor = 'transparent';
    }
  });
});