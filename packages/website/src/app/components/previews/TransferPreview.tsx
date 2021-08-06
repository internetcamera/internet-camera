import React from "react";
import {
  InternetCameraTypes,
  InternetCameraAddresses,
} from "@internetcamera/sdk";
import { formatEther } from "ethers/lib/utils";
import dayjs from "dayjs";

import Spacer from "../Spacer";
import ENSNameOrAddress from "../ENSNameOrAddress";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const TransferPreview = ({
  transferEvent,
}: {
  transferEvent: InternetCameraTypes.TransferEvent;
}) => {
  return (
    <div className="transfer-preview">
      <div className="message">
        {transferEvent.type == "PHOTO" &&
          transferEvent.from.address ==
            "0x0000000000000000000000000000000000000000" && (
            <>
              <div className="tag micro">NEW PHOTO</div>
              <ENSNameOrAddress
                address={transferEvent.to.address}
              ></ENSNameOrAddress>{" "}
              posted photo #{parseInt(`${transferEvent.photo?.filmIndex}`) + 1}{" "}
              of{" "}
              {parseFloat(
                formatEther(transferEvent.photo?.film.totalSupply as string)
              ).toLocaleString()}{" "}
              to {transferEvent.photo?.film.symbol}.
            </>
          )}

        {transferEvent.type == "PHOTO" &&
          transferEvent.to.address ==
            "0x0000000000000000000000000000000000000000" && (
            <>
              <div className="tag micro">DELETE PHOTO</div>
              <ENSNameOrAddress
                address={transferEvent.to.address}
              ></ENSNameOrAddress>{" "}
              deleted a photo.
            </>
          )}

        {transferEvent.type == "FILM" &&
          transferEvent.from.address ==
            "0x0000000000000000000000000000000000000000" && (
            <>
              <div className="tag micro">NEW FILM</div>
              <ENSNameOrAddress
                address={transferEvent.to.address}
              ></ENSNameOrAddress>{" "}
              created{" "}
              {parseFloat(
                formatEther(transferEvent.film?.totalSupply as string)
              ).toLocaleString()}{" "}
              {transferEvent.film?.symbol}.
            </>
          )}

        {transferEvent.type == "FILM" &&
          transferEvent.to.address ==
            InternetCameraAddresses[CHAIN_ID].camera.toLowerCase() && (
            <>
              <div className="tag micro">DEPOSIT</div>
              <ENSNameOrAddress
                address={transferEvent.from.address}
              ></ENSNameOrAddress>{" "}
              deposited{" "}
              {parseFloat(
                formatEther(transferEvent.amount as string)
              ).toLocaleString()}{" "}
              {transferEvent.film?.symbol} into the Internet Camera.
            </>
          )}

        {transferEvent.type == "FILM" &&
          transferEvent.from.address !=
            "0x0000000000000000000000000000000000000000" &&
          transferEvent.to.address !=
            InternetCameraAddresses[CHAIN_ID].camera.toLowerCase() && (
            <>
              <div className="tag micro">TRANSFER</div>
              <ENSNameOrAddress
                address={transferEvent.from.address}
              ></ENSNameOrAddress>{" "}
              sent{" "}
              {parseFloat(
                formatEther(transferEvent.amount as string)
              ).toLocaleString()}{" "}
              {transferEvent.film?.symbol} to{" "}
              <ENSNameOrAddress
                address={transferEvent.to.address}
              ></ENSNameOrAddress>
              .
            </>
          )}
      </div>
      <Spacer />

      <div className="transaction">
        <a
          href={`https://mumbai.polygonscan.com/tx/${transferEvent.txHash}`}
          target="_blank"
        >
          {dayjs.unix(transferEvent.createdAt).format("MMMM D, YYYY h:mm:ssa")}{" "}
          ↗
        </a>
      </div>
      <style jsx>{`
        .transfer-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px dotted #444;
        }
        .tag {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 5px;
          margin-right: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          font-size: 11px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default TransferPreview;
