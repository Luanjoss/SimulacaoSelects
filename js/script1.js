class Aluno {

    constructor() {
        this.id= 1;
        this.arrayAlunos = [];

    }


    salvar() {
        let aluno = this.lerDAdos();

        if (this.validaCampos(aluno)) {
            this.adicionar(aluno);
        }

        this.listaTabela();
    }

    listaTabela() {
        let tbody = document.getElementById("tbody");
        tbody.innerText = '';

        for (let i = 0; i < this.arrayAlunos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_idade = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayAlunos[i].id;
            td_nome.innerText = this.arrayAlunos[i].nomeAluno;
            td_idade.innerText = this.arrayAlunos[i].idade;

            td_id.classList.add('center');

        }
    }

    adicionar(aluno) {
        this.arrayAlunos.push(aluno);
        this.id++;
        
    }

    lerDAdos() {
        let aluno = {}

        aluno.id = this.id;
        aluno.nomeAluno = document.getElementById('aluno').value;
        aluno.idade = document.getElementById('idade').value;

        return aluno;
    }

    validaCampos(aluno) {
    let msg = '';

        if (aluno.nomeAluno == '') {
            msg += '- informe o nome do aluno \n';
        }
        if (aluno.idade == '') {
            msg += '- informe o idade do aluno \n';
        }

        if (msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        
    }

}


    
var aluno = new Aluno();