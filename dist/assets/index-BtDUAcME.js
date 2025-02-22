(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();let a=[{id:1,title:"The Great Gatsby",author:"F. Scott Fitzgerald",category:"Fiction",copies:3,available:3},{id:2,title:"To Kill a Mockingbird",author:"Harper Lee",category:"Fiction",copies:2,available:2},{id:3,title:"JavaScript: The Good Parts",author:"Douglas Crockford",category:"Programming",copies:4,available:4}];const c=document.getElementById("searchInput"),u=document.getElementById("searchType"),d=document.getElementById("booksList"),h=document.getElementById("addBookForm");c.addEventListener("input",v);u.addEventListener("change",v);h.addEventListener("submit",p);function v(){const r=c.value.toLowerCase(),e=u.value,t=a.filter(n=>n[e].toLowerCase().includes(r));s(t)}function s(r=a){d.innerHTML="";const e=document.createElement("div");e.className="books-grid",r.forEach(t=>{const n=document.createElement("div");n.className="book-card";const o=t.available===0?"status-unavailable":t.available<=2?"status-low":"status-available";n.innerHTML=`
      <div class="book-header">
        <h3>${t.title}</h3>
      </div>
      <div class="book-content">
        <div class="book-info">
          <p>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            ${t.author}
          </p>
          <p>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            ${t.category}
          </p>
          <p class="${o}">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Available: ${t.available}/${t.copies}
          </p>
        </div>
        <div class="book-actions">
          ${t.available>0?`<button onclick="borrowBook(${t.id})">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Borrow
            </button>`:"<button disabled>Not Available</button>"}
          <button onclick="returnBook(${t.id})">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Return
          </button>
        </div>
      </div>
    `,e.appendChild(n)}),d.appendChild(e)}function p(r){r.preventDefault();const e={id:a.length+1,title:document.getElementById("bookTitle").value,author:document.getElementById("bookAuthor").value,category:document.getElementById("bookCategory").value,copies:parseInt(document.getElementById("bookCopies").value),available:parseInt(document.getElementById("bookCopies").value)};a.push(e),s(),h.reset()}window.borrowBook=function(r){const e=a.find(t=>t.id===r);e&&e.available>0&&(e.available--,s())};window.returnBook=function(r){const e=a.find(t=>t.id===r);e&&e.available<e.copies&&(e.available++,s())};s();
