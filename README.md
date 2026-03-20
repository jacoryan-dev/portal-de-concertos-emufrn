# Portal de Concertos EMUFRN

Plataforma institucional de reserva de ingressos gratuitos para concertos da Escola de Música da Universidade Federal do Rio Grande do Norte (EMUFRN). O sistema permite que alunos, servidores e comunidade externa retirem ingressos de forma rápida e segura, apoiando a difusão cultural e a valorização da música clássica.

## 🚀 Funcionalidades Principais

- **Catálogo de Concertos**: Navegação por eventos com informações detalhadas (data, hora, local, programa, corpo docente).
- **Reserva de Ingressos**: Sistema de retirada de ingressos com controle de lotação e validade.
- **Autenticação Institucional**: Login seguro via sistema unificado de identificação da UFRN (SIAPE/Matrícula).
- **Painel Administrativo**: Gestão completa de concertos, ingressos, usuários e estatísticas de ocupação.
- **Design Responsivo**: Interface moderna e acessível, otimizada para desktop e dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Testing**: Vitest, Playwright

## 📋 Pré-requisitos

- Node.js >= 20.19.0
- npm >= 10.0.0

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd portal-de-concertos-emufrn
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
VITE_API_URL=https://api.exemplo.com
```

## 🏃 Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O portal estará acessível em `https://portal-de-concertos-emufrn.vercel.app/`.

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

Execute os testes de integração (Playwright):

```bash
npm run test:e2e
```

## 📦 Build

Para gerar a versão de produção:

```bash
npm run build
```

## 📄 Licença

Este projeto é de uso exclusivo da Escola de Música da UFRN.
