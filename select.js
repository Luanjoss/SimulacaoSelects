function selecionarEstado() {
    const selectEstado = document.getElementById("estado");
    const estadoSelecionado = selectEstado.value;
    const nomeEstado = selectEstado.options[selectEstado.selectedIndex].text;
    const capital = nomeEstado.split(" - ")[1]; // Obtém a capital do estado

    console.log("Estado selecionado:", nomeEstado);
    console.log("Sigla do estado:", estadoSelecionado);
    console.log("Capital do estado:", capital);
}

// Adiciona um ouvinte de evento para o select de estados
document.addEventListener("DOMContentLoaded", function() {
    const selectEstado = document.getElementById("estado");
    selectEstado.addEventListener("change", selecionarEstado);
});
