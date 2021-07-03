import Dialog from '@app/components/Dialog';
import getMumbaiMatic, { getFaucetValue } from '@app/features/getMumbaiMatic';
import { useWallet } from '@gimmixfactory/use-wallet';
import React from 'react';
import useSWR from 'swr';

const Faucet = () => {
  const { account } = useWallet();
  const { data: faucetValue } = useSWR<{ payout: number }>(
    'mumbai-faucet-value',
    getFaucetValue
  );
  console.log(faucetValue);

  const onFaucetClick = async () => {
    if (!account) return;
    console.log(await getMumbaiMatic(account));
  };
  return (
    <div className="faucet">
      <Dialog title="Faucet">
        <button onClick={onFaucetClick}>Get {faucetValue?.payout} MATIC</button>
      </Dialog>
      <style jsx>{`
        .faucet {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Faucet;
