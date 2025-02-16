// Code to check if the form is invalid
export const isFormInvalid = err => {
  if (Object.keys(err).length > 0) return true
  return false
}