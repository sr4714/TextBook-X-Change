import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  
  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get("http://localhost:8080/books/" + book).then((data) => {
      console.log(data.data.items);
      setResult(data.data.items);
    });
  }

  return (
    <div class="container">
      <h1 class="text-primary">Textbook X-Change</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search For Books"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {result.map((book) => (
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img
            src={
              book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`
            }
          />
          <p id="text">{book.volumeInfo.title}</p>
          <p id="text1">{book.volumeInfo.authors}</p>
          <p id="text2">----------------------</p>
        </a>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
