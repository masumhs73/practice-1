// function loadCategories() {
//     fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
//         .then((res) => res.json())
//         .then((data) => displayCategories(data.categories))
// }

// function loadVideos() {
//     fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
//         .then((res) => res.json())
//         .then((data) => displayVideos(data.videos));
// }

// function displayCategories(categories) {
//     // console.log(categories);
//     const categoryContainer = document.getElementById("category-container");
//     for (let cat of categories) {
//         console.log(cat);
//         const categoryDiv = document.createElement('div');
//         categoryDiv.innerHTML = `
//         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white ">${cat.category}</button>
//         `
//         categoryContainer.append(categoryDiv);
//     }
// }

// const displayVideos = (videos) => {
//     console.log(videos);
//     const videoContainer = document.getElementById('video-container');

//     videos.forEach(video => {
//         // console.log(video);
//         const videoCard = document.createElement("div");
//         videoCard.innerHTML = `
//        <div class="card bg-base-100">
//             <figure class="relative">
//                 <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
//                 <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded">3hrs 56 min ago</span>
//             </figure>
//             <div class="flex gap-3 px-0 py-5">
//                 <div class="profile">
//                     <div class="avatar">
//                         <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
//                             <img src="${video.authors[0].profile_picture}"/>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="intro">
//                     <h2 class="text-lg font-semibold">${video.title}</h2>
//                     <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
//                     <p class="text-sm text-gray-400">${video.others.views} Views</p>
//                 </div>
//             </div>
//         </div>
//         `
//         videoContainer.append(videoCard);
//     });
// }

// loadCategories();
// loadVideos();

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories
        ));
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos));
}

const loadCategoryVideos = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
        // console.log(clickedButton);
        displayVideos(data.category)
    });
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
    // console.log(categories)
    const categoryContainer = document.getElementById('category-container');
    for (let cat of categories) {
        // console.log(cat);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
         <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        categoryContainer.appendChild(categoryDiv);
    }
}

// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center py-25">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here.</h2>
        </div>
        `
        return;
    }

    videos.forEach(video => {
        // console.log(video);
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black rounded px-2">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}<img class="w-5 h-5"
                            src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views} Views</p>
                </div>
            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);

    });
}

loadCategories();
// loadVideos();