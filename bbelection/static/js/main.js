document.addEventListener("DOMContentLoaded", function() {
  const candidateList = document.getElementById('list');
 const refreshButton = document.querySelector('#refresh-button');

 refreshButton.addEventListener('click', function() {
   axios.get('https://bb-election-api.herokuapp.com/')
   .then(function(response) {
     candidateList.innerText = "";

   response.data.candidates.forEach((candidate) => {
     const individual = document.createElement('li');
     individual.innerHTML = (`${candidate.name}: ${candidate.votes} votes`);
     candidateList.appendChild(individual);

     const form = document.createElement('form');
     form.method = 'POST';
     form.action = 'https://bb-election-api.herokuapp.com/vote';

     const hidden = document.createElement('input');
     const button = document.createElement('button');
     button.innerText = `Vote for ${candidate.name}!`
     hidden.type = 'hidden';
     hidden.name = 'name';
     hidden.value = candidate.name
     form.appendChild(hidden);
     form.appendChild(button);
     individual.appendChild(form);

   });
 });

});
});

});
document.addEventListener('submit', function(event) {

  event.preventDefault();

  let name = event.target.querySelector('input[type=hidden]').value;
  console.log(name);

  axios({
  method: 'post',
  url: 'https://bb-election-api.herokuapp.com/vote',
  data: { 'name': name }

}).then(function(response) {
  console.log(response);

}).catch(function(response) {
  alert('Request Failed');
})
});
