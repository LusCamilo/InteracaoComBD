# permite visualizar todos os dataBase existentes no BD
show databases;

# permite criar um dataBase no BD
create database db_lion_school;

# permite excluir um dataBase e toda sua extrutura de dados no BD
drop database dbcontatos20222; 

# permite ativar a utilização de um dataBase (semelhante a um cd no prompt) 
use db_lion_school;

# permite visualizar todas as tabelas existentes dentro de um dataBase
show tables;

# cria uma tabela no dataBase selecionado
create table tbl_aluno (

	id int UNSIGNED not null auto_increment primary key,
    nome varchar(80) not null,
    foto varchar(150) not null,
    sexo varchar(1),
    rg  varchar(15) not null,
    cpf varchar(20) not null,
    email varchar(256) not null,
    telefone varchar (18),
    celular varchar (18),
    data_nasc date not null,
    unique index(id) # diz que o id nao pode se repetir
    
);
create table tbl_curso (

	id int UNSIGNED not null auto_increment primary key,
	nome varchar(50) not null,
	carga_horaria int not null,
	icone varchar(150) not null,
	sigla varchar(4) not null,
	unique index(id)

);

create table tbl_aluno_curso(

	id int UNSIGNED not null auto_increment primary key,
    id_aluno int UNSIGNED not null,
    id_curso int unsigned not null,
    matricula varchar(15) not null,
    status_aluno varchar(10) not null,
    
    # programacao para definir uma chave estrangeira
    foreign key(id_aluno) #define qual atributo sera uma fk
		references tbl_aluno(id), # define de inde vira a pk
	foreign key(id_curso) #define qual atributo sera uma fk
		references tbl_curso(id), # define de inde vira a pk
	unique index(id) 
);
# permite visualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

# permite inserir dados em uma tabela
insert into tbl_aluno(
	nome, 
	foto, 
	sexo, 
	rg, 
	cpf,
	email, 
	telefone, 
	celular, 
	data_nasc
)
	values(
		'José da silva', 
		'https://nuem.ct.utfpr.edu.br/wp-content/uploads/2021/03/MarcoDaSilva2_edited-Copia-360x270.jpg', 
        'M', 
        '34.456.666-1',
        '300.567.456-23',
        'jose@gmail.com',
        '011 4556-7777',
        '011 9 9765-6660',
        '1999-09-09'
	);
insert into tbl_aluno(
	nome, 
	foto, 
	sexo, 
	rg, 
	cpf,
	email, 
	telefone, 
	celular, 
	data_nasc
)
	values(
		'joaquina guimarães', 
		'https://lulacerda.ig.com.br/wp-content/uploads/2021/01/carlota-joaquina-1.jpg', 
        'F', 
        '45.466.999-0',
        '355.987.867-56',
        'joaquina@gmail.com',
        '011 5667-8888',
        '011 9 9895-7771',
        '2000-10-10'
	);
    
# altera o valor de um atributo da tabela	
	#Obs. sempre coloque qual vai ser o registro que sofrera alteracao
update tbl_aluno set rg = '35.567.23-4' where id = 1;

# Permite apagar um registro de uma tabela do BD
	#Obs. sempre coloque qual vai ser o registro que sofrera alteracao
delete from tbl_aluno where id = 2;

