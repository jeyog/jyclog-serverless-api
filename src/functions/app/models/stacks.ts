import { connection } from '../config/databaseConfig'
import { Stack } from '../types/stack'

const findAllByGithubId = async (githubId: number) => {
    await connection.connect()
    const rows = await connection.query('SELECT * FROM stacks where github_id = ?', githubId)
    await connection.end()
    return rows[0]
}

const save = async (stack: Stack) => {
    await connection.connect()
    let result
    if (!stack.id) {
        result = await connection.query('INSERT INTO stacks (name, utilization) VALUES (?, ?)', [stack.name, stack.utilization])
    } else {
        result = await connection.query('UPDATE stacks SET name = ?, utilization = ? where id = ?', [stack.name, stack.utilization, stack.id])
    }
    await connection.end()
    const newStack: Stack = {
        id: result.insertId,
        ...stack
    }
    return newStack
}

const deleteByIdAndGithubId = async (id: number, githubId: number) => {
    await connection.connect()
    await connection.query('DELETE FROM stacks WHERE id = ? and github_id = ?', [id, githubId])
    await connection.end()
}

export { findAllByGithubId, save, deleteByIdAndGithubId }