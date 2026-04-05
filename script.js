document.addEventListener("DOMContentLoaded", () => {

    const userAgent = navigator.userAgent;
    let os = "Невідома ОС";
    let browser = "Невідомий браузер";

    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "MacOS";
    else if (userAgent.includes("Linux")) os = "Linux";

    if (userAgent.includes("Chrome")) browser = "Google Chrome";
    else if (userAgent.includes("Firefox")) browser = "Mozilla Firefox";
    else if (userAgent.includes("Safari")) browser = "Apple Safari";
    else if (userAgent.includes("Edge")) browser = "Microsoft Edge";

    const systemInfo = `ОС: ${os}, Браузер: ${browser}`;
    
    localStorage.setItem("userSystemInfo", systemInfo);

    const savedInfo = localStorage.getItem("userSystemInfo");
    

    
    const variantNumber = 1; 
    const commentsContainer = document.getElementById("comments-container");

    fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
        .then(response => response.json())
        .then(comments => {
            commentsContainer.innerHTML = ""; 
            comments.forEach(comment => {
                const commentHTML = `
                    <div class="comment-box">
                        <p class="comment-email">${comment.email}</p>
                        <p>${comment.body}</p>
                    </div>
                `;
                commentsContainer.innerHTML += commentHTML;
            });
        })
        .catch(error => {
            commentsContainer.innerHTML = "Помилка завантаження відгуків.";
            console.error(error);
        });


    
    const modal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".close-btn");

    
    setTimeout(() => {
        modal.style.display = "block";
    }, 60000); 

  
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


 
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");

    // Функція перевірки часу
    function checkTimeAndSetTheme() {
        const currentHour = new Date().getHours();
        // Якщо час від 07:00 до 20:59 (денна тема)
        if (currentHour >= 7 && currentHour < 21) {
            body.classList.add("light-mode");
        } else {
            body.classList.remove("light-mode"); 
        }
    }

    checkTimeAndSetTheme();

    themeToggleBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
    });

});