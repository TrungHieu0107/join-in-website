import { ObjValidation, ValueValidation } from '../validation'

export function validateProfile(value: any) {
  const result: ObjValidation = {}
  let isError = false

  result.phoneNumber = new ValueValidation({ key: 'phoneNumber', value: value['phoneNumber'] }).required().phone()
  isError = isError ? true : result.phoneNumber.isError

  result.fullName = new ValueValidation({ key: 'fullName', value: value['fullName'] }).required().length(8, 50)
  isError = isError ? true : result.fullName.isError

  result.birthDay = new ValueValidation({ key: 'birthDay', value: value['birthDay'] }).age(15, 100)
  isError = isError ? true : result.birthDay.isError

  result.description = new ValueValidation({ key: 'description', value: value['description'] })
    .required()
    .length(8, undefined)
  isError = isError ? true : result.description.isError

  result.majorIdList = new ValueValidation({ key: 'majorIdList', value: value['majorIdList'] })
    .required()
    .length(1, undefined)
  isError = isError ? true : result.majorIdList.isError

  result.skill = new ValueValidation({ key: 'skill', value: value['skill'] }).required().length(5, 100)
  isError = isError ? true : result.skill.isError

  result.otherContact = new ValueValidation({ key: 'otherContact', value: value['otherContact'] })
    .required()
    .length(1, 100)
  isError = isError ? true : result.otherContact.isError

  if (isError) {
    return {
      result: result,
      isError: isError
    }
  } else {
    return value
  }
}
