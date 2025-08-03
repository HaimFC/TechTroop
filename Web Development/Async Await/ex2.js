async function getUserWithPosts(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    if (!posts.ok) {
      throw new Error('Posts not found');
    }

    const user = await response.json();
    const allPosts = await posts.json();
    return {user, allPosts};

    } catch (error) {
    console.error('Error fetching user or posts:', error.message);
    return null;
  }
}

getUserWithPosts(5).then(result => console.log('Result:', result));
