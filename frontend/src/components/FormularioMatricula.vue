<template>
  <div class="form-container">
    
    
    <h1>Matrícula em Cursos On-line</h1>

    <form @submit.prevent="realizarMatricula">
      <div class="form-group">
        <label for="nome">Nome Completo</label>
        <input type="text" id="nome" v-model="aluno.nomeCompleto" placeholder="Digite seu nome completo"/>
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="aluno.email" placeholder="seu.email@exemplo.com"/>
      </div>
      <div class="form-group">
        <label for="curso">Selecione o Curso</label>
        <select id="curso" v-model="aluno.cursoId">
          <option disabled value="">Escolha uma opção</option>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.nome }}
          </option>
        </select>
      </div>
      <button type="submit">Realizar Matrícula</button>
    </form>
    <div v-if="mensagem" class="feedback" :class="temErro ? 'error' : 'success'">
      {{ mensagem }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variáveis reativas para guardar os dados
const cursos = ref([]); // A lista de cursos que virá da API
const aluno = ref({
  nomeCompleto: '',
  email: '',
  cursoId: '' // Começa vazio
});
const mensagem = ref(''); // Mensagem para o usuário (sucesso/erro)
const temErro = ref(false); // Para mudar a cor da mensagem

// Função que será executada assim que o componente for criado
onMounted(() => {
  // Pedir a lista de cursos para o nosso backend
  axios.get('http://localhost:3000/cursos')
    .then(response => {
      cursos.value = response.data; // Guarda a lista de cursos recebida
    })
    .catch(error => {
      console.error('Erro ao buscar cursos!', error);
      mensagem.value = 'Falha ao carregar cursos. O servidor backend está rodando?';
      temErro.value = true;
    });
});

// Função que é chamada quando o formulário é enviado
const realizarMatricula = () => {
  // Limpa mensagens anteriores
  mensagem.value = '';
  temErro.value = false;

  // Verifica se o usuário preencheu tudo
  if (!aluno.value.nomeCompleto || !aluno.value.email || !aluno.value.cursoId) {
    mensagem.value = 'Por favor, preencha todos os campos.';
    temErro.value = true;
    return; // Para a execução aqui
  }

  // Se estiver tudo preenchido, envia os dados para o backend
  axios.post('http://localhost:3000/matricula', aluno.value)
    .then(response => {
      // Se o backend respondeu com sucesso
      mensagem.value = response.data.message;
      temErro.value = false;
      // Limpa o formulário
      aluno.value = { nomeCompleto: '', email: '', cursoId: '' };
    })
    .catch(error => {
      // Se o backend respondeu com erro
      mensagem.value = error.response.data.message || 'Ocorreu um erro inesperado.';
      temErro.value = true;
    });
};
</script>

<style scoped>
/* Estilos Gerais do Contêiner */
.form-container {
  max-width: 500px; /* Largura máxima do formulário */
  width: 100%; /* Garante que ele ocupe toda a largura disponível até o max-width */
  margin: 20px; /* Margem em telas muito pequenas para não grudar */
  padding: 40px; /* Espaçamento interno generoso */
  background-color: #ffffff; /* Fundo branco limpo */
  border-radius: 8px; /* Cantos levemente arredondados */
  border: 1px solid #e2e8f0; /* Borda sutil */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); /* Sombra suave */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Estilos do Cabeçalho com Ícone e Título Principal da Aplicação */
.form-header {
  display: flex; /* Usa flexbox para alinhar ícone e título */
  align-items: center; /* Alinha verticalmente no centro */
  justify-content: center; /* Centraliza horizontalmente */
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0; /* Linha divisória sutil */
}

.header-icon {
  width: 32px;
  height: 32px;
  color: #4a90e2; /* Cor azul profissional para o ícone */
  margin-right: 12px; /* Espaço entre o ícone e o título */
}

.header-title {
  font-size: 1.25em; /* Tamanho do título do cabeçalho */
  font-weight: 600;
  color: #2d3748; /* Cor de texto padrão */
}

/* Estilos do Título do Formulário (Matrícula em Cursos On-line) */
h1 {
  text-align: center;
  color: #2d3748;
  font-size: 1.75em;
  font-weight: 700;
  margin-bottom: 30px;
}

/* Estilos dos Labels dos Campos */
label {
  display: block;
  margin-bottom: 8px;
  color: #718096; /* Cinza médio para labels */
  font-weight: 600;
  font-size: 0.875em;
  text-transform: uppercase; /* Labels em maiúsculas */
  letter-spacing: 0.5px; /* Espaçamento entre letras para labels */
}

/* Estilos dos Grupos de Campos */
.form-group {
  margin-bottom: 20px; /* Espaço entre os grupos de campos */
}

/* Estilos dos Campos de Input e Select */
input, select {
  width: 100%;
  padding: 12px 16px;
  background-color: #f7f8fa; /* Fundo do campo sutilmente diferente */
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-sizing: border-box;
  color: #2d3748;
  font-size: 1em;
  transition: border-color 0.2s ease, box-shadow 0.2s ease; /* Transição suave ao focar */
}

input:focus, select:focus {
  border-color: #4a90e2; /* Borda azul ao focar */
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2); /* Sombra suave ao focar */
  outline: none; /* Remove o contorno padrão do navegador */
  background-color: #ffffff; /* Fundo branco ao focar */
}

/* Estilos do Botão Principal */
button {
  width: 100%;
  padding: 14px 20px;
  background-color: #4a90e2; /* Azul profissional */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;
  transition: background-color 0.2s ease, transform 0.2s ease; /* Transição suave */
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(74, 144, 226, 0.1); /* Sombra para o botão */
}

button:hover {
  background-color: #357abd; /* Tom de azul mais escuro no hover */
  transform: translateY(-2px); /* Efeito de elevação sutil */
}

button:disabled {
  background-color: #cccccc; /* Cinza para botão desabilitado */
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

/* Estilos das Mensagens de Feedback (Sucesso/Erro) */
.feedback {
  margin-top: 20px;
  padding: 14px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  font-size: 0.95em;
}
.success { background-color: #e6fffa; color: #047481; border: 1px solid #b2f5ea; }
.error { background-color: #fff5f5; color: #c53030; border: 1px solid #fed7d7; }
</style>