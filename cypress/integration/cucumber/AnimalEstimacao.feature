@feature-tag
Funcionalidade: Cadastro de animais
Eu, como cliente
Devo conseguir cadastrar meus animais de estimação
Para poder associá-los a agendamentos

Background: Estou logado
Dado que estou logado

Cenario: Acesso a formulário
Dado que estou na tela com a lista de animais cadastrados
Quando clicar em botão com texto "Adicionar novo animal"
Então devo ver formulário para cadastro de animais

# Cenário: Cadastro bem sucedido
# Dado que preenchi todos os campos corretamente
# Quando clicar em botão com texto "Adicionar"
# Então devo ver o novo animal na lista de animais cadastrados

# Cenário: Cadastro mal sucedido por campo nulo
# Dado que preenchi todos os campos corretamente
# Mas não preenchi o campo
# Quando clicar em botão com texto "Adicionar"
# Então devo ver mensagem de erro

# Exemplos:
# |campo|
# |nome|
# |foto|
# |tipo de animal|

# Cenário: Cadastro mal sucedido por animal duplicado
# Dado que preenchi todos os campos
# Mas preenchi o campo "nome" com valor já existente na lista
# Quando clicar em botão com texto "Adicionar"
# Então devo ver mensagem de erro

# Cenário: Solicitação de edição de animal
# Dado que apertei no botão editar
# Então devo ver formulário de animais com as informações do animal solicitado

# Cenário: Edição de animal
# Dado que alterei algum Dado
# Quando apertar em botão com texto "Salvar alterações"
# Então devo ver o animal na lista com as informações atualizadas

# Cenário: Deleção de animal
# Dado que apertei no botão deletar
# Então devo ver lista de animais sem o animal deletado