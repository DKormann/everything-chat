
const body = document.querySelector("body")
const chat = document.querySelector("#chat")
const inputmask = document.querySelector("#inputmask")
const userinput = inputmask.querySelector("input") || inputmask.querySelector("textarea")
const submit = inputmask.querySelector("button")


const messages = []


function show_messages(){
  messages.forEach((msg) => {
    const div = document.createElement("div")
    div.textContent = msg
    div.classList.add("message")
    chat.appendChild(div)
    console.log(body);
  })
}

function add_message(msg){
  messages.push(msg)
  const div = document.createElement("div")
  div.textContent = msg
  div.classList.add("message")
  chat.appendChild(div)
}

show_messages()
submit.addEventListener("click", () => {
  add_message(userinput.value)
  userinput.value = ""
})

userinput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.shiftKey === true){
    add_message(userinput.value)
    userinput.value = ""
  }
})
