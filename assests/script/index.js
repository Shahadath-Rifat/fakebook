'use strict';

// User class definition
class User {
  constructor(id, name, userName, email) {
    this._id = id;
    this._name = name;
    this._userName = userName;
    this._email = email;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get userName() {
    return this._userName;
  }

  get email() {
    return this._email;
  }

  getInfo() {
    return {
      id: this._id,
      name: this._name,
      userName: this._userName,
      email: this._email,
    };
  }
}

// Subscriber class definition
class Subscriber extends User {
  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this._pages = pages;
    this._groups = groups;
    this._canMonetize = canMonetize;
  }

  get pages() {
    return this._pages;
  }

  get groups() {
    return this._groups;
  }

  get canMonetize() {
    return this._canMonetize;
  }

  getInfo() {
    return {
      id: this._id,
      name: this._name,
      userName: this._userName,
      email: this._email,
      pages: this._pages,
      groups: this._groups,
      canMonetize: this._canMonetize
    };
  }
  
}

const rifat = new Subscriber(
  123,
  "SH Rifat",
  "ShahadathHussainRifat",
  "rifatsh27@gmail.com",
  ["Web Development", "JavaScript"],
  ["Friends", "Family"],
  true
);

const uploadTxt = document.getElementById("upload-txt");
const uploadFile = document.getElementById("upload-file");
const uploadButton = document.getElementById("upload-button");
const uploadSection = document.getElementById("upload-section");

// Helper function to create a post element
function createPostElement(text, imageUrl, userInfo) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");
  postContainer.appendChild(postHeader);

  const profilePic = document.createElement("img");
  profilePic.classList.add("profile-pic");
  profilePic.src = "./assests/image/profile.png";
  postHeader.appendChild(profilePic);

  const userInfoText = document.createElement("div");
  userInfoText.classList.add("user-info");
  userInfoText.textContent = userInfo.getInfo().name;
  userInfoText.setAttribute("data-info", JSON.stringify(userInfo.getInfo()));
  postHeader.appendChild(userInfoText);

  const postDate = document.createElement("div");
  postDate.classList.add("post-date");
  postDate.textContent = new Date().toLocaleString();
  postHeader.appendChild(postDate);

  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-info-circle", "user-icon");
  postHeader.appendChild(icon);

  const postText = document.createElement("div");
  postText.classList.add("post-text");
  postText.textContent = text;
  postContainer.appendChild(postText);

  if (imageUrl) {
    const postImage = document.createElement("img");
    postImage.classList.add("post-image");
    postImage.src = imageUrl;
    postContainer.appendChild(postImage);
  }

  // Add event listener to user info icon
  icon.addEventListener("click", () => {
    const info = userInfo.getInfo();
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
      <p><strong>Name:</strong> ${info.name}</p>
      <p><strong>Username:</strong> ${info.userName}</p>
      <p><strong>Email:</strong> ${info.email}</p>
      <p><strong>Pages:</strong> ${info.pages.join(", ")}</p>
      <p><strong>Groups:</strong> ${info.groups.join(", ")}</p>
      <p><strong>Can Monetize:</strong> ${info.canMonetize ? "Yes" : "No"}</p>`;
    document.body.appendChild(popup);
    // Add event listener to close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "Close";
    popup.appendChild(closeButton);

    closeButton.addEventListener("click", () => {
    popup.remove();
    });
  });
  return postContainer;
}

// Event listener for upload button
uploadButton.addEventListener("click", () => {
  const text = uploadTxt.value;
  const file = uploadFile.files[0];
  
  if (!text && !file) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
    return;
  }
  
  let imageUrl = null;
  
  if (file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imageUrl = reader.result;
    const postElement = createPostElement(text, imageUrl, rifat);
    uploadSection.prepend(postElement);
  };
  
  reader.onerror = () => {
    innerHTML("Unable to upload file.");
  };
} else {
  const postElement = createPostElement(text, imageUrl, rifat);
  uploadSection.prepend(postElement);
  }
  
  uploadTxt.value = "";
  uploadFile.value = "";
  });
  
  
  // Event listener for error message
const errorMessage = document.getElementById("error-message");
errorMessage.addEventListener("click", () => {
  errorMessage.style.display = "none";
});
