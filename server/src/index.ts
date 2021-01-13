import { Api, JsonRpc, JsSignatureProvider } from '@protonprotocol/protonjs'
import fetch from 'node-fetch'
import { CRON_CONTRACT, ENDPOINTS, PRIVATE_KEYS, WAIT_TIME, ACCOUNT, ACCOUNT_PERMISSION } from './constants'

const rpc = new JsonRpc(ENDPOINTS, { fetch: fetch })
const api = new Api({ rpc, signatureProvider: new JsSignatureProvider(PRIVATE_KEYS as any) })

const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const process = async () => {
  const actions = [{
    account: CRON_CONTRACT,
    name: 'process',
    data: {
      account: ACCOUNT,
      max: 5
    },
    authorization: [{
      actor: ACCOUNT,
      permission: ACCOUNT_PERMISSION
    }]
  }]

  try {
    const result = await api.transact({ actions }, {
      useLastIrreversible: true,
      expireSeconds: 400
    })
    return result
  } catch (e) {
    console.log(e)
  }
}

export const main = async () => {
  process()
  await wait(WAIT_TIME)
}

main()