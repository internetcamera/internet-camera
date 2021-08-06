import { InternetCameraAddresses } from "@internetcamera/sdk";
import { providers } from "ethers";
import { persist } from "zustand/middleware";
import create from "zustand";
import { useEffect } from "react";

const getENSName = async (account: string) => {
  if (
    account.toLowerCase() == InternetCameraAddresses[80001].camera.toLowerCase()
  )
    return "Internet Camera";
  return new providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    1
  ).lookupAddress(account);
};

type ENSStoreState = {
  addressBook: Record<string, string>;
};

export const useENSStore = create<ENSStoreState>(
  persist(
    (set, get) => ({
      addressBook: {},
    }),
    {
      name: "ens-internet-camera",
    }
  )
);

const useENSNameOrAddress = (account?: string) => {
  const ensName = useENSStore((state) =>
    account
      ? state.addressBook[account.toLowerCase()] || account.toLowerCase()
      : null
  );
  useEffect(() => {
    if (!account || !ensName) return;
    if (ensName.toLowerCase() != account.toLowerCase()) return;
    getENSName(account).then((name) => {
      useENSStore.setState((state) => ({
        addressBook: { ...state.addressBook, [account.toLowerCase()]: name },
      }));
    });
  }, [ensName]);
  return ensName == account?.toLowerCase() ? account?.slice(0, 6) : ensName;
};

export default useENSNameOrAddress;
