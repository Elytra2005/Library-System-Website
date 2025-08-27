let fetchBooks = JSON.parse(localStorage.getItem("storedBook")) || [];
let previousCount = JSON.parse(localStorage.getItem("prevcount")) || 0;


document.addEventListener("DOMContentLoaded", () => {
        for(let i=0; i < fetchBooks.length; i++) {
                console.log(fetchBooks[i]);
                if(fetchBooks.length >= previousCount && fetchBooks != null) {
                    let section = document.querySelector(".reports-section");
                    let report_box = document.createElement("div");
                    let p = document.createElement("p");
                    section.appendChild(report_box);
                    report_box.appendChild(p);
                    report_box.classList.add("report-box");
                    p.textContent = ' Book Added';
                    p.insertAdjacentHTML('afterbegin', `<strong>${fetchBooks[i].title}: </strong>`);                    
                } 
        }

        localStorage.setItem("prevcount", fetchBooks.length.toString());
});



