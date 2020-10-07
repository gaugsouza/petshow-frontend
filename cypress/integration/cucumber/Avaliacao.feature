Funcionalidade: Avaliação do serviço
    Eu, como cliente
    Devo conseguir avaliar o serviço prestado em diversas categorias após sua finalização
    Para demonstrar meu nível de satisfação.

    
    Cenário: Acesso a avaliação
    Dado que meu serviço foi concluído
    E estou na tela de status do agendamento
    Quando clicar no botão com texto "Avaliar serviço"
    Então devo ser redirecionado para página de avaliação

    Cenário: Avaliação bem sucedida
    Dado que estou na página de avaliação
    Quando preencher a quantidade de estrelas de 1 a 5 para cada categoria de avaliação corretamente
    E apertar em botão com texto "Enviar avaliação" 
    E a data do agendamento estiver dentro de prazo limite de avaliação
    Então devo receber mensagem de confirmação de avaliação 
        
        
        Exemplos:
            | Categorias            |
            | Atenção com o seu pet |
            | Custo Benefício       |
            | Qualidade do Serviço  |
            | Infraestrutura        |
            | Higiene               |
            
        
    Cenário: Avaliação mal sucedida
    Dado que estou na página de avaliação
    Quando preencher algum dos dados obrigatórios incorretamente 
    E apertar em botão com texto "Enviar avaliação"
    E a data do agendamento estiver dentro de prazo limite de avaliação
    Então devo ver mensagem de erro

    Cenário: Avaliação fora do prazo
    Dado que meu serviço foi concluído
    E estou na tela de status do agendamento
    Quando clicar no botão com texto "Avaliar serviço"
    Mas a data do agendamento estiver fora do prazo limite de avaliação
    Então devo ver mensagem de erro

    Cenário: Cancelamento de avaliação
    Dado que estou na página de avaliação
    Quando clicar no botão com texto "Cancelar"
        Então devo ser redirecionado para tela de status do agendamento
    