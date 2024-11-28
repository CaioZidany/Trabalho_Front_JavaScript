function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function () {
        return retorno;
    });

    consulta.done(function (data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(mensagem) {



   /* var mensagem = {
        nome: "nome da pessoa",
        email: "email informado",
        mensagem: "a mensagem informada"
    } */



    $.ajax({

        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            console.log('Mensagem enviada com sucesso:', mensagem);
        },
        error: function (erro) {
            console.error('Erro ao enviar mensagem:', erro);
        }
    });
}

function carregarMensagens() {
    const mensagens = obterMensagens(); // Obtém mensagens da API

    const tbody = document.querySelector('#messages-table tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de preencher

    if (mensagens && mensagens.length > 0) {
        mensagens.forEach((mensagem) => {
            const linha = document.createElement('tr');

            const colunaNome = document.createElement('td');
            colunaNome.textContent = mensagem.nome || 'Não informado';

            const colunaEmail = document.createElement('td');
            colunaEmail.textContent = mensagem.email || 'Não informado';

            const colunaMensagem = document.createElement('td');
            colunaMensagem.textContent = mensagem.mensagem || 'Não informado';

            linha.appendChild(colunaNome);
            linha.appendChild(colunaEmail);
            linha.appendChild(colunaMensagem);

            tbody.appendChild(linha);
        });
    } else {
        const linha = document.createElement('tr');
        const coluna = document.createElement('td');
        coluna.setAttribute('colspan', '3');
        coluna.textContent = 'Nenhuma mensagem encontrada.';
        linha.appendChild(coluna);
        tbody.appendChild(linha);
    }
}

function validarUsuario(objLoginSenha) {
    let retorno = false;

    $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false, // Não recomendável, mas usado para simplificar neste caso
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha),
    })
        .done(function (data) {
            // Supondo que a API retorne um campo "valido" com valor booleano
            retorno = data.valido;
        })
        .fail(function () {
            console.error('Erro ao validar o usuário.');
        });

    return retorno;
}
