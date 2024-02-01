# Catho

## Passo a passo:

Para iniciar o projeto, você precisa do Docker e docker-compose instalados.
Versões do meu docker:

```sh
docker -v                            
Docker version 24.0.7, build afdd53b
````

```sh
docker-compose --version
Docker Compose version v2.23.0
```

----

Com o docker instalado, basta executar o comando:

```sh
chmod +x ./init.sh && ./init.sh
```

Após o script finalizar, será perguntado se você deseja executar o script de seed para o MongoDB. 

Essa parte do script vai popular o banco, caso você não queira, basta apertar N e dar enter.

## Ports

O portal (NextJS) está rodando na porta 3000

O back (NestJS) está rodando na porta 3001

## Tests

Os testes do back estão localizados neste path:

```
catho-back/src/candidates/candidates.service.spec.ts
```
