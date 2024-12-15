const homepage = document.getElementById('homepage');
const postPage = document.getElementById('postPage');
const adminPanel = document.getElementById('adminPanel');
const postList = document.getElementById('postList');
const postContent = document.getElementById('postContent');
const adminPostList = document.getElementById('adminPostList');

let posts = [
    { id: 1, title: "Tech Trends 2024", content: "Discover the top technology trends of 2024...", category: "Tech", imageUrl: "https://img.trendforce.com/blog/wp-content/uploads/2023/10/17160136/2024_EN1.jpg" },
    { id: 2, title: "Healthy Lifestyle Tips", content: "Learn how to maintain a balanced lifestyle...", category: "Lifestyle", imageUrl: "https://ermineskin.ca/wp-content/uploads/2024/08/456053284_383205441467713_1367075141644045022_n.jpg" },
    { id: 3, title: "Top Travel Destinations", content: "Explore the best travel destinations for 2024...", category: "Travel", imageUrl: "https://www.olx.in/blog/wp-content/uploads/2024/07/Top-travel-destinations-for-2024-1024x376.jpg" }
];

document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContentInput').value;
    const category = document.getElementById('postCategory').value;
    const image = document.getElementById('postImage').files[0];
    const imageUrl = image ? URL.createObjectURL(image) : '';

    const post = { id: Date.now(), title, content, category, imageUrl };
    posts.push(post);
    renderPosts();
    e.target.reset();
});

function renderPosts() {
    postList.innerHTML = '';
    adminPostList.innerHTML = '';
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post');
        postItem.innerHTML = `
            <img src="${post.imageUrl}" alt="">
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 100)}...</p>
            <button onclick="viewPost(${post.id})">Read More</button>
        `;
        postList.appendChild(postItem);

        const adminItem = document.createElement('li');
        adminItem.innerHTML = `
            ${post.title} <button onclick="deletePost(${post.id})">Delete</button>
        `;
        adminPostList.appendChild(adminItem);
    });
}

function viewPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    homepage.classList.add('hidden');
    postPage.classList.remove('hidden');
    postContent.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.imageUrl}" alt="">
        <p>${post.content}</p>
    `;
}

document.getElementById('backToHome').addEventListener('click', () => {
    homepage.classList.remove('hidden');
    postPage.classList.add('hidden');
});

document.getElementById('adminToggle').addEventListener('click', () => {
    const password = prompt("Enter Admin Password:");
    if (password === "admin123") {
        adminPanel.classList.toggle('hidden');
    } else {
        alert("Incorrect password!");
    }
});

function deletePost(id) {
    posts = posts.filter(p => p.id !== id);
    renderPosts();
}

renderPosts();
