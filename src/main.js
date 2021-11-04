import api from './api';

// Serve para controla toda aplicação
class App {
    constructor() {
        this.repositories = [];

        this.formElement = document.getElementById('repo-form');

        this.listElement = document.getElementById('repo-list');

        this.inputElement = document.querySelector('input[name=repository]');

        this.registerHandlers();
    }

    registerHandlers() {
        // Vou registrar os eventos.
        // Quando o usuario submitar o form
        this.formElement.onsubmit = event => this.addRepository(event); // Só tenho uma linha dentro do meu corpo da função então jogo assim para mesma linha caso aconteça isto.

    }

    setLoading(loading = true) {
        if(loading === true) {
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Carregando'));
            loadingElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadingElement);

        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        // O event para fazer somente o preventDefault e para não deixar o form ter aquele funcionamento comum que é de recarregar a pagina e enviar method get e post.
        event.preventDefault();

        const repoInput = this.inputElement.value;

        if (repoInput.length === 0) {
            return;
        }
    
        this.setLoading();

        try {
            // Fazendo requisção a API
            const response = await api.get(`/repos/${repoInput}`);
            console.log(response);

            // Desestruturação
            const { name, description, html_url, owner: {avatar_url} } = response.data

            this.repositories.push({
                // Object Short Syntax
                nome: name,
                description,
                avatar_url,
                html_url
            });

            this.inputElement.value = '';

            this.render()
        
        } catch(err) {
            alert(' Repositório não encontrado!');
        }    

        this.setLoading(false);
    }

    render() {
        // Apaga todo conteudo da lista e renderiza do zero.
        this.listElement.innerHTML = ''; // Vou fazer apagar.

        // Usarei o forEach para percorrer somente, sem fazer nenhuma alteração no array.
        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repo.avatar_url);

            let titleElement = document.createElement('strong');
            titleElement.appendChild(document.createTextNode(repo.nome));

            let descriptionElement = document.createElement('p');
            descriptionElement.appendChild(document.createTextNode(repo.description));

            let linkElement = document.createElement('a');
            linkElement.setAttribute('target', '_blank');
            linkElement.setAttribute('href', repo.html_url);
            linkElement.appendChild(document.createTextNode('Acessar'));

            let listItemElement = document.createElement('li');
            listItemElement.appendChild(imgElement);
            listItemElement.appendChild(titleElement);
            listItemElement.appendChild(descriptionElement);
            listItemElement.appendChild(linkElement);

            this.listElement.appendChild(listItemElement);

        }) 
    }
}

// const MeuApp = new App(); - Como eu não preciso armazena esta classe em nenhuma variavel ou não vou reutilizar esta variavel depois eu posso simplesmente new App(); e ele também executa a classe sem problema.
new App();