# Gobarber Backend
Aplicação criada no curso GoStack da Rocketseat. neste repositório, contém toda a parte do backend da aplicação. o repositório Frontend encontra-se em https://github.com/FelipenKniess/frontend-gobarber


## Requisítos Funcionais, não funcionais e regras de negócio

### ``RECUPERAÇÃO DE SENHA``

**RF**

- O usuário deve poder recuperar a sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimemnto;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nvoa senha ao resetar sua senha;

### ``Atualização do perfil``

**RF**
- O usuário deve poder atualizar seu nome, email e senha

**RN**
- O usuário não pode alterar seu email para um email ja utilizado;
- Para atualizar a senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confiramr a nova senha;

### ``Painel do prestador``

**RF**
- O usuário deve poder lsitar seus agendaments de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestados no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um status de lida e não-lida para o prestados conseguir controlar;

### ``Agendamento de serviços``

**RF**
- O usuário deve poder listar todos os prestadores de serviço cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíves em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário ja oucupado;
- O usuário não pode agendar em um horário que ja passou;
- O usuário não pode agendar serviços consigo mesmo;
