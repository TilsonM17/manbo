# Mambo Kanban


### Descrição

Este teste consistem em um projeto React usando o framework Next.Js, alimentado por uma Api em NodeJs, que armazena dados no Banco de Dados MongoDB.

> Por conveniência e agilidade, deixei os 2 projectos no mesmo repositório, se fosse um projeto real, [o ideal é que eles estivessem em repositórios separados.](https://12factor.net/pt_br/codebase) 

Na api, o uso do Docker é totalmente opcional, o docker-compose no projeto apenas vai subir um serviço do MongoDB, caso não tenha o Mongo instalado em sua Máquina.

### Instalação

1 - Copie o projeto na sua máquina.

```sh
git clone [Url] 
```



#### Backend

2 - Acesse a pasta **backend** e copie a variável de ambiente

```sh
 cd project/backend
 cp .env.example .env
```

3 - Defina as Variáveis de ambiente e configure a QueryString

Exemplo:

```
APP_PORT=8082

MONGO_URI='mongodb://localhost:27017/'

```

> Caso não tenha o Mongo Instalado pode usar o docker.

4 - Instale as dependências e rode o projeto.

```
 npm install; npm run dev
```

Depois disso, a api estará no ar. Agora vamos configurar o Front.


#### Front

5 - Acesse a pasta do **front** e copie a variável de ambiente

```sh
 cp .env.example .env.local
```

6 - Defina as Variáveis de ambiente

Aqui vai o endereço da api, apenas o endereço sem uma barra no final.

Exemplo:

```
NEXT_PUBLIC_BACKEND_URI='http://localhost:8082'
```

7 - Instale as dependências e rode o projeto.

```
 npm install; npm run build
```

Depois de tudo, acesse o endereço do projeto, e __enjoy the moment__.


Qualquer dúvida fico à disposição.

