const apiKey = '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';
const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

function sendMessage() {
  const userInput = document.getElementById('userInput').value.trim();
    alert ("testmessage : "+userInput);

  if (userInput === '') {
    alert('Please enter a message!');
    return;
  }

  // Call the OpenAI API
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: userInput,
      max_tokens: 150, // Adjust the response length as needed
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices.length > 0) {
        // Display GPT-3.5's response in the 'response' textarea
        const responseTextarea = document.getElementById('response');
        responseTextarea.value = data.choices[0].text.trim();
      } else {
        console.log(data)
      }
    })
    .catch(error => {
      alert('Error communicating with the API. Please try again later.');
      console.error(error);
    });
}
