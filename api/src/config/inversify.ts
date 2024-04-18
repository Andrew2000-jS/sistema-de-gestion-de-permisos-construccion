import { AuthController } from '@src/auth/app/controllers'
import { AuthLogin, AuthRegister, RecoverPassword, SearchUser, SendEmailToRecoverPwd } from '@src/auth/context/application'
import { type AuthRepository } from '@src/auth/context/domain'
import { MySQLAuthRepository } from '@src/auth/context/infrastructure/persistence'
import { TYPES as AuthTypes } from '@src/auth/context/utils'
import { ConstructionController } from '@src/construction/app'
import { ConstructionCreator, ConstructionDeleter, ConstructionUpdater } from '@src/construction/context/application'
import { type ConstructioRepository } from '@src/construction/context/domain'
import { MySQLConstructionRepository } from '@src/construction/context/infrastructure/persistence'
import { TYPES as ConstructionTypes } from '@src/construction/utils'
import { PermissionController } from '@src/permission/apps/controllers'
import { PermissionCreator, PermissionDeleter, PermissionUpdater } from '@src/permission/context/application'
import { type PermissionRepository } from '@src/permission/context/domain'
import { MySQLPermissionRepository } from '@src/permission/context/infrastructure/persistence'
import { TYPES as PermissionTypes } from '@src/permission/context/utils'
import { Matcher, type SharedRepository } from '@src/shared/modules'
import { MySQLSharedRepository } from '@src/shared/modules/context/infrastructure/persistence'
import { TYPES as SharedTypes } from '@src/shared/modules/context/utils'
import { Container } from 'inversify'

const container = new Container()

// Auth dependency injection
container.bind<AuthRepository>(AuthTypes.AuthRepository).to(MySQLAuthRepository)
container.bind<AuthRegister>(AuthRegister).toSelf()
container.bind<AuthLogin>(AuthLogin).toSelf()
container.bind<RecoverPassword>(RecoverPassword).toSelf()
container.bind<SearchUser>(SearchUser).toSelf()
container.bind<SendEmailToRecoverPwd>(SendEmailToRecoverPwd).toSelf()
container.bind<AuthController>(AuthController).toSelf()

// Permission dependency injection
container.bind<PermissionRepository>(PermissionTypes.PermissionRepository).to(MySQLPermissionRepository)
container.bind<PermissionCreator>(PermissionCreator).toSelf()
container.bind<PermissionDeleter>(PermissionDeleter).toSelf()
container.bind<PermissionUpdater>(PermissionUpdater).toSelf()
container.bind<PermissionController>(PermissionController).toSelf()

// Construction dependency injection
container.bind<ConstructioRepository>(ConstructionTypes.ConstructioRepository).to(MySQLConstructionRepository)
container.bind<ConstructionCreator>(ConstructionCreator).toSelf()
container.bind<ConstructionDeleter>(ConstructionDeleter).toSelf()
container.bind<ConstructionUpdater>(ConstructionUpdater).toSelf()
container.bind<ConstructionController>(ConstructionController).toSelf()

// Shared dependency injection
container.bind<SharedRepository>(SharedTypes.SharedRepository).to(MySQLSharedRepository)
container.bind<Matcher>(Matcher).toSelf()

export default container
