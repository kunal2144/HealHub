import * as SecureStore from 'expo-secure-store'

export const saveUserData = async (data) => {
  await SecureStore.setItemAsync('USER_DATA', JSON.stringify(data))
}
