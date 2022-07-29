import { NextFunction, Request, Response } from "express";
import axios from 'axios'

const authGithub = async (req: Request, res: Response, next: NextFunction) => {
  const headers = req.apiGateway.event.headers
  const bearerToken = headers['Authorization']
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: bearerToken
      }
    })
    const githubUser: GithubUser = response.data
    req.githubUser = githubUser
    next()
  } catch (err) {
    res.status(401).send('unauthorized')
  }
}

export { authGithub }