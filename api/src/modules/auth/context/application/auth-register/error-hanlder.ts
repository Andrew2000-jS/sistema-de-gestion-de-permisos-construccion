import { type ApplicationResponse } from '@src/shared/modules'

enum ErrorNames {
  UserPasswordLengthTooShort = 'UserPasswordLengthTooShort',
  UserInvalidPassword = 'UserInvalidPassword',
  UserInvalidEmail = 'UserInvalidEmail',
  UserEmailLengthTooShort = 'UserEmailLengthTooShort',
  UserCiLengthTooShort = 'UserCiLengthTooShort',
  UserCiLengthTooLong = 'UserCiLengthTooLong',
  UserInvalidCi = 'UserInvalidCi',
  UserNameLengthExceeded = 'UserNameLengthExceeded',
  UserNameLengthTooShort = 'UserNameLengthTooShort',
  UserInvalidName = 'UserInvalidName'
}

type ErrorDict = {
  [key in keyof typeof ErrorNames]: (msg: string) => ApplicationResponse<any>;
} & {
  default: () => ApplicationResponse<null>
}

export function errorHandler (name: keyof ErrorDict, message: string = 'default'): ApplicationResponse<any> {
  const errorDict: ErrorDict = {
    UserPasswordLengthTooShort: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserInvalidPassword: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserInvalidEmail: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserEmailLengthTooShort: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserCiLengthTooShort: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserCiLengthTooLong: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserInvalidCi: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserNameLengthExceeded: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserNameLengthTooShort: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    UserInvalidName: (msg: string) => ({ message: msg, statusCode: 400, data: null }),
    default: () => ({ message: 'Algo ha salido mal, por favor intente más tarde.', statusCode: 500, data: null })
  }

  return (errorDict[name] ?? errorDict.default)(message)
}
