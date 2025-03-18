const BACKEND_URL = "https://sticker-app-k72q.onrender.com/upload/";  // Change this to your Render API

function generateSticker() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  const text = document.getElementById('stickerText').value;
  const canvas = document.getElementById('stickerCanvas');
  const ctx = canvas.getContext('2d');

  if (!file) {
    alert("Please upload an image");
    return;
  }

  // Upload to Backend API
  const formData = new FormData();
  formData.append("file", file);
  
  fetch("https://sticker-app-k72q.onrender.com/upload/", {
    method: "POST",
    body: formData
})
  const BACKEND_URL = `${import.meta.env.VITE_API_URL}/upload/`;
const BACKEND_URL = `${API_URL}/upload/`;



  fetch(BACKEND_URL, {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log("File uploaded:", data);

    // Now load the uploaded image from the backend and draw
    const imageUrl = `https://sticker-app-k72q.onrender.com/download/${data.filename}`;
    const img = new Image();
    img.crossOrigin = "Anonymous";  // Important for CORS

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add text overlay
      ctx.font = "50px Comic Sans MS";
      ctx.fillStyle = "#ffea00";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";
      ctx.strokeText(text, canvas.width / 2, canvas.height - 60);
      ctx.fillText(text, canvas.width / 2, canvas.height - 60);

      document.getElementById('downloadBtn').style.display = 'block';
      document.getElementById('downloadBtn').href = canvas.toDataURL();
    };
    img.src = imageUrl;
  })
  .catch(err => {
    console.error("Upload failed:", err);
    alert("Failed to upload image. Please try again.");
  });
}
