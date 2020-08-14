const { UserAuth } = require('@textile/hub');
import { Client, KeyInfo } from '@textile/hub'
import { Buckets, UserAuth } from '@textile/hub'
import glob from 'glob'

const UserAuth = {
  msg: '<api msg>',
  sig: '<api sig>',
  token: '<user msg>',
  key: '<api key>',
}

//Dev Auth
async function startDev () {
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

const getOrInit = async (auth/*: Buckets*/, bucketName/*: string*/) => {
  const buckets = Buckets.withUserAuth(auth)
  // Automatically scopes future calls on `buckets` to the Thread containing the bucket
  const { root, threadID } = await buckets.getOrInit(bucketName)
  if (!root) throw new Error('bucket not created')
  const bucketKey = root.key
  return { buckets, bucketKey }
}

async function logLinks (buckets/*: Buckets*/, bucketKey/*: string*/) {
  const links = await buckets.links(bucketKey)
  console.log(links)
}

const existsFind = async (buckets/*: Buckets*/, bucketName/*: string*/) => {
  const roots = await buckets.list();
  return roots.find((bucket) => bucket.name === bucketName)
}

const globDir = util.promisify(glob)

// expects an already setup buckets session using getOrInit or withThread
const existsPush = async (buckets/*: Buckets*/, bucketKey/*: string*/, dir/*: string*/) => {
  const files = await globDir('<dir glob options>')
  return await Promise.all(files.map(async (file) => {
    const filePath = dir + '/' + file
    var content = fs.createReadStream(filePath, { highWaterMark: 1024 * 1024 * 3 });
    const upload = {
      path: file,
      content
    }
    return await buckets.pushPath(bucketKey, file, upload)
  }))
}

module.exports = {
  UserAuth,
  startDev,
  start,
  getOrInit,
  logLinks,
  existsFind,
  globDir,
  existsPush
}