import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {compare} from "bcryptjs"
import {sign} from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories)

    // VERIFY EMAIL
    const user = await userRepositories.findOne({
      email
    })

    if(!user) {
      throw new Error("Email/Password incorrect")
    }

    //VERIFY PASSWORD

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    //GENERATE TOEKN
    const token = sign({
      email: user.email
    }, 
    "1976e579ea69e849cdf0cfca633cca9a", 
    {
      subject: user.id,
      expiresIn: "1d"
      
    })
    
    return token

  }

}

export {AuthenticateUserService}