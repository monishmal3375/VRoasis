//set this to the id of the button
var button = document.getElementById('button')
//set this to the id of the input
var input = document.getElementById('input')
input.value = ""

var ouputWindow = document.getElementById('Output')

//for the button properties in the HTML, set the onclick=buttonClicked()

input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    button.click();
  }
});

const apiKey = "" //Insert openai key here
const apiUrl = 'https://api.openai.com/v1/chat/completions';

//change the instruction
var instruction = "Help the user with mental health issues like a psychiatrist"

var messages = [{ "role": "system", "content": instruction }]

function buttonClicked() {

  var msg = input.value;
  console.log(msg)
  messages.push({ "role": "user", "content": msg })

  var div = document.createElement('p')
  div.innerText = `You: ${msg}`
  ouputWindow.appendChild(div);


  input.value = "typing..."
  input.disabled = true;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: messages,
      max_tokens: 150,
      model: "gpt-3.5-turbo",
    },
    )
  }
  )

    .then(response => response.json())
    .then(data => {

      messages.push(data.choices[0].message)
      var reply = data.choices[0].message['content']

      //tell what to do with the reply
      console.log(reply)

      var div = document.createElement('p')
      div.innerText = `Bot: ${reply}`
      ouputWindow.appendChild(div);

      input.disabled = false;



      input.value = "";
    })
    .catch(error => console.log(error))
}
