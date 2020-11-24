document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dog-form')
    const table = document.getElementById('table-body')
    form.addEventListener('submit', (e) => handleSubmitForm(e))

    function getDogs(){
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => buildDogList(dog)))
    }
    getDogs()

    function buildDogList(dog){
        
        const tr = document.createElement('tr')
        tr.dataset.id = dog.id

        const name = document.createElement('td')
        name.innerText = dog.name

        const breed = document.createElement('td')
        breed.innerText = dog.breed

        const sex = document.createElement('td')
        sex.innerText = dog.sex 

        const buttonWrapper = document.createElement('td')
        const button = document.createElement('td')
        button.innerText = 'Edit'
        button.addEventListener('click', () => populateForm(dog))
        buttonWrapper.append(button)
        
        tr.append(name, breed, sex, buttonWrapper)
        table.appendChild(tr)
    }

    function populateForm(dog){
        form.name.value = dog.name
        form.breed.value = dog.breed 
        form.sex.value = dog.sex 
        form.dataset.id = dog.id
    }

    function handleSubmitForm(e){
        e.preventDefault()
        const dogId = e.target.dataset.id
        const row = document.querySelector(`tr[data-id='${dogId}']`)

        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }, 
            body: JSON.stringify({
                'name': e.target.name.value, 
                'breed': e.target.breed.value, 
                'sex': e.target.sex.value
            }) 
        })
        .then(res => res.json())
        .then(data => {row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.breed}</td>
            <td>${data.sex}</td>
        `
        const buttonWrapper = document.createElement('td')
        const button = document.createElement('td')
        button.innerText = 'Edit'
        button.addEventListener('click', () => populateForm(data))
        buttonWrapper.append(button)
        row.append(buttonWrapper)
        })
        .catch(errors => {
            alert('nope')
        })
    }

})