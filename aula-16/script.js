const form = document.querySelector("#form-newsletter");
const mensagem = document.querySelector("#mensagem");


form.addEventListener("submit", function (event) {
event.preventDefault();
const nome = document.querySelector("#nome").value;
const email = document.querySelector("#email").value;
if (nome.trim() === "" || email.trim() === "") {
mensagem.textContent = "Preencha todos os campos!";
mensagem.style.color = "red";
} else {
mensagem.textContent = "Cadastro realizado com sucesso!";
mensagem.style.color = "green";
}
});