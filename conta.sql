select * from conta

create table conta(
id int identity,
email varchar (50),
senha varchar (50)
);

insert into conta values ('felipe@gmail.com','feliperafael');
insert into conta values ('patricia@gmail.com','patriciapatricia');

drop table conta

select * from conta where email = 'felipe@gmail.com'