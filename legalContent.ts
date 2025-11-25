import React from 'react';

const h = React.createElement;
const Fragment = React.Fragment;

export const PrivacyPolicyContent = () => h(Fragment, null,
  h('p', { className: "mb-4" },
    h('strong', null, "Última atualização:"),
    ` ${new Date().toLocaleDateString('pt-PT')}`
  ),
  
  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "1. Introdução"),
  h('p', null,
    "A ", h('strong', null, "Agência 777"), " respeita a sua privacidade e compromete-se a proteger os seus dados pessoais. Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos as suas informações ao utilizar o nosso site e serviços, em conformidade com o ", h('strong', null, "Regulamento Geral de Proteção de Dados (RGPD)"), "."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "2. Responsável pelo Tratamento de Dados"),
  h('p', null,
    "O responsável pelo tratamento dos dados é a Agência 777. Para quaisquer questões relacionadas com a proteção de dados, pode contactar-nos através do e-mail: ", h('strong', null, "privacidade@agencia777.pt"), " (exemplo)."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "3. Dados que Recolhemos"),
  h('p', null, "Podemos recolher os seguintes tipos de dados:"),
  h('ul', { className: "list-disc pl-5 mt-2 space-y-1" },
    h('li', null, h('strong', null, "Dados de Identificação:"), " Nome, nome da empresa."),
    h('li', null, h('strong', null, "Dados de Contacto:"), " E-mail, número de telefone."),
    h('li', null, h('strong', null, "Dados Técnicos:"), " Endereço IP, tipo de navegador, localização aproximada (através de Google Analytics).")
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "4. Finalidade do Tratamento"),
  h('p', null, "Utilizamos os seus dados para:"),
  h('ul', { className: "list-disc pl-5 mt-2 space-y-1" },
    h('li', null, "Prestar os serviços contratados (criação e manutenção de sites)."),
    h('li', null, "Comunicar consigo sobre o estado do seu projeto."),
    h('li', null, "Processar pagamentos e faturação."),
    h('li', null, "Melhorar o nosso site e serviços (Marketing e Analytics).")
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "5. Partilha de Dados"),
  h('p', null,
    "Não vendemos os seus dados a terceiros. Podemos partilhar dados estritamente necessários com prestadores de serviços essenciais para a operação do nosso negócio, tais como:"
  ),
  h('ul', { className: "list-disc pl-5 mt-2 space-y-1" },
    h('li', null, "Processadores de pagamento (ex: Stripe)."),
    h('li', null, "Serviços de alojamento web e e-mail.")
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "6. Os seus Direitos"),
  h('p', null, "Ao abrigo do RGPD, tem direito a:"),
  h('ul', { className: "list-disc pl-5 mt-2 space-y-1" },
    h('li', null, "Aceder aos dados que temos sobre si."),
    h('li', null, "Solicitar a retificação de dados incorretos."),
    h('li', null, "Solicitar o apagamento dos dados (\"Direito a ser esquecido\")."),
    h('li', null, "Opor-se ao tratamento de dados para fins de marketing.")
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "7. Cookies"),
  h('p', null,
    "Utilizamos cookies para analisar o tráfego e melhorar a experiência do utilizador. Pode gerir as suas preferências de cookies através das definições do seu navegador."
  )
);

export const TermsContent = () => h(Fragment, null,
  h('p', { className: "mb-4" },
    h('strong', null, "Última atualização:"),
    ` ${new Date().toLocaleDateString('pt-PT')}`
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "1. Aceitação dos Termos"),
  h('p', null,
    "Ao subscrever os serviços da ", h('strong', null, "Agência 777"), ", concorda com estes Termos e Condições. Se não concordar com alguma parte destes termos, não deverá utilizar os nossos serviços."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "2. Descrição do Serviço"),
  h('p', null,
    "A Agência 777 fornece serviços de criação, alojamento e manutenção de websites em regime de subscrição mensal. Os serviços incluem o design, desenvolvimento, certificado SSL e suporte técnico conforme o plano escolhido."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "3. Pagamentos e Subscrição"),
  h('ul', { className: "list-disc pl-5 mt-2 space-y-1" },
    h('li', null, "O pagamento é efetuado mensalmente através de débito recorrente."),
    h('li', null, "O não pagamento da mensalidade pode resultar na suspensão temporária do site após aviso prévio.")
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "4. Cancelamento e Fidelização"),
  h('p', null,
    "Não existe fidelização obrigatória (salvo indicação contrária em campanhas específicas). Pode cancelar o serviço a qualquer momento, devendo notificar a Agência 777 com ", h('strong', null, "15 dias de antecedência"), " antes da próxima data de renovação."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "5. Propriedade Intelectual"),
  h('p', null,
    "O conteúdo (textos, imagens fornecidas pelo cliente) é propriedade do cliente. A estrutura técnica, código e design do site permanecem propriedade da Agência 777 enquanto o serviço de subscrição estiver ativo. O cliente pode solicitar a compra (buyout) do site mediante orçamento específico."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "6. Responsabilidade"),
  h('p', null,
    "A Agência 777 esforça-se por manter um uptime de 99,9%, mas não pode ser responsabilizada por falhas de terceiros (servidores, datacenters). Não nos responsabilizamos pelo conteúdo publicado pelo cliente no seu próprio site."
  ),

  h('h3', { className: "text-lg font-bold text-white mt-6 mb-2" }, "7. Lei Aplicável"),
  h('p', null,
    "Estes termos regem-se pela lei portuguesa. Para resolução de litígios, é competente o foro da comarca de Lisboa, com expressa renúncia a qualquer outro."
  )
);