# gobarberbackend

## ⚠️Aplicação em desenvolvimento⚠️

## Features pendentes

### Recuperação de senha
**RequisitosFuncionais**

- o usuário deve poder recuperar sua senha informando o seu email;
- o usuário deve receber um email com instruções de recuperação de senha;
- o usuário deve poder resetar sua senha;

**RequisitosNãoFuncionais**

- Utilizar mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job)

**RegrasDeNegócios**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


### Atualização do perfil

**RequisitosFuncionais**

- O usuário deve podr atualizar se nome, email e senha;

**RegrasDeNegócios**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

### Painel do  prestador

**RequisitosFuncionais**

- O usuário deve poder listar seus agendamntos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RequisitosNãoFuncionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RegrasDeNegócios**
- A notificação deve ter um status de lida ou não lida para que o prestador posssa controlar;

### Agendamento de serviços

**RequisitosFuncionais**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia espacífico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RequisitosNãoFuncionais**

- A listagem de prestadores deve ser armazenada em cache;

**RegrasDeNegócios**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos dvem estar disponíveis entre 8h e 18h (Primeiro as 8h e último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
