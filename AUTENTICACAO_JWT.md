# Configuração JWT para Vue.js

## 📋 O que foi configurado

A autenticação JWT foi adaptada de React para Vue.js usando:
- **Pinia** como state management (substitui Context API do React)
- **Composables** para hooks reutilizáveis
- **Interceptadores Axios** para adicionar token automaticamente

---

## 🔧 Arquivos criados/atualizados

### 1. **`src/stores/authStore.js`** (NOVO)
Store Pinia que gerencia:
- `token` - Token JWT armazenado
- `user` - Dados do usuário decodificados
- `loading` - Estado de carregamento
- `isAuthenticated` - Se o usuário está autenticado
- `isTokenExpired` - Se o token expirou

**Actions disponíveis:**
- `initializeAuth()` - Inicializa a autenticação ao carregar a app
- `login(email, senha)` - Faz login e salva o token
- `logout()` - Faz logout e limpa dados
- `refreshToken()` - Renova o token (implementar conforme seu backend)

### 2. **`src/hooks/useAuth.js`** (ATUALIZADO)
Composable Vue que fornece acesso ao store de autenticação.

**Uso:**
```javascript
const { login, logout, isAuthenticated, user } = useAuth()
```

### 3. **`src/services/api.js`** (ATUALIZADO)
- ✅ Corrigida a URL base do Axios
- ✅ Adiciona token automaticamente a todas as requisições
- ✅ Redireciona para login em caso de erro 401

### 4. **`src/router/index.js`** (ATUALIZADO)
- ✅ Guard global de autenticação
- ✅ Meta `requiresAuth` nas rotas protegidas

**Rotas protegidas:**
- `/tela-mesa`
- `/cadastro-produtos`

### 5. **`src/router/PrivateRoute.js`** (ATUALIZADO)
Agora é apenas um utilitário simples se precisar usar manualmente.

### 6. **`src/views/login.vue`** (ATUALIZADO)
- ✅ Integrado com `useAuth()`
- ✅ Tratamento de erros
- ✅ Loading state
- ✅ Redireciona para `/tela-mesa` após login bem-sucedido

### 7. **`src/main.js`** (ATUALIZADO)
- ✅ Inicializa Pinia
- ✅ Inicializa autenticação na carga da app

---

## 🚀 Como usar

### No seu componente Vue:
```vue
<script setup>
import { useAuth } from '@/hooks/useAuth'

const { login, logout, isAuthenticated, user } = useAuth()

const fazerLogin = async () => {
  try {
    await login('email@exemplo.com', 'senha')
    // Redirecionamento é feito automaticamente
  } catch (error) {
    console.error('Erro no login:', error)
  }
}

const fazerLogout = () => {
  logout()
}
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Bem-vindo, {{ user?.email }}</p>
    <button @click="fazerLogout">Logout</button>
  </div>
  <div v-else>
    <p>Não autenticado</p>
  </div>
</template>
```

---

## 🔐 Fluxo de autenticação

1. **Carregamento**: `main.js` chama `authStore.initializeAuth()`
2. **Verificação**: Valida token existente em `localStorage`
3. **Login**: Usuário envia credenciais → Backend retorna JWT
4. **Armazenamento**: Token salvo em `localStorage` e Pinia
5. **Requisições**: Axios adiciona `Authorization: Bearer {token}` automaticamente
6. **Erro 401**: Limpa dados e redireciona para `/login`

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:8080
```

Para desenvolvimento local, o padrão é `http://localhost:8080`.

---

## 🛠️ Implementação customizada (Backend específico)

### Se seu token tem campos adicionais:

Edite `src/stores/authStore.js` na função `initializeAuth()`:

```javascript
const decoded = jwtDecode(token.value)
user.value = {
  email: decoded.sub,
  id: decoded.id,           // ← Adicione campos
  nome: decoded.nome,       // ← que seu backend
  role: decoded.role        // ← retorna no token
}
```

### Para implementar Refresh Token:

Se seu backend suporta refresh token, modifique `src/stores/authStore.js`:

```javascript
const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh', { 
      token: token.value 
    })
    const { token: newToken } = response.data
    token.value = newToken
    localStorage.setItem('token', newToken)
    return newToken
  } catch (error) {
    logout()
    throw error
  }
}
```

---

## 🧪 Testes

Para testar o login localmente, certifique-se que:
1. Backend está rodando em `http://localhost:8080`
2. Endpoint `/auth/login` retorna resposta com `{ token: "seu_jwt_token" }`
3. O token JWT é válido e contém field `sub` com o email

---

## 📚 Referências

- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue 3 Composables](https://vuejs.org/guide/extras/composition-api-faq.html)
- [JWT.io](https://jwt.io/)
- [Axios Interceptors](https://axios-http.com/ptbr/docs/interceptors)

