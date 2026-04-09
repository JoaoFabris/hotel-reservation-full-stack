# 🌍 Travel Reservation

Plataforma full stack de reservas de viagens e hospedagens com autenticação social, pagamentos integrados via Stripe e gerenciamento completo de reservas por usuário.

---

## ✨ Funcionalidades

- Listagem e busca de destinos e hospedagens disponíveis
- Filtro por tipo de acomodação (hotel, pousada, chalé, fazenda, etc.)
- Seleção de datas com validação de disponibilidade em tempo real
- Autenticação com Google via NextAuth.js
- Checkout seguro integrado com Stripe
- Histórico e cancelamento de reservas por usuário
- Interface responsiva para mobile e desktop

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 13 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Banco de dados | PostgreSQL (Supabase) |
| ORM | Prisma |
| Autenticação | NextAuth.js (Google Provider) |
| Pagamentos | Stripe |
| Formulários | React Hook Form |
| Datas | date-fns + react-datepicker |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Conta no [Stripe](https://stripe.com) com a [CLI](https://stripe.com/docs/stripe-cli) instalada
- Credenciais OAuth do Google (via [Google Cloud Console](https://console.cloud.google.com))

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/hotel-reservation.git
cd hotel-reservation
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# NextAuth
NEXTAUTH_SECRET=sua-chave-secreta
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-client-secret

# Banco de dados (Supabase)
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
HOST_URL=http://localhost:3000
```

### 4. Configure o banco de dados

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 💳 Configurando Webhooks do Stripe (local)

Em um terminal separado, rode:

```bash
npm run stripe:listen
```

Isso encaminha os eventos do Stripe para `localhost:3000/api/payment/success` e permite testar o fluxo de pagamento localmente.

---

## 🗂️ Estrutura do projeto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/                  # Rotas NextAuth
│   │   ├── payment/               # Criação de sessão Stripe + webhook
│   │   └── trips/
│   │       ├── check/             # Verificação de disponibilidade
│   │       ├── reservation/       # CRUD de reservas
│   │       └── search/            # Busca de destinos
│   ├── about/                     # Página "Sobre" com histórico de viagens
│   ├── my-trips/                  # Reservas do usuário logado
│   └── trips/
│       └── [tripId]/
│           ├── confirmation/      # Página de confirmação pós-pagamento
│           └── components/        # Header, descrição, destaques, reserva
├── components/                    # Componentes reutilizáveis (Button, Input, DatePicker…)
├── lib/
│   ├── prisma.ts                  # Instância do cliente Prisma
│   └── seed.ts                    # Script de seed do banco
└── providers/
    ├── auth.tsx                   # Provider do NextAuth
    └── toast.tsx                  # Provider do react-toastify
```

---

## 🌐 Deploy

Configure as variáveis de ambiente na sua plataforma (Vercel, Railway, etc.) substituindo os valores de desenvolvimento pelos de produção:

```env
HOST_URL=https://seu-dominio.com
NEXTAUTH_URL=https://seu-dominio.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Lembre-se também de cadastrar o webhook de produção no painel do Stripe apontando para `https://seu-dominio.com/api/payment/success`.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.