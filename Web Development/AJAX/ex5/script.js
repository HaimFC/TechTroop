const fetchGif = function () {
    const value = document.getElementById("value").value;

    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?api_key=gATHbpZQYGqPIBLfyrRIrjAQv1X5W3PE&q=${encodeURIComponent(value)}&limit=1`,
        success: function (data) {
            console.log(data);
            $("#gif-container").empty();
            if (data.data.length > 0) {
                const gifUrl = data.data[0].images.fixed_height.url;
                const img = `<img src="${gifUrl}" alt="${value}">`;
                $("#gif-container").append(img);
            } else {
                $("#gif-container").text("No GIF found.");
            }
        },
        error: function (xhr, text, error) {
            console.log(text);
        }
    });
}
