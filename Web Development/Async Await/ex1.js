async function getUserById(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }

    const user = await response.json();
    console.log(`Found user: ${user.name} (${user.email})`);
    return user;

  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
}

// Test with a valid user ID (1-10)
// getUserById(5).then(result => console.log('Result:', result));

// Test with an invalid user ID (999)
getUserById(999).then(result => console.log('Result:', result));