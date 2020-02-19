# Projeto-SIGG-Nodejs

Para rodar o projeto é necessário digitar primeiro:

npm install

após isso configurar o banco de dados em:

config/config.json

após isso precisa-se efetuar os migrates:

mas para efetuar os migrates precisa criar o banco de dados no postgresql

para isso digite os seguintes comandos

sudo su postgres
psql
create database sigg_node;
\q

após isso volte a pasta do projeto e digite:
sequelize db:migrate
