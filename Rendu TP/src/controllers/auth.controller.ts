import * as authService from '../services/auth.service';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    try {
        const data = await authService.register(req.body as any);
        if(data instanceof Error){
            return res.status(400).json({error: data.message});
        }
        return res.status(201).json({data});
    }catch(e){
        return res.status(400).json({error: e})
    }
}

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    const data: any = await authService.login(email, password)
    if(data instanceof Error){
        return res.status(400).json({error: data.message})
    }
    const token = authService.createToken(data._id)
    if(token){
        res.cookie('jwt', token, { httpOnly: true, maxAge });
    }
    return res.status(200).json({user: data, token: token})
}

export const logout = async(req: Request, res: Response) => {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).json({message: "Your are now logged out"})
}

export const whoami = async(req: Request, res: Response) => {
    const user = res.locals.user
    user.password = undefined
    if(!user){
        return res.status(403).json({error: "No user found"})
    }
    return res.status(200).json({user})
}