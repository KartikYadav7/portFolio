
const contactForm = document.getElementById("contact-form");
const submit=document.getElementById("submit-button");
const reset= document.getElementById("reset-button");

const BACKEND_URL = CONFIG.BACKEND_URL || "https://port-folio-iota-sandy.vercel.app";


contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitForm();
  
});

async function submitForm() {
  submit.disabled=true;
  reset.disabled=true;
  submit.style.visibility = "hidden";
  reset.style.visibility = "hidden";

  const name = contactForm.name?.value;
  const email = contactForm.email?.value;
  const mobile = contactForm.number?.value|| "Not Filled";
  const contactMEthod1 = document.getElementById('checkbox1-email').checked
    ? "Email"
    : "Not Preferred";
  const contactMEthod2 = document.getElementById('checkbox2-mobile').checked
    ? "Mobile"
    : "Not Preferred";
  const message = contactForm.message?.value || "Not Filled";
  

  const statusMessage = document.getElementById("status-message");
  statusMessage.innerText = "Sending...";
  statusMessage.style.color = "blue";
 

  try {
    await axios.post(`${BACKEND_URL}/contact`, {
      name,
      email,
      mobile,
      contactMEthod1,
      contactMEthod2,
      message,
    });
    console.log("form submitted")
    statusMessage.innerText = "Message sent successfully!";
    statusMessage.style.color = "green";
    setTimeout(() => {
      statusMessage.innerText = "";
    }, 3000);
    contactForm.reset();

  } catch (err) {
    console.log(err,"error")
    console.error(err);
    statusMessage.innerText = "Failed to send message. Try again later.";
    statusMessage.style.color = "red";
    setTimeout(() => {
      statusMessage.innerText = "";
    }, 3000);

  }
  submit.disabled=false;
  reset.disabled=false;
  submit.style.visibility = "visible"; 
  reset.style.visibility = "visible";  
}
