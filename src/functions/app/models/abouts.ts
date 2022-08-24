import { connection } from '../config/databaseConfig'
import { About } from '../types/about'

const findAll = async () => {
    await connection.connect()
    const result = await connection.query('SELECT * FROM abouts')
    await connection.end()
    return result
}

const findByGithubId = async (githubId: number) => {
    await connection.connect()
    const rows = await connection.query('SELECT * FROM abouts where github_id = ?', githubId)
    await connection.end()
    return rows[0]
}

const save = async (about: About) => {
    await connection.connect()
    let result
    if (!about.id) {
        result = await connection.query('INSERT INTO abouts (github_id, name, profile_url, job, introduction, instagram_url) VALUES (?, ?, ?, ?, ?, ?)', [about.githubId, about.name, about.profileUrl, about.job, about.introduction, about.instagramUrl])
    } else {
        result = await connection.query('UPDATE abouts SET github_id = ?, name = ?, profile_url = ?, job = ?, introduction = ?, instagram_url = ? where id = ?', [about.githubId, about.name, about.profileUrl, about.job, about.introduction, about.instagramUrl, about.id])
    }
    await connection.end()
    const newAbout: About = {
        id: result.insertId,
        ...about
    }
    return newAbout
}

const deleteByGithubId = async (githubId: number) => {
    await connection.connect()
    await connection.query('DELETE FROM abouts WHERE github_id = ?', githubId)
    await connection.end()
}

const deleteById = async (id: number) => {
    await connection.connect()
    await connection.query('DELETE FROM abouts WHERE id = ?', id)
    await connection.end()
}

export { findAll, findByGithubId, save, deleteByGithubId, deleteById }