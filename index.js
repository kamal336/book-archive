/* ===============================
   search area starts from here 
================================ */

// global variable 
const results = document.getElementById('results');

// search button event handler 
document.getElementById('search-btn').addEventListener('click',function(){
   
    // search field 
    const searchField = document.getElementById('search-field');
    const search = searchField.value;

    // clear input field 
    searchField.value = "";
    
    // err handle 
    if(search === ""){
        results.innerHTML = "";
    }

    // set url 
    const url = `https://openlibrary.org/search.json?q=${search}`;

    // fetch data 
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))

})
/* ===============================
    search area ends from here 
================================ */

/* ================================
   display area starts from here
================================= */
const displayBooks = data =>{
    // err handle 
    if(data.numFound === 0){
        results.innerHTML = "Not Found";
    }else{
        results.innerHTML =`${data.numFound}`;
    }

    const booksData = data.docs;
    const books = booksData.slice(0,20);

    const bookContainer = document.getElementById('books');

    // clear div 
    bookContainer.textContent = "";

    // forEach loop for get single book details 
    books.forEach(book => {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
                <div class="col">
                  <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h4 class="card-title text-primary fw-bold">${book.title}</h4>
                      <p class="card-text text-warning">Author: ${book.author_name[0]}</p>
                      <p class="card-text text-success">First Publish Year: ${book.first_publish_year}</p>
                    </div>
                  </div>
                </div>
      `
      bookContainer.appendChild(div)

    });
}

/* ===============================
    display area ends from here
================================ */
