import { NextApiHandler } from 'next';
import { TrustedForwarder__factory } from '@internetcamera/contracts';
import { InternetCameraAddresses } from '@internetcamera/sdk';
import { utils, Wallet } from 'ethers';
import { providers } from 'ethers';

const api: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type');
  if (req.method == 'POST') {
    const {
      data,
      signature,
      forwarderAddress,
      rpcUrl
    }: {
      data: any;
      signature: string;
      forwarderAddress?: string;
      rpcUrl?: string;
    } = req.body;
    const wallet = new Wallet(
      process.env.PRIVATE_KEY as string,
      new providers.JsonRpcProvider(rpcUrl || (process.env.RPC_URL as string))
    );
    const forwarder = TrustedForwarder__factory.connect(
      forwarderAddress || InternetCameraAddresses[80001].forwarder,
      wallet
    );
    const tx = await forwarder.execute(data.message, signature, {
      gasLimit: Math.floor(data.message.gas * 2.5),
      gasPrice: utils.parseUnits('40', 'gwei')
    });
    console.log(tx);
    return res.json(tx);
  } else {
    res.send('');
  }
};

export default api;
