const body = document.querySelector("body")
const chat = document.querySelector("#chat")
const inputmask = document.querySelector("#inputmask")
const userinput = inputmask.querySelector("input") || inputmask.querySelector("textarea")
const submit = inputmask.querySelector("button#sendbtn")
const resetbtn = inputmask.querySelector("button#resetbtn")
userinput.focus()

/**
 * @typedef {Object} Message
 * @property {string} content
 * @property {string} role
 */

/** @type {Message[]} */
// const messages = []


function show_messages(){
  messages.forEach(msg=>add_message(msg.content, msg.role))
}

function add_message(msg, role='user'){
  /** @type {Message} */
  var message = { content:msg, role}
  messages.push(message)
  const div = document.createElement("div")
  message.element = div
  div.textContent = msg
  div.classList.add("message", role)
  chat.appendChild(div)
}

function post_message(msg){
  add_message(msg, role='user')
  if (role=='user'){
    get_answer(messages).then(answer=>{
      add_message(answer,role='assistant')
    })
  }
}

show_messages()
submit.addEventListener("click", () => {
  post_message(userinput.value)
  userinput.value = ""
})

userinput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.shiftKey === true){
    post_message(userinput.value)
    userinput.value = ""
  }
  userinput.rows = userinput.value.split("\n").length

})
