import { AuthController } from '@src/auth/app/controllers'
import { AuthLogin, AuthRegister, RecoverPassword, SearchUser } from '@src/auth/context/application'
import { type AuthRepository } from '@src/auth/context/domain'
import { MySQLAuthRepository } from '@src/auth/context/infrastructure/persistence'
import { TYPES as AuthTypes } from '@src/auth/context/utils'
import { ConstructionController } from '@src/construction/app'
import { ConstructionCreator, ConstructionDeleter, ConstructionUpdater } from '@src/construction/context/application'
import { type ConstructioRepository } from '@src/construction/context/domain'
import { MySQLConstructionRepository } from '@src/construction/context/infrastructure/persistence'
import { TYPES as ConstructionTypes } from '@src/construction/context/utils'
import { OwnerController } from '@src/owner/app'
import { OwnerCreator, OwnerDeleter, OwnerUpdater } from '@src/owner/context/application'
import { OwnernGetter } from '@src/owner/context/application/owner-getter'
import { type OwnerRepository } from '@src/owner/context/domain'
import { MySQLOwnernRepository } from '@src/owner/context/infrastructure'
import { TYPES as OwnerTypes } from '@src/owner/context/utils'
import { PermissionController } from '@src/permission/apps/controllers'
import { PermissionCreator, PermissionDeleter, PermissionGetter, PermissionUpdater } from '@src/permission/context/application'
import { type PermissionRepository } from '@src/permission/context/domain'
import { MySQLPermissionRepository } from '@src/permission/context/infrastructure/persistence'
import { TYPES as PermissionTypes } from '@src/permission/context/utils'
import { Matcher, type SharedRepository } from '@src/shared/modules'
import { EmailNotification } from '@src/shared/modules/context/application/notfications'
import { MySQLSharedRepository } from '@src/shared/modules/context/infrastructure/persistence'
import { TYPES as SharedTypes } from '@src/shared/modules/context/utils'
import { UserController } from '@src/user/app/controllers'
import { UserDeleter, UserUpdater } from '@src/user/context/application'
import { type UserRepository } from '@src/user/context/domain'
import { MySQLUserRepository } from '@src/user/context/infrastructure'
import { TYPES as UserTypes } from '@src/user/context/utils/constants'
import { Container } from 'inversify'

const container = new Container()

// Auth dependency injection
container.bind<AuthRepository>(AuthTypes.AuthRepository).to(MySQLAuthRepository)
container.bind<AuthRegister>(AuthRegister).toSelf()
container.bind<AuthLogin>(AuthLogin).toSelf()
container.bind<RecoverPassword>(RecoverPassword).toSelf()
container.bind<SearchUser>(SearchUser).toSelf()
container.bind<AuthController>(AuthController).toSelf()

// Permission dependency injection
container.bind<PermissionRepository>(PermissionTypes.PermissionRepository).to(MySQLPermissionRepository)
container.bind<PermissionCreator>(PermissionCreator).toSelf()
container.bind<PermissionDeleter>(PermissionDeleter).toSelf()
container.bind<PermissionUpdater>(PermissionUpdater).toSelf()
container.bind<PermissionGetter>(PermissionGetter).toSelf()
container.bind<PermissionController>(PermissionController).toSelf()

// Construction dependency injection
container.bind<ConstructioRepository>(ConstructionTypes.ConstructioRepository).to(MySQLConstructionRepository)
container.bind<ConstructionCreator>(ConstructionCreator).toSelf()
container.bind<ConstructionDeleter>(ConstructionDeleter).toSelf()
container.bind<ConstructionUpdater>(ConstructionUpdater).toSelf()
container.bind<ConstructionController>(ConstructionController).toSelf()

// Owner dependency injection
container.bind<OwnerRepository>(OwnerTypes.OwnerRepository).to(MySQLOwnernRepository)
container.bind<OwnerCreator>(OwnerCreator).toSelf()
container.bind<OwnerDeleter>(OwnerDeleter).toSelf()
container.bind<OwnerUpdater>(OwnerUpdater).toSelf()
container.bind<OwnernGetter>(OwnernGetter).toSelf()
container.bind<OwnerController>(OwnerController).toSelf()

// User dependency injection
container.bind<UserRepository>(UserTypes.UserRepository).to(MySQLUserRepository)
container.bind<UserDeleter>(UserDeleter).toSelf()
container.bind<UserUpdater>(UserUpdater).toSelf()
container.bind<UserController>(UserController).toSelf()

// Shared dependency injection
container.bind<SharedRepository>(SharedTypes.SharedRepository).to(MySQLSharedRepository)
container.bind<Matcher>(Matcher).toSelf()
container.bind<EmailNotification>(EmailNotification).toSelf()

export default container
