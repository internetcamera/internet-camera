import useENSNameOrAddress from "@app/features/useENSNameOrAddress";
import React from "react";

const ENSNameOrAddress = ({ address }: { address: string }) => {
  const name = useENSNameOrAddress(address);
  return <>{name}</>;
};

export default ENSNameOrAddress;
