
const fetch = function (){
  const type = document.getElementById("type").value;
  const value = document.getElementById("value").value;
  console.log(`https://www.googleapis.com/books/v1/volumes?q=${type}:${value}`)
  $.ajax({
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${type}:${value}`,
    success: function (data) {
      console.log(data)
      const header = document.createElement("h5")
      header.innerHTML = `${value} - ${data.items[0].volumeInfo.title} by ${data.items[0].volumeInfo.authors[0]}`
      header.style.fontFamily = "Helvetica"
      document.body.appendChild(header)
    },
    error: function (xhr, text, error) {
        console.log(text);
    }
}); 
}
