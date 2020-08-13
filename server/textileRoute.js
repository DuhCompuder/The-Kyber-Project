const { UserAuth } = require('@textile/hub');
import { Client, KeyInfo } from '@textile/hub'

const UserAuth = {
  msg: '<api msg>',
  sig: '<api sig>',
  token: '<user msg>',
  key: '<api key>',
}

//Dev Auth
async function start () {
    const KeyInfo = {
      key: '<api key>',
      secret: '<api secret>'
    }
    const client = await Client.withKeyInfo(keyInfo)
  }

//User Auth
function start () /*Promise<UserAuth>*/{
    const client = Client.withUserAuth(callback)
    return client
}
