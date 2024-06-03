import {
  ref,
  get,
  connectDB,
  set,
} from "./firebaseConnection/firebaseDBconn.js";
// Notify function to show success or error messages
var notifyTimeout;

function NotifyUser(ErrorType, message, duration) {
  var errorMessage = document.getElementById("NotifyUser");

  // Clear any existing timeout
  clearTimeout(notifyTimeout);

  errorMessage.innerHTML = "";

  // Set message type and content
  if (ErrorType === "success") {
    errorMessage.classList.add("successMessage");
    errorMessage.innerHTML = `<i class="fa fa-check" style="font-size:20px" aria-hidden="true"></i> ${message}`;
  } else {
    errorMessage.classList.add("errorMessage");
    errorMessage.innerHTML = `<i class="fa fa-exclamation-circle" style="font-size:20px" aria-hidden="true"></i> ${message}`;
  }

  // Show the message and hide it after the duration
  errorMessage.classList.remove("none");
  notifyTimeout = setTimeout(() => {
    errorMessage.classList.add("none");
    errorMessage.classList.remove("errorMessage", "successMessage");
    errorMessage.innerHTML = "";
  }, duration);
}
const but = document.getElementById("submit");

function SendFeedback(Desid, name, email, desc) {
  set(ref(connectDB, "loggers/" + Desid), {
    name: name,
    email: email,
    description: desc,
    TimeStamp: Date(),
  })
    .then(() => {
      but.innerHTML = "submit";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("des").value = "";
      console.log("User feedback saved successfully.");
      NotifyUser("success", "Submitted successfully....", 3000);
    })
    .catch((e) => {
      but.innerHTML = "submit";

      console.error("Error saving feedback", e);
      NotifyUser("error", "Error saving feedback ", 3000);
    });
}
but.addEventListener("click", (event) => {
  but.innerHTML = "submitting...";
  event.preventDefault();
  const Desid = `${generateUserId()}`;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const desc = document.getElementById("des").value;
  if (name === "" || email === "" || desc === "") {
    but.innerHTML = "submit";

    NotifyUser("error", "Please fill all the fields.. ", 3000);
  } else {
    SendFeedback(Desid, name, email, desc);

    console.log("submitted...!");
  }
});
function generateUserId() {
  return Math.floor(167000 + Math.random() * 9700).toString();
}
// Example usage
