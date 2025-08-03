const fetchGif = function () {
  $.ajax({
    method: "GET",
    url: `https://api.giphy.com/v1/gifs/trending?api_key=gATHbpZQYGqPIBLfyrRIrjAQv1X5W3PE&limit=1`,
    success: function (data) {
      console.log(data);
      document.querySelectorAll("img").forEach(gif => gif.remove());

      if (data.data.length > 0) {
        const gifUrl = data.data[0].images.fixed_height.url;
        const img = document.createElement("img");
        img.src = gifUrl;
        img.alt = "Trending GIF";
        document.body.appendChild(img);
      } else {
        alert("No GIF found.");
      }
    },
    error: function (xhr, text, error) {
        console.log(text);
    }
  }); 
}
