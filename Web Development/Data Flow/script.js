const posts = [{name:"Haim", text:"Happy Birthday !!!"}, {name:"Maor", text:"Congratz!!!!"}]

const render = function() {
    const container = document.getElementById('posts-container');
    container.innerHTML = "";
    posts.forEach((post) => {
        const newPost = document.createElement("div");
        newPost.setAttribute("class", "post");
        newPost.innerHTML = `<strong>${post.name}</strong>: ${post.text}`;
        container.appendChild(newPost);
    })
}

const buttonClick = function () {
    const name = document.getElementById("name")
    const birthday = document.getElementById("birthday")

    if(name.value.length > 0 && birthday.value.length > 0)
    {
        posts.push({name: name.value, text: birthday.value})
        render()
    }
}