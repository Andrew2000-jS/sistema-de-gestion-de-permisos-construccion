import { Container } from 'inversify'
import { MySQLAuthRepository } from '../../context/infrastructure/persistence'
import { AuthController } from '../controllers'
import { AuthRegister, AuthLogin } from '../../context/application'
import { type AuthRepository } from '@src/auth/context/domain'
import { TYPES } from '@src/auth/context/utils/constants'

const container = new Container()

container.bind<AuthRepository>(TYPES.AuthRepository).to(MySQLAuthRepository)
container.bind<AuthRegister>(AuthRegister).toSelf()
container.bind<AuthLogin>(AuthLogin).toSelf()
container.bind<AuthController>(AuthController).toSelf()

export default container
