document.addEventListener('DOMContentLoaded', () => {
    const btnGet = document.getElementById('btnGet');
    const respostaGet = document.getElementById('respostaGet');

    const nomeInput = document.getElementById('nomeInput');
    const btnPost = document.getElementById('btnPost');
    const respostaPost = document.getElementById('respostaPost');

    // Função para fazer requisição GET
    btnGet.addEventListener('click', async () => {
        try {
            // A URL deve corresponder ao mapeamento do seu servlet no Tomcat
            // Se o Tomcat estiver rodando localmente na porta 8080 e o contexto do seu projeto for 'SeuProjetoWeb',
            // a URL completa seria http://localhost:8080/SeuProjetoWeb/meuServlet
            // Verifique o contexto do seu projeto no Eclipse (clique com direito no projeto -> Propriedades -> Web Project Settings)
            // Ou o nome do seu projeto no Eclipse que será o contexto padrão.
            const url = 'http://localhost:8080/teste_001/meuServlet'; // Adapte esta URL!

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            const data = await response.json(); // Assume que o servlet retorna JSON
            respostaGet.textContent = `Mensagem do Servidor: ${data.mensagem}`;
        } catch (error) {
            console.error('Erro ao obter dados do servlet (GET):', error);
            respostaGet.textContent = 'Erro ao conectar com o servidor.';
        }
    });

    // Função para fazer requisição POST
    btnPost.addEventListener('click', async () => {
        const nome = nomeInput.value;
        if (!nome) {
            alert('Por favor, digite seu nome.');
            return;
        }

        try {
            const url = 'http://localhost:8080/teste_001/meuServlet'; // Adapte esta URL!

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Para enviar dados de formulário
                    // ou 'Content-Type': 'application/json' se você enviar um objeto JSON no corpo
                },
                // Para enviar como application/x-www-form-urlencoded
                body: `nome=${encodeURIComponent(nome)}`
                // Para enviar como application/json:
                // body: JSON.stringify({ nome: nome })
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            const data = await response.json();
            respostaPost.textContent = `Resposta do Servidor: ${data.mensagem}`;
        } catch (error) {
            console.error('Erro ao enviar dados para o servlet (POST):', error);
            respostaPost.textContent = 'Erro ao conectar com o servidor.';
        }
    });
});