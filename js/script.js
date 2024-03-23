// Classe para representar uma tabela
class Tabela {
    constructor(nome) {
        this.nome = nome;
        this.campos = [];
        this.registros = [];
    }

    // Métodos para adicionar campo e registro à tabela
    adicionarCampo(campo) {
        this.campos.push(campo);
    }
    adicionarRegistro(registro) {
        this.registros.push(registro);
    }
}

// Função para carregar os dados de uma tabela
function carregarTabela(nomeTabela, campos, registros) {
    const tabela = new Tabela(nomeTabela);
    campos.forEach(campo => tabela.adicionarCampo(campo));
    registros.forEach(registro => tabela.adicionarRegistro(registro));
    return Promise.resolve(tabela);
}

// Função para executar o comando SELECT
function executarSelect(tabelas, campos) {
    console.log("Tabelas:", tabelas);
    console.log("Campos:", campos);

    // Array para armazenar os dados das tabelas
    const dadosTabelas = [];

    // Promise para carregar os dados de cada tabela
    const promises = tabelas.map(nomeTabela => {
        // Simular definição de campos e registros
        let camposTabela = [];
        let registrosTabela = [];

        // Definir campos e registros com base no nome da tabela
        switch (nomeTabela) {
            case 'alunos':
                camposTabela = ['id', 'nome', 'idade'];
                registrosTabela = [
                    { id: 1, nome: 'João', idade: 30 },
                    { id: 2, nome: 'Maria', idade: 25 },
                    { id: 3, nome: 'Pedro', idade: 20 }
                    ];
                break;
            case 'disciplinas':
                camposTabela = ['id_dis', 'curso', 'periodo', 'alunos_id'];
                registrosTabela = [
                    { id_dis: 1, curso: 'TSI', periodo: 2, alunos_id: 1 },
                    { id_dis: 2, curso: 'ADM', periodo: 3, alunos_id: 2 },
                    { id_dis: 3, curso: 'IPI', periodo: 1, alunos_id: 3 }
                    ];
                break;                
            // Adicione outros casos conforme necessário
            default:
                console.error(`Tabela '${nomeTabela}' não encontrada.`);
        }

        // Carregar e adicionar tabela aos dadosTabelas
        const tabelaPromise = carregarTabela(nomeTabela, camposTabela, registrosTabela);
        return tabelaPromise.then(tabela => {
            dadosTabelas.push(tabela);
        });
    });

    // Promise.all para esperar que todos os dados sejam carregados
    Promise.all(promises)
        .then(() => {
            // Realizar os joins entre as tabelas
            const resultados = realizarJoins(dadosTabelas, campos);
            
            // Exibir os resultados na interface
            exibirResultados(resultados);
        })
        .catch(error => console.error('Erro ao carregar tabelas:', error));
}



// Função para realizar os joins entre as tabelas
function realizarJoins(dadosTabelas, campos) {
    const resultados = [];
    const tabelaBase = dadosTabelas[0];

    tabelaBase.registros.forEach(registroBase => {
        const registroJoin = {};
        campos.forEach(campo => {
            if (tabelaBase.campos.includes(campo)) {
                registroJoin[campo] = registroBase[campo];
            }
        });

        for (let i = 1; i < dadosTabelas.length; i++) {
            const tabelaAtual = dadosTabelas[i];
            const campoJoin = `${tabelaBase.nome}_id`;

            if (!tabelaAtual.campos.includes(campoJoin)) {
                console.error(`Erro: Campo de join '${campoJoin}' não encontrado na tabela '${tabelaAtual.nome}'.`);
                continue;
            }

            tabelaAtual.registros.forEach(registro => {
                if (registro[campoJoin] === registroBase.id) {
                    for (const campo in registro) {
                        if (campos.includes(campo)) {
                            registroJoin[campo] = registro[campo];
                        }
                    }
                }
            });
        }

        resultados.push(registroJoin);
    });

    console.log("Resultados finais:", resultados);
    return resultados;
}

// Função para exibir os resultados na interface
function exibirResultados(resultados) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Limpar resultados anteriores

    resultados.forEach((registro, index) => {
        const registroDiv = document.createElement("div");
        registroDiv.classList.add("registro");

        const titulo = document.createElement("h3");
        titulo.textContent = `Registro ${index + 1}`;
        registroDiv.appendChild(titulo);

        const listaCampos = document.createElement("ul");
        for (const campo in registro) {
            const campoItem = document.createElement("li");
            campoItem.textContent = `${campo}: ${registro[campo]}`;
            listaCampos.appendChild(campoItem);
        }
        registroDiv.appendChild(listaCampos);

        outputDiv.appendChild(registroDiv);
    });
}


// Manipular evento de submissão do formulário
document.getElementById("selectForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    const tabelasInput = document.getElementById("tabelas").value.trim();
    const camposInput = document.getElementById("campos").value.trim();

    // Verificar se o campo de tabelas está vazio
    if (tabelasInput === "") {
        alert("Por favor, especifique pelo menos uma tabela.");
        return; // Interrompe a execução se o campo de tabelas estiver vazio
    }

    // Separar as tabelas e os campos em arrays
    const tabelas = tabelasInput.split(",");
    const campos = camposInput.split(",");

    // Chamar a função para executar o comando SELECT
    executarSelect(tabelas, campos);
});