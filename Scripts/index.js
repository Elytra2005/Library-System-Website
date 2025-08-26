import { Book  } from "./Book.js";

const form = document.querySelector("form");

let BookList = JSON.parse(localStorage.getItem("storedBook")) || [];

let BookSection = document.querySelector("#books-content");



function fileToBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);  
      reader.onerror = reject;
      reader.readAsDataURL(file);
   });
};        

if (form) {
      form.addEventListener("submit", async (e) => {
         e.preventDefault();
         const formData = new FormData(form); 

         // data
         const bookTitle = formData.get('title');
         const bookCategory = formData.get('category');
         const bookCollection = formData.get('collection');
         const publisher = formData.get('publisher');
         const year = formData.get('year');
         const id = Math.floor(Math.random() * 10) + 1;

         let BookData = new Book(bookTitle, id, year, publisher, bookCategory, bookCollection); 

         let image_input = document.querySelector('#image-upload');
         const files = image_input.files;

         for(let i=0; i < files.length; i++) {
                   if(files[i]) {
                     // image handling       
                     const base64 = await fileToBase64(files[i]);
                     BookData.image.push(base64);
                  } else {
                      console.log("no image is found");
                      hold_image.innerHTML = "<p> No Image Found </p>";
                  }
         }

         BookList.push(BookData);
         localStorage.setItem("storedBook", JSON.stringify(BookList));
         form.reset();
         window.location.href = "books.html";
      });       
}

// Book Page content

if(localStorage.getItem('storedBook') != null) {

   let retreiveBooks = JSON.parse(localStorage.getItem("storedBook")) || [];

   try {  // convert json into valid object
     for(let i = 0; i < retreiveBooks.length; i++) {

       // create html components 
      let Box = document.createElement("div");
      let innersection_1 = document.createElement('div');
      let innersection_2 = document.createElement('div');
      let hold_content = document.createElement('div');
      let title_text = document.createElement('h2');
      let text_1 = document.createElement('p');
      let text_2 = document.createElement('p');
      let text_3 = document.createElement('p');
      let text_4 = document.createElement('p');
      let text_5 = document.createElement('p');    
      let spanTitle = document.createElement("span");
      let span1 = document.createElement("span");
      let span2 = document.createElement("span");
      let span3 = document.createElement("span");
      let span4 = document.createElement("span");
      let span5 = document.createElement("span");
      let hold_image = document.createElement('div');

                              

       // appending
       BookSection.appendChild(Box);
       Box.appendChild(innersection_1);
       Box.appendChild(innersection_2);
       innersection_1.appendChild(hold_image);
       innersection_2.appendChild(hold_content);
       hold_content.appendChild(title_text);
       hold_content.appendChild(text_1);
       hold_content.appendChild(text_2);
       hold_content.appendChild(text_3);
       hold_content.appendChild(text_4);
       hold_content.appendChild(text_5);
    

       // assigning classes
       Box.classList.add("box-design");
       innersection_1.classList.add("innersection_one");
       innersection_2.classList.add("innersection_two");
       hold_image.classList.add("image-box");
       hold_image.classList.add("select-hold");

       let myBooks = retreiveBooks[i];

       title_text.innerHTML = "<i> Title: </i>";
       spanTitle.textContent = myBooks.title;
       title_text.appendChild(spanTitle);


       text_1.innerHTML = "<i> Id: </i>";
       span1.textContent = myBooks.id;
       text_1.appendChild(span1);

       text_2.innerHTML = "<i> Year: </i>";
       span2.textContent = myBooks.year;
       text_2.appendChild(span2);

       text_3.innerHTML = "<i> Author: </i>";
       span3.textContent = myBooks.author;
       text_3.appendChild(span3);

       text_4.innerHTML = "<i> Genre: </i>";
       span4.textContent = myBooks.genre;
       text_4.appendChild(span4);

       text_5.innerHTML = "<i> Collection: </i>";
       span5.textContent = myBooks.collection;
       text_5.appendChild(span5);


       // image rendering front-end

      if(myBooks.image && myBooks.image.length > 0) {
         let image_element = document.createElement("img");
         image_element.classList.add("book-image");
         image_element.src = myBooks.image[0];
         hold_image.appendChild(image_element)
       } else {
            hold_image.innerHTML = "<p> No Image Found </p>";
       }

     }
   } catch(e) {
      console.log(`The Error: ${e}`);
   }



} else {
   let p = document.querySelector(".empty-message");
   p.innerHTML = "No Books Are Avalaible";
}
