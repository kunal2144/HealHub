import * as SecureStore from 'expo-secure-store'

export const logout = async (setUserToken) => {
  await SecureStore.deleteItemAsync('JWT_TOKEN')
  setUserToken(null)
}
