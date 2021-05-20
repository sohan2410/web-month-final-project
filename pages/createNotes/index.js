const createNoteButton= document.querySelector(".create-note-button");

const apiUrl = "http://localhost:8000";

const token=localStorage.getItem("jwt");

createNoteButton.addEventListener("click", ()=>{
  const content=document.querySelector(".create-note-input").value;
  const heading=document.querySelector(".create-note-heading").value;

  if(token){
    fetch(`${apiUrl}/note/add`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": token,
      },
      body: JSON.stringify({content,heading}),
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.message){
        location.href="/pages/dashboard/dashboard.html";
      }
    })
    .catch((err)=>{
      alert("Error creating note!");
      console.log(err);
    });
  }
});