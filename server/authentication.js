const Box = require('3box');
const { Libp2pCryptoIdentity } = require('@textile/threads-core');


const getAddressFromMetaMask = async() => {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true })
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; 
      //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts })
    }
}
const componentDidMount = async () => {
    await this.getAddressFromMetaMask()
    if (this.state.accounts) {    }
  }

const sign = async(identity) => {
    const challenge = Buffer.from('Sign this string');
    const credentials = identity.sign(challenge);

    return credentials;
}

const getIdentity = async () => {
    const box = await Box.create((window).ethereum);
    const [ address ] = await window.ethereum.enable();
    await box.auth([], { address });

    const space = await box.openSpace('io-textile-dropzone');
    await box.syncDone;
    try {
        var storedIdent = await space.private.get('identity');
        if (storedIdent === null) {
            throw new Error('No identity');
        }
        const identity = await Libp2pCryptoIdentity.fromString(storedIdent);
        return identity;
    } catch (e) {
        const identity = await Libp2pCryptoIdentity.fromRandom();
        const identityString = identity.toString();
        await space.private.set('identity', identityString);
        return identity;
    };
};

module.exports = {
    getAddressFromMetaMask,
    componentDidMount,
    sign,
    getIdentity
}