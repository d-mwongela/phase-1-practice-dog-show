document.addEventListener('DOMContentLoaded', () => {
    const dogURL = 'http://localhost:3000/dogs'
    
    const table = document.getElementById('table-body')
    
    const dogForm = document.querySelector('#dog-form')
    const dogName = dogForm.elements['name']
    const dogBreed = dogForm.elements['breed']
    const dogSex = dogForm.elements['sex']
    
    fetch(dogURL)
    .then (res => res.json())
    .then(renderAllDogs)
    
    function renderAllDogs (dogs) {
        dogs.forEach(dog => renderOneDog(dog))
    }
    
    function renderOneDog(dog) {
        const newRow = document.createElement('tr')
        newRow.dataset.id = dog.id
        newRow.innerHTML =`
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button>Edit Dog</buton><td>
            `
        const editButton = newRow.querySelector('button')
        editButton.addEventListener('click', () => {
            renderDogInfo(dog)
        })
        table.appendChild(newRow)
    }
    function renderDogInfo(dog) {
        dogName.value = `${dog.name}`
        dogBreed.value = `${dog.breed}`
        dogSex.value = `${dog.sex}`
        dogForm.dataset.id = dog.id
    }
    dogForm.addEventListener('submit', e => {
        e.preventDefault()
        const updatedDog = {
            name: dogName.value,
            breed: dogBreed.value,
            sex: dogSex.value,
        }
        function newDog(id, updatedDog) {
           return fetch(dogURL + `/${id}`, {
               method: 'PATCH',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(updatedDog)
           })
           .then(res => res.json())
        }
        dogId = e.target.dataset.id
        newDog(dogId, updatedDog)
        .then(immediateUpdatedDog => {
          const row = document.querySelector(`tr[data-id='${dogId}']`) 
          //console.log(row) 
          row.innerHTML =`
            <td>${immediateUpdatedDog.name}</td>
            <td>${immediateUpdatedDog.breed}</td>
            <td>${immediateUpdatedDog.sex}</td>
            <td><button>Edit Dog</buton><td>
          `
        })
    })
    })