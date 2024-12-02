// Função para obter mensagens da API
function obterMensagens() {
    return $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
    }).fail(function (jqXHR) {
        console.error('Erro ao obter mensagens da API:', jqXHR.responseText || jqXHR.statusText);
        alert('Erro ao carregar mensagens. Tente novamente mais tarde.');
    });
}

// Função para enviar uma nova mensagem para a API
function inserirMensagem(mensagem) {
    $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            alert('Mensagem enviada com sucesso!');
            carregarMensagens(); // Recarrega as mensagens na tabela
        },
        error: function (jqXHR) {
            console.error('Erro ao enviar mensagem:', jqXHR.responseText || jqXHR.statusText);
            alert('Erro ao enviar a mensagem. Verifique os dados e tente novamente.');
        }
    });
}

// Função para carregar as mensagens na tabela
function carregarMensagens() {
    obterMensagens().then(function (mensagens) {
        const tbody = document.querySelector('#messages-table tbody');
        tbody.innerHTML = ''; // Limpa a tabela antes de preenchê-la

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
    });
}

// Captura o envio do formulário de contato e envia a mensagem para a API
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('msg').value.trim();

    if (nome && email && mensagem) {
        // Monta o objeto esperado pela API
        const novaMensagem = { nome, email, mensagem };
        inserirMensagem(novaMensagem); // Chama a função para enviar a mensagem
    } else {
        alert('Preencha todos os campos antes de enviar.');
    }
});

// Carrega as mensagens quando a página de administração estiver pronta
document.addEventListener('DOMContentLoaded', carregarMensagens);

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
