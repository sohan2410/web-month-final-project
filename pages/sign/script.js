const body = document.querySelector("body");

// const apiUrl = "http://localhost:8000";
const apiUrl="https://secure-waters-82488.herokuapp.com";


const signInForm = document.querySelector(".signInButton");
const signUpForm = document.querySelector(".signUpButton");

signInForm.addEventListener("click", (event) => {
  // console.log("clicking on sign in");
  event.preventDefault();

  const email = document.querySelector(".signin-email").value;
  const password = document.querySelector(".signin-password").value;

  // console.log(email,password);

  fetch(`${apiUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      if (token) {
        alert("Sigin successfull");
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashboard/dashboard.html";
      } else {
        alert("sign in again");
      }
    })
    .catch((err) => {
      alert("Sign in error");
      console.log(err);
    });
});

signUpForm.addEventListener("click", (event) => {
  const email = document.querySelector(".signup-email").value;
  const name = document.querySelector(".signup-name").value;
  const password = document.querySelector(".signup-password").value;
  const reTypePassword = document.querySelector(".signup-retypepassword").value;

  if(password!==reTypePassword){
      alert("Password doesn't match");
      return;
  } else{
    fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { token } = data;
    
          if (token) {
            alert("SignUp successfull");
            localStorage.setItem("jwt", token);
            location.href = "/pages/dashboard/dashboard.html";
          } else {
            alert("sign up again");
          }
        })
        .catch((err) => {
          alert("Sign in error");
          console.log(err);
        });

  }
});
