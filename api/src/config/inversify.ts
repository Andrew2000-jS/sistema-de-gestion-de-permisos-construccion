import { Container } from 'inversify'
import { type AuthRepository } from '@src/auth/context/domain'
import { MySQLAuthRepository } from '@src/auth/context/infrastructure/persistence'
import { AuthLogin, AuthRegister, RecoverPassword, SearchUser, SendEmailToRecoverPwd } from '@src/auth/context/application'
import { AuthController } from '@src/auth/app/controllers'
import { MySQLPermissionRepository } from '@src/permission/context/infrastructure/persistence'
import { PermissionCreator } from '@src/permission/context/application'
import { type PermissionRepository } from '@src/permission/context/domain'
import { TYPES as AuthTypes } from '@src/auth/context/utils'
import { TYPES as PermissionTypes } from '@src/permission/context/utils'
import { PermissionController } from '@src/permission/apps/controllers'

const container = new Container()

container.bind<AuthRepository>(AuthTypes.AuthRepository).to(MySQLAuthRepository)
container.bind<AuthRegister>(AuthRegister).toSelf()
container.bind<AuthLogin>(AuthLogin).toSelf()
container.bind<RecoverPassword>(RecoverPassword).toSelf()
container.bind<SearchUser>(SearchUser).toSelf()
container.bind<SendEmailToRecoverPwd>(SendEmailToRecoverPwd).toSelf()
container.bind<AuthController>(AuthController).toSelf()

container.bind<PermissionRepository>(PermissionTypes.PermissionRepository).to(MySQLPermissionRepository)
container.bind<PermissionCreator>(PermissionCreator).toSelf()
container.bind<PermissionController>(PermissionController).toSelf()

export default container
