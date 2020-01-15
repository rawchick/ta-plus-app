import React from 'react'
import { Platform } from 'react-native'
import AzureAuth from 'react-native-azure-auth';

const CLIENT_ID = 'd69a32fd-07ff-4576-84ca-9986f6a9c75e' // replace the string with YOUR client ID
const TENANT_ID = 'bbb8da8f-f374-490f-9190-2242176e117c' // replace the string with YOUR tenant ID
const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
    redirectUri: Platform.OS === 'ios' ? "com.taplusapp://com.taplusapp/ios/callback" : "azure://com.taplusapp/android/callback",
    authorityUrl: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}`
});

export default azureAuth