const products = ['translation', 'market', 'programming', 'learning', 'fitness', 'writing']

// Data para cada produto (fizemos um objeto e nao na base de dados porque não tinhamos intenção de ser dinamico)
const data = {
    translation: {
        name: 'Tradução de Línguas',
        data: {
            banner: 'bannerTranslation.jpg',
            popular: {
                title: 'Traduções mais populares',
                elements: [ 
                    {
                        id: 'english',
                        name: 'Inglês'
                    },
                    {
                        id: 'spanish',
                        name: 'Espanhol'
                    },
                    {
                        id: 'french',
                        name: 'Francês'
                    },
                ],
            },
            explore: {
                title: 'Explorar Traduções',
                elements: [
                    {
                        id: 'english',
                        name: 'Inglês',
                        image: 'english.png'
                    },
                    {
                        id: 'spanish',
                        name: 'Espanhol',
                        image: 'spanish.png'
                    },
                    {
                        id: 'french',
                        name: 'Francês',
                        image: 'french.png'
                    },
                    {
                        id: 'german',
                        name: 'Alemão',
                        image: 'german.png'
                    },
                    {
                        id: 'mandarin',
                        name: 'Mandarim',
                        image: 'mandarin.png'
                    },
                    {
                        id: 'russian',
                        name: 'Russo',
                        image: 'russian.png'
                    },
                    {
                        id: 'arabic',
                        name: 'Árabe',
                        image: 'arabic.png'
                    },
                    {
                        id: 'hindi',
                        name: 'Hindi',
                        image: 'hindi.png'
                    }
                ]
            }
        },
        resume: {
            left: {
                question: 'Você tem um documento importante que precisa ser traduzido com precisão e profissionalismo?',
                answer: 'A nossa equipa especializada em tradução de línguas está pronta para oferecer serviços de alta qualidade, garantindo que as suas necessidades sejam atendidas com experiência e eficiência.'
            },
            right: {
                question: 'Por que escolher nossos serviços de tradução?',
                topics: [
                    'Especialização em Diversos Campos de Tradução',
                    'Qualidade Garantida',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        faq: [
            {
                question: 'Como posso ter a certeza que o meu documento será bem traduzido?',
                answer: 'Os nossos tradutores são altamente qualificados e experientes em diferentes áreas de tradução. Além disso, implementamos rigorosos processos de revisão e controlo de qualidade para garantir a precisão e a qualidade de todas as traduções.'
            },
            {
                question: 'Quanto tempo demora para traduzir um documento?',
                answer: 'O tempo de tradução pode variar dependendo da complexidade do documento, do seu tamanho e do par de idiomas envolvidos. Geralmente, fornecemos prazos estimados de entrega no momento da solicitação, levando em consideração esses fatores.'
            },
        ]
    },
    market: {
        name: 'Mercado Financeiro',
        data: {
            banner: 'bannerMarket.jpg',
            popular: {
                title: 'Mercados mais populares',
                elements: [ 
                    {
                        id: 'stocks',
                        name: 'Investimento em Ações'
                    },
                    {
                        id: 'forex',
                        name: 'Forex'
                    },
                    {
                        id: 'cripto',
                        name: 'Criptomoedas'
                    },
                ],
            },
            explore: {
                title: 'Explorar Mercados Financeiros',
                elements: [
                    {
                        id: 'stocks',
                        name: 'Investimento em Ações',
                        image: 'stocks.jpg'
                    },
                    {
                        id: 'forex',
                        name: 'Forex',
                        image: 'forex.png'
                    },
                    {
                        id: 'cripto',
                        name: 'Criptomoedas',
                        image: 'cripto.jpg'
                    },
                    {
                        id: 'personal',
                        name: 'Finanças Pessoais',
                        image: 'personal.jpg'
                    },
                    {
                        id: 'corporate',
                        name: 'Finanças Corporativas',
                        image: 'corporate.jpg'
                    },
                    {
                        id: 'risk',
                        name: 'Riscos Financeiros',
                        image: 'risk.jpg'
                    },
                    {
                        id: 'alternative',
                        name: 'Investimentos Alternativos',
                        image: 'alternative.png'
                    },
                    {
                        id: 'indice',
                        name: 'Índice de Mercados',
                        image: 'indice.jpg'
                    }
                ]
            }
        },
        resume: {
            left: {
                question: 'Tem um documento importante relacionado ao mercado financeiro que necessita de precisão e profissionalismo?',
                answer: 'A nossa equipa especializada em mercado financeiro está pronta para oferecer serviços de alta qualidade, garantindo que as suas necessidades sejam atendidas com experiência e eficiência.'
            },
            right: {
                question: 'Porquê escolher os nossos especialistas em mercado financeiro?',
                topics: [
                    'Especialização em Finanças',
                    'Qualidade Garantida',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        faq: [
            {
                question: 'O que é mercado financeiro?',
                answer: 'O mercado financeiro é um sistema que permite a compra e venda de instrumentos financeiros, como ações, títulos, commodities e moedas. Ele engloba diversos participantes, incluindo investidores, instituições financeiras, governos e reguladores.'
            },
            {
                question: 'Qual é a importância do mercado financeiro na economia?',
                answer: 'O mercado financeiro desempenha um papel fundamental na alocação eficiente de recursos na economia. Ele facilita o financiamento de empresas, governos e projetos de infraestrutura, além de permitir que investidores façam investimentos e gerenciem riscos.'
            },
        ]
	},
    programming: {
        name: 'Programação',
        data: {
            banner: 'bannerProgramming.png',
            popular: {
                title: 'Áreas Programação mais populares',
                elements: [ 
                    {
                        id: 'dbw',
                        name: 'Desenvolvimento Web'
                    },
                    {
                        id: 'eda',
                        name: 'Estrutura de dados e Algoritmos'
                    },
                    {
                        id: 'poo',
                        name: 'Programação Orientada a Objetos'
                    },
                ],
            },
            explore: {
                title: 'Explorar Aprendizagens',
                elements: [
                    {
                        id: 'dbw',
                        name: 'Desenvolvimento Web',
                        image: 'dbw.png'
                    },
                    {
                        id: 'eda',
                        name: 'Estrutura de dados e Algoritmos',
                        image: 'eda.jpg'
                    },
                    {
                        id: 'poo',
                        name: 'Programação Orientada a Objetos',
                        image: 'poo.jpg'
                    },
                    {
                        id: 'python',
                        name: 'Python',
                        image: 'python.jpg'
                    },
                    {
                        id: 'php',
                        name: 'PHP',
                        image: 'php.jpg'
                    },
                    {
                        id: 'quality',
                        name: 'Qualidade de Código',
                        image: 'quality.png'
                    },
                    {
                        id: 'frameworks',
                        name: 'Frameworks',
                        image: 'frameworks.jpg'
                    },
                    {
                        id: 'backend',
                        name: 'Desenvolvimento Back-end',
                        image: 'backend.jpg'
                    }
                ]
            }
        },
        resume: {
            left: {
                question: 'Tem um projeto importante relacionado à programação que necessita de precisão e profissionalismo?',
                answer: 'A nossa equipa especializada em programação está pronta para oferecer serviços de alta qualidade, garantindo que as suas necessidades sejam atendidas com experiência e eficiência.'
            },
            right: {
                question: 'Porquê escolher os nossos especialistas em programação?',
                topics: [
                    'Especialização em Programação',
                    'Garantia de Qualidade',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        faq: [
            {
                question: 'O que é programação?',
                answer: 'A programação é o processo de escrever instruções para computadores, permitindo que eles executem tarefas específicas. Ela é fundamental para o desenvolvimento de software, aplicativos e sistemas.'
            },
            {
                question: 'Qual é a importância da programação na era digital?',
                answer: 'A programação é essencial na era digital, pois possibilita a criação de software e aplicativos que impulsionam a tecnologia e a inovação em diversas áreas, como comunicação, saúde, educação e entretenimento.'
            },
        ]
    },



    learning: {
        name: 'Aprendizagem',
        data: {
            banner: 'bannerlearning.jpg',
            popular: {
                title: 'Aprendizagens mais populares',
                elements: [ 
                    {
                        id: 'maths',
                        name: 'Matemática'
                    },
                    {
                        id: 'portuguese',
                        name: 'Português'

                    },
                    {
                        id: 'science',
                        name: 'Ciências'
                    },
                ],
            },
            explore: {
                title: 'Explorar Aprendizagens',
                elements: [
                    {
                        id: 'maths',
                        name: 'Matemática',
                        image: 'maths.jpg'
                    },
                    {
                        id: 'portuguese',
                        name: 'Português',
                        image: 'portuguese.jpg'
                    },
                    {
                        id: 'science',
                        name: 'Ciências',
                        image: 'science.jpg'
                    },
                    {
                        id: 'history',
                        name: 'História',
                        image: 'history.jpg'
                    },
                    {
                        id: 'languages',
                        name: 'Línguas Estrangeiras',
                        image: 'languages.jpg'
                    },
                    {
                        id: 'art',
                        name: 'Artes e Cultura',
                        image: 'art.jpg'
                    },
                    {
                        id: 'tecnology',
                        name: 'Tecnologia',
                        image: 'tecnology.jpg'
                    },
                    {
                        id: 'sports',
                        name: 'Desporto',
                        image: 'sports.jpg'
                    }
                ]
            }
        },
        resume: {
            left: {
                question: 'Tem um projeto importante relacionado à tradução de línguas que necessita de precisão e profissionalismo?',
                answer: 'A nossa equipa especializada em aprendizagem está pronta para oferecer serviços de alta qualidade, garantindo que as suas necessidades sejam atendidas com experiência e eficiência.'
            },
            right: {
                question: 'Porquê escolher os nossos especialistas em aprendizagem?',
                topics: [
                    'Especialização em Educação e Ensino',
                    'Qualidade Garantida',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        faq: [
            {
                question: 'O que é aprendizagem?',
                answer: 'A aprendizagem é o processo de adquirir conhecimento, habilidades e compreensão por meio da experiência, estudo e prática.'
            },
            {
                question: 'Qual é a importância da aprendizagem na educação?',
                answer: 'A aprendizagem é essencial para o desenvolvimento pessoal e profissional, capacitando os indivíduos a alcançar seus objetivos, resolver problemas, adaptar-se a mudanças e contribuir para a sociedade.'
            },
        ]
    },
    fitness: {
        name: 'Fitness',
        data: {
            banner: 'bannerSports.jpg',
            popular: {
                title: 'Áreas mais populares',
                elements: [ 
                    {
                        id: 'resistance',
                        name: 'Resistência'
                    },
                    {
                        id: 'nutrition',
                        name: 'Nutrição'
                    },
                    {
                        id: 'aerobic',
                        name: 'Aeróbica'
                    },
                ],
            },
            explore: {
                title: 'Explorar Traduções',
                elements: [
                    {
                        id: 'resistance',
                        name: 'Resistência',
                        image: 'resistance.jpg'
                    },
                    {
                        id: 'nutrition',
                        name: 'Nutrição',
                        image: 'nutrition.jpg'
                    },
                    {
                        id: 'aerobic',
                        name: 'Aeróbica',
                        image: 'aerobic.jpg'
                    },
                    {
                        id: 'yoga',
                        name: 'Yoga',
                        image: 'yoga.jpg'
                    },
                    {
                        id: 'stretching',
                        name: 'Alongamentos',
                        image: 'stretching.jpeg'
                    },
                    {
                        id: 'mental',
                        name: 'Saúde Mental',
                        image: 'mental.jpg'
                    },
                    {
                        id: 'bodybuilding',
                        name: 'Músculação',
                        image: 'bodybuilding.jpg'
                    },
                    {
                        id: 'functional',
                        name: 'Treino funcional',
                        image: 'functional.jpg'
                    }
                ]
            }
        },
        resume: {
            left: {
                question: 'Tem um projeto importante relacionado ao fitness que necessita de precisão e profissionalismo?',
                answer: 'A nossa equipa especializada em fitness está pronta para oferecer serviços de alta qualidade, garantindo que as suas necessidades sejam atendidas com experiência e eficiência.'
            },
            right: {
                question: 'Porquê escolher os nossos especialistas em fitness?',
                topics: [
                    'Especialização em Treino e Nutrição',
                    'Qualidade Garantida',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        faq: [
            {
                question: 'O que é fitness?',
                answer: 'Fitness é o estado de saúde e bem-estar físico e mental alcançado através de atividades físicas regulares, alimentação saudável e estilo de vida equilibrado.'
            },
            {
                question: 'Qual é a importância do fitness para a saúde?',
                answer: 'O fitness é fundamental para a saúde geral do corpo e da mente, ajudando a melhorar a força muscular, a resistência cardiovascular, a flexibilidade, a saúde mental e reduzindo o risco de doenças crônicas.'
            },
        ]
    },
    writing: {
        name: 'Escrita',
        data: {
            banner: 'bannerWritting.jpg',
            popular: {
                title: 'Áreas de Escrita populares',
                elements: [ 
                    {
                        id: 'creative',
                        name: 'Escrita Criativa'
                    },
                    {
                        id: 'composition',
                        name: 'Composição'
                    },
                    {
                        id: 'Professional',
                        name: 'Escrita Professional'
                    },
                ],
            },
            explore: {
                title: 'Explorar Traduções',
                elements: [
                    {
                        id: 'creative',
                        name: 'Escrita Criativa',
                        image: 'creative.jpg'
                    },
                    {
                        id: 'composition',
                        name: 'Composição',
                        image: 'composition.jpg'
                    },
                    {
                        id: 'professional',
                        name: 'Escrita Professional',
                        image: 'professional.jpg'
                    },
                    {
                        id: 'journalism',
                        name: 'Jornalismo',
                        image: 'journalism.png'
                    },
                    {
                        id: 'revision',
                        name: 'Revisão de texto',
                        image: 'revision.jpg'
                    },
                    {
                        id: 'scientific',
                        name: 'Escrita Científica',
                        image: 'scientific.jpg'
                    },
                    {
                        id: 'blog',
                        name: 'Blogging',
                        image: 'blog.jpeg'
                    },
                    {
                        id: 'dramaturgy',
                        name: 'Dramaturgia',
                        image: 'dramaturgy.jpg'
                    }
                ]
            }
        },
        resume: {
            left: {
                question: 'Tem um projeto importante relacionado à escrita que necessita de precisão e profissionalismo?',
                answer: 'A nossa equipa especializada em escrita está pronta para oferecer serviços de alta qualidade, garantindo que as suas necessidades sejam atendidas com experiência e eficiência.'
            },
            right: {
                question: 'Porquê escolher os nossos especialistas em escrita?',
                topics: [
                    'Especialização em Escrita Criativa e Profissional',
                    'Qualidade Garantida',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        faq: [
            {
                question: 'O que é escrita?',
                answer: 'A escrita é o processo de expressar ideias, pensamentos e informações por meio de palavras escritas, com o objetivo de comunicar, informar ou entreter.'
            },
            {
                question: 'Qual é a importância da escrita na comunicação?',
                answer: 'A escrita desempenha um papel crucial na comunicação, permitindo a transmissão de informações de forma clara, precisa e duradoura, e facilitando a troca de ideias e conhecimentos entre pessoas e culturas.'
            },
        ]
    },
}

export function getProducts() { // Função para obter os produtos
    return data
}

export function getProduct(id) { // Função para obter um produto pelo :id
    return data[id]
}





// #### Não utilizados ####

export function getGeneralProductsData() { // Função para obter os produtos de forma geral
    let res = {}
    for (let product of products) {
        if (!data[product]) continue;
        res[product] = {
            name: data[product]?.name,
            icon: data[product]?.icon
        }
    }
    return res
}