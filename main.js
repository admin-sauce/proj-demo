// Sample initial books data
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    copies: 3,
    available: 3
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    copies: 2,
    available: 2
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Programming",
    copies: 4,
    available: 4
  }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');
const booksList = document.getElementById('booksList');
const addBookForm = document.getElementById('addBookForm');

// Event Listeners
searchInput.addEventListener('input', handleSearch);
searchType.addEventListener('change', handleSearch);
addBookForm.addEventListener('submit', handleAddBook);

// Search functionality
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const searchBy = searchType.value;

  const filteredBooks = books.filter(book => {
    return book[searchBy].toLowerCase().includes(searchTerm);
  });

  displayBooks(filteredBooks);
}

// Display books
function displayBooks(booksToShow = books) {
  booksList.innerHTML = '';
  
  // Create books grid container
  const booksGrid = document.createElement('div');
  booksGrid.className = 'books-grid';
  
  booksToShow.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    const statusClass = book.available === 0 ? 'status-unavailable' : 
                       book.available <= 2 ? 'status-low' : 
                       'status-available';

    bookCard.innerHTML = `
      <div class="book-header">
        <h3>${book.title}</h3>
      </div>
      <div class="book-content">
        <div class="book-info">
          <p>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            ${book.author}
          </p>
          <p>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            ${book.category}
          </p>
          <p class="${statusClass}">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Available: ${book.available}/${book.copies}
          </p>
        </div>
        <div class="book-actions">
          ${book.available > 0 ? 
            `<button onclick="borrowBook(${book.id})">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Borrow
            </button>` :
            '<button disabled>Not Available</button>'
          }
          <button onclick="returnBook(${book.id})">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Return
          </button>
        </div>
      </div>
    `;
    
    booksGrid.appendChild(bookCard);
  });
  
  booksList.appendChild(booksGrid);
}

// Add new book
function handleAddBook(e) {
  e.preventDefault();
  
  const newBook = {
    id: books.length + 1,
    title: document.getElementById('bookTitle').value,
    author: document.getElementById('bookAuthor').value,
    category: document.getElementById('bookCategory').value,
    copies: parseInt(document.getElementById('bookCopies').value),
    available: parseInt(document.getElementById('bookCopies').value)
  };
  
  books.push(newBook);
  displayBooks();
  addBookForm.reset();
}

// Borrow book
window.borrowBook = function(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book && book.available > 0) {
    book.available--;
    displayBooks();
  }
}

// Return book
window.returnBook = function(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book && book.available < book.copies) {
    book.available++;
    displayBooks();
  }
}

// Initial display
displayBooks();