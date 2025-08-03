const dashboard = async function () {
    try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/comments")
        ]);

        const users = await usersRes.json();
        const posts = await postsRes.json();
        const comments = await commentsRes.json();

        // Summary Calculations
        const totalUsers = users.length;
        const totalPosts = posts.length;
        const totalComments = comments.length;
        const avgPostsPerUser = totalPosts / totalUsers;
        const avgCommentsPerPost = totalComments / totalPosts;

        // Posts & Comments per User
        const userStats = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment => userPosts.some(p => p.id === comment.postId));
            return {
                name: user.name,
                postCount: userPosts.length,
                commentCount: userComments.length
            };
        });

        // Top 3 Users by Post Count
        const topUsers = userStats.sort((a, b) => b.postCount - a.postCount).slice(0, 3);

        // Recent 5 Posts
        const recentPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);

        // Final Dashboard Object
        const dashboardData = {
            summary: {
                totalUsers,
                totalPosts,
                totalComments,
                avgPostsPerUser,
                avgCommentsPerPost
            },
            topUsers,
            recentPosts
        };

        console.log(dashboardData);

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
    }
};

dashboard();
