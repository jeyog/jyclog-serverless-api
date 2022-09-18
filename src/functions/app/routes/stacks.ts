import { Request, Response, Router } from 'express'
import { authGithub } from '../middlewares/authGIthub'
import { deleteByIdAndGithubId, findAllByGithubId, save } from '../models/stacks'
import { Stack } from '../types/stack'

const adminGithubId = parseInt(process.env.ADMIN_GITHUB_ID)

const router = Router()

router.get('/', async (_, res: Response) => {
    const stacks = findAllByGithubId(adminGithubId)
    res.send(stacks)
})

router.post('/', authGithub, async (req: Request, res: Response) => {
    let stack: Stack = {...req.body,
        githubId: req.githubUser.id
    }
    stack = await save(stack)
    res.send(stack)
})

router.put('/', authGithub, async (req: Request, res: Response) => {
    let stack: Stack = {...req.body,
        githubId: req.githubUser.id
    }
    stack = await save(stack)
    res.send(stack)
})

router.delete('/:id', authGithub, async (req: Request, res: Response) => {
    await deleteByIdAndGithubId(Number(req.params.id), req.githubUser.id)
    res.send()
})