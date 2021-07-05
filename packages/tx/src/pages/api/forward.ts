import { NextApiHandler } from 'next';
import { TrustedForwarder__factory } from '@internetcamera/contracts';
import { InternetCameraAddresses } from '@internetcamera/sdk';
import { Wallet } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';

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
      signature
    }: {
      data: any;
      signature: string;
    } = req.body;
    const wallet = new Wallet(
      process.env.PRIVATE_KEY as string,
      new JsonRpcProvider(process.env.RPC_URL)
    );
    const forwarder = TrustedForwarder__factory.connect(
      InternetCameraAddresses[80001].forwarder,
      wallet
    );
    const tx = await forwarder.execute(data.message, signature);
    return res.json(tx);
  } else {
    res.send('');
  }
};

export default api;
