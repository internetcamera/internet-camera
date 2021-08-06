import { GetServerSideProps } from "next";
import { usePhoto } from "@internetcamera/sdk/dist/react";
import { InternetCameraAddresses } from "@internetcamera/sdk";
import dayjs from "dayjs";
import Link from "next/link";
import AddressAvatar from "@app/components/AddressAvatar";
import ENSNameOrAddress from "@app/components/ENSNameOrAddress";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    filmAddress,
    tokenId,
  }: { filmAddress?: string; filmIndex?: string; tokenId?: string } = ctx.query;
  return { props: { filmAddress, tokenId } };
};

const Photo = ({
  filmAddress,
  tokenId,
}: {
  filmAddress: string;
  filmIndex: string;
  tokenId: string;
}) => {
  const { photo } = usePhoto(
    tokenId,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  if (!photo) return null;
  return (
    <div className="photo">
      <div className="frame">
        <div className="image">
          {photo.image && (
            <img
              src={`${photo.image.replace(
                "ipfs://",
                process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
              )}.jpg`}
              width="386"
              height="579"
            />
          )}
        </div>
        <div className="meta">
          <div className="name">{photo.name}</div>
          <div className="date">
            Posted {dayjs.unix(photo.createdAt).format("MMMM D, YYYY h:mm:ssa")}
          </div>
          <div className="addresses">
            <div className="address">
              Posted by{" "}
              <AddressAvatar address={photo.creator.address} size={20} />{" "}
              <Link href={`/explorer/address/${photo.creator.address}`}>
                <a>
                  <ENSNameOrAddress
                    address={photo.owner.address}
                  ></ENSNameOrAddress>
                </a>
              </Link>
            </div>
            <div className="address">
              Held by <AddressAvatar address={photo.owner.address} size={20} />{" "}
              <Link href={`/explorer/address/${photo.owner.address}`}>
                <a>
                  <ENSNameOrAddress
                    address={photo.owner.address}
                  ></ENSNameOrAddress>
                </a>
              </Link>
            </div>
          </div>

          <div className="links">
            <a
              href={photo.tokenURI.replace(
                "ipfs://",
                process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
              )}
              target="_blank"
            >
              Metadata on IPFS ↗
            </a>
            <a
              href={photo.image.replace(
                "ipfs://",
                process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
              )}
              target="_blank"
            >
              Full res on IPFS ↗
            </a>
            <a
              href={`https://testnets.opensea.io/assets/mumbai/${
                InternetCameraAddresses[
                  Number(process.env.NEXT_PUBLIC_CHAIN_ID)
                ].camera
              }/${tokenId}`}
              target="_blank"
            >
              OpenSea ↗
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .photo {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 75px;
        }
        .frame {
          padding-top: 40px;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .image {
          width: 100%;
        }

        img {
          width: 100%;
          max-height: 70vh;
          height: auto;
          display: block;
          object-fit: contain;
          object-position: center center;
          border-radius: 5px;
        }
        .meta {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .name {
          line-height: 1em;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .date {
          color: #777;
        }
        .links {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }
        .links a {
          border-radius: 5px;
          padding: 5px 15px;
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          color: white;
          border-radius: 5px;
          font-size: 14px;
        }
        .addresses {
          display: flex;
          margin-top: 20px;
          gap: 10px;
        }
        .address {
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          padding: 10px 15px;
          font-size: 14px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>
    </div>
  );
};

export default Photo;
