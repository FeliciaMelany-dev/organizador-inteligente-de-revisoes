# 📘 PRD — Organizador de Estudos

## 📌 Visão Geral

O **Organizador de Estudos** é uma aplicação web desenvolvida com React e TypeScript que permite ao usuário gerenciar seus estudos de forma simples, visual e eficiente.

O sistema possibilita:

* Criar, editar e deletar estudos
* Visualizar usuários cadastrados
* Gerenciar termos de aprendizado com status (aprendido / não aprendido)

---

## 🎯 Objetivo

Facilitar a organização dos estudos do usuário, permitindo controle sobre conteúdos estudados e progresso de aprendizado, com uma interface moderna e intuitiva.

---

## 👤 Público-Alvo

* Estudantes de tecnologia
* Pessoas aprendendo novos conteúdos
* Desenvolvedores iniciantes organizando seus estudos

---

## ⚙️ Funcionalidades

### 📚 Estudos (CRUD)

* Criar novo estudo com título e assunto
* Editar estudos existentes
* Deletar estudos
* Visualizar lista de estudos

---

### 👤 Usuários

* Listar usuários vindos da API
* Exibir nome e email
* Deletar usuário

---

### 🧠 Termos de Estudo

* Listar termos
* Marcar como aprendido / não aprendido
* Filtrar termos:

  * Todos
  * Aprendidos
  * Não aprendidos
* Deletar termos

---

## 🔍 Regras de Negócio

* Um estudo deve possuir:

  * Título obrigatório
  * Assunto obrigatório
* O status de aprendizado dos termos pode ser alternado
* Dados são persistidos via API
* Interface deve fornecer feedback de erro e carregamento

---

## 🧩 Requisitos Técnicos

* React com TypeScript
* Uso de Hooks:

  * useState
  * useEffect
  * useMemo
* Consumo de API REST
* Componentização da interface
* CSS Modules para estilização
* Separação de responsabilidades (services, types, components)

---

## 🎨 Requisitos de UI/UX

* Interface responsiva
* Inputs com labels (acessibilidade)
* Feedback visual:

  * Loading
  * Erros
* Botões desabilitados quando necessário
* Filtros interativos

---

## 🚫 Fora do Escopo

* Autenticação de usuários
* Banco de dados próprio
* Deploy em produção
* Upload de arquivos

---

## 📈 Critérios de Sucesso

* Usuário consegue:

  * Criar estudos sem erro
  * Visualizar dados corretamente
  * Alternar status de termos
* Interface clara e intuitiva
* Código organizado e legível

---

## 🚀 Possíveis Melhorias Futuras

* Sistema de login
* Dashboard com estatísticas
* Dark/Light mode
* Persistência local (LocalStorage)
* Testes automatizados

---

## 🏁 Conclusão

O projeto entrega uma solução funcional e organizada para gerenciamento de estudos, aplicando boas práticas de desenvolvimento front-end com foco em experiência do usuário e organização de código.
