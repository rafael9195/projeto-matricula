// backend/src/index.ts

import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

// Inicializa o Express, que é o nosso servidor
const app = express();
const port = 3000; // O "endereço" da nossa API será http://localhost:3000

// Permite que o servidor entenda JSON e que nosso frontend possa acessá-lo
app.use(cors());
app.use(express.json());

// --- Nosso "Banco de Dados" Falso ---
// Uma lista de cursos guardada na memória do servidor
const cursos = [
  { id: 1, nome: 'Desenvolvimento Web com Vue.js' },
  { id: 2, nome: 'Backend com Node.js e TypeScript' },
  { id: 3, nome: 'Design de UI/UX para Aplicações Modernas' },
  { id: 4, nome: 'Metodologias Ágeis para Projetos de Software' },
];

// --- As "Rotas" da nossa API (os caminhos que o frontend pode chamar) ---

// Rota para buscar a lista de cursos
app.get('/cursos', (req: Request, res: Response) => {
  console.log('Recebi um pedido para a lista de cursos!');
  return res.status(200).json(cursos);
});

// Rota para receber uma nova matrícula
app.post('/matricula', (req: Request, res: Response) => {
  const { nomeCompleto, email, cursoId } = req.body;
  console.log('Recebi uma nova matrícula:', req.body);

  // Validação básica para ver se todos os dados vieram
  if (!nomeCompleto || !email || !cursoId) {
    return res.status(400).json({ message: 'Dados incompletos. Todos os campos são obrigatórios.' });
  }

  // Se deu tudo certo, enviamos uma resposta de sucesso
  return res.status(201).json({ message: `Matrícula de ${nomeCompleto} realizada com sucesso!` });
});

// Coloca o servidor para "ouvir" os pedidos na porta 3000
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});