const API = 'http://localhost:3000'

interface Task {
    title: string;
    description?: string;
    done?: boolean
}

export const createTaskRequest = (task: Task) =>
    fetch(`${API}/Tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type':'application/json'
        }
    })