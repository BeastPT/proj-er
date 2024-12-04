
// req.username - {UUID}
// req.user - {User}
import * as Chat from '../models/chat.js'
import { openai } from '../index.js'
import { incrementPrice } from '../models/service.js'

// Carrega as mensagens de um chat recebendo o id do chat pelo :id do URL GET
export async function getMessages(req, res) {
    const chat = await Chat.getChatById(req.params.id)
    if (!chat) {
        return res.status(404).json({message: 'Chat not found'}) // Se o chat não existir, retorna 404
    }
    const msgs = chat.messages.map(message => { // Retorna apenas o texto da mensagem e se é do utilizador ou do sistema
        return {
            isUser: !message.isSystem,
            text: message.message,
        }
    })
    res.status(200).json({message: msgs, subject: chat.subject}) // Retorna as mensagens e o assunto do chat
}

// Lista todos os chats do utilizador autenticado
export async function listChats(req, res) {
    const chats = await Chat.getChatsByUserId(req.user.id)
    if (!chats) {
        return res.status(404).json({message: 'Chats not found'}) // Se o utilizador não tiver chats, retorna 404
    }

    res.status(200).json({message: chats}) // Retorna os chats do utilizador
}

// Adiciona uma mensagem ao chat recebendo o id do chat pelo :id do URL POST
export async function addMessage(req, res) {
    if (!req.body.message) {
        return res.status(400).json({message: 'Message is required'}) // Se a mensagem não for enviada, retorna 400
    }
    const chat = await Chat.addMessage(req.params.id, {
        isSystem: false,
        message: req.body.message,
        timestamp: new Date()
    }) // Adiciona a mensagem a base de dados
    
    if (!chat) {    
        return res.status(404).json({message: 'Chat not found'}) // Se o chat não existir, retorna 404
    }

    const messages = chat.messages.map(message => { // Cria um array de mensagens para enviar ao OpenAI
        return {
            role: message.isSystem ? 'assistant' : 'user',
            content: message.message
        }
    })
    try {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });
        const message = completion.choices[0].message.content // Recebe a resposta do OpenAI
        chat.messages.push({ // Adiciona a resposta do OpenAI ao modelo do chat
            isSystem: true,
            message: message,
            timestamp: new Date()
        })

        if (chat.service) { // Se o chat tiver um serviço associado, incrementa o preço do serviço 
            incrementPrice(chat.service, completion.usage.total_tokens)
        }
        await chat.save()
        res.status(200).json({message: chat, answer: message}) // Retorna o chat e a resposta do OpenAI
    } catch (err) {
        res.status(500).json({message: 'Aconteceu algum erro!'}) // Se acontecer algum erro, retorna 500
    }
}

// Cria um chat de suporte para o utilizador autenticado
export async function createSupport(req, res) {
    const chat = await Chat.createChat({
        userId: req.user.id,
        type: 'support',
        subject: 'Support',
        messages: []
    })
    res.status(200).json({message: chat})
}