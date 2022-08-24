import { Request, Response, Router } from 'express'
import { authGithub } from '../middlewares/authGIthub'
import { findByGithubId, deleteByGithubId, save } from '../models/abouts'
import { About } from '../types/about'

const adminGithubId = parseInt(process.env.ADMIN_GITHUB_ID)

const router = Router()

router.get('/', async (_, res: Response) => {
    const about = await findByGithubId(adminGithubId)
    res.send(about)
})

router.post('/', authGithub, async (req: Request, res: Response) => {
    let about: About = {...req.body,
        githubId: req.githubUser.id
    }
    about = await save(about)
    res.send(about)
})

router.put('/', authGithub, async (req: Request, res: Response) => {
    let about: About = {...req.body,
        githubId: req.githubUser.id
    }
    about = await save(about)
    res.send(about)
})

router.delete('/', authGithub, async (req: Request, res: Response) => {
    await deleteByGithubId(req.githubUser.id)
    res.send()
})

router.delete('/:id', authGithub, async (req: Request, res: Response) => {
    res.send(req.params.id)
})

export default router