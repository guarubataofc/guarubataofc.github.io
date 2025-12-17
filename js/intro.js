const introModal = document.getElementById("introModal");
const enterButton = document.getElementById("enterSite");

// Se ainda NÃO entrou nesta aba, mostra o modal
if (!sessionStorage.getItem("introSeen")) {
    introModal.classList.add("active");
}

enterButton.addEventListener("click", () => {
    sessionStorage.setItem("introSeen", "true");
    introModal.classList.remove("active");
});