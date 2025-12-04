async function carregarTarefas() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('tarefas-container');
    
    loading.classList.add('active');
    container.innerHTML = '';
    
    try {
        const response = await fetch('http://159.65.228.63/tarefas');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        
        const tarefas = await response.json();
        
        if (tarefas.length === 0) {
            container.innerHTML = `
                <div class="no-tasks">
                    <h2>📭 Nenhuma tarefa encontrada</h2>
                    <p>Crie sua primeira tarefa na página inicial!</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <table class="tabela-tarefas">
                    <thead>
                        <tr>
                            <th>Prioridade</th>
                            <th>Descrição</th>
                            <th>Recursos</th>
                            <th>Data Limite</th>
                            <th>Matrícula</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tarefas.map((tarefa, index) => {
                            const ehUrgente = (tarefa.prioridade || '').toLowerCase() === 'urgente';
                            
                            const estiloPrioridade = ehUrgente ? 'color: #ff0000; font-weight: bold;' : '';

                            return `
                            <tr class="${index % 2 === 0 ? 'par' : 'impar'}">
                                <td class="prioridade" style="${estiloPrioridade}">
                                    ${tarefa.prioridade}
                                </td>
                                <td class="descricao">${tarefa.descricao}</td>
                                <td class="recursos">
                                    ${Array.isArray(tarefa.recursosNecessarios) || Array.isArray(tarefa.recursos) 
                                        ? (tarefa.recursosNecessarios || tarefa.recursos || []).join(', ')
                                        : tarefa.recursosNecessarios || tarefa.recursos || 'Nenhum'}
                                </td>
                                <td class="data">${tarefa.dataLimite || tarefa.data}</td>
                                <td class="matricula">${tarefa.matricula}</td>
                            </tr>
                        `}).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="error-message">
                <h2>❌ Erro ao carregar tarefas</h2>
                <p>Verifique sua conexão ou tente novamente.</p>
            </div>
        `;
    } finally {
        loading.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', carregarTarefas);

