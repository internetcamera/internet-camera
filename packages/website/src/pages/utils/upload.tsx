import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InternetCamera } from '@internetcamera/sdk';
import { useWallet } from '@gimmixfactory/use-wallet';
import { useWalletFilmForAddress } from '@internetcamera/sdk/dist/react';
import Dialog from '@app/components/Dialog';
import { formatEther } from 'ethers/lib/utils';
import Router from 'next/router';

const Upload = () => {
  const [file, setFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>();
  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
    setPreviewURL(URL.createObjectURL(files[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { account, provider, connect } = useWallet();
  const { filmHoldings } = useWalletFilmForAddress(
    account || '0x0000000000000000000000000000000000000000',
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  const [selectedFilmIndex, setSelectedFilmIndex] = useState<number>(0);
  const submit = async () => {
    if (!file || !provider || !filmHoldings?.length) return;
    const camera = new InternetCamera({
      provider: provider.getSigner() as any,
      chainID: Number(process.env.NEXT_PUBLIC_CHAIN_ID) as number,
      ipfsURL: process.env.NEXT_PUBLIC_IPFS_NODE_URL as string,
      graphURL: process.env.NEXT_PUBLIC_GRAPH_URL as string
    });
    const tx = await camera.postPhoto(
      file,
      filmHoldings[selectedFilmIndex].film.filmAddress
    );
    await tx.wait(1);
    setTimeout(
      () =>
        Router.push(
          `/explorer/film/${filmHoldings[selectedFilmIndex].film.filmAddress}`
        ),
      1500
    );
  };
  return (
    <div className="upload">
      <Dialog
        title="Upload"
        subtitle="Upload an image directly to the Internet Camera (for testing purposes)."
      >
        {!account ? (
          <button onClick={() => connect({})}>Connect wallet to upload</button>
        ) : (
          <>
            {!file && (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} accept="image/*" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag and drop an image here, or click to select files</p>
                )}
              </div>
            )}
            {file && (
              <>
                <img className="preview" src={previewURL} />
                <div className="films">
                  <div className="section-title micro">Select a film:</div>
                  {filmHoldings?.map((filmHolding, i) => (
                    <div
                      className={`film ${
                        selectedFilmIndex == i ? 'active' : ''
                      }`}
                      onClick={() => setSelectedFilmIndex(i)}
                      key={filmHolding.film.filmAddress}
                    >
                      {filmHolding.film.name} (You have{' '}
                      {parseFloat(
                        formatEther(filmHolding.amount)
                      ).toLocaleString()}
                      )
                    </div>
                  ))}
                </div>
                <button onClick={submit}>Submit</button>
              </>
            )}
          </>
        )}
      </Dialog>
      <style jsx>{`
        .upload {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 150px;
        }
        img {
          width: 400px;
          height: auto;
        }
        button {
          width: 100%;
          padding: 10px;
          background-image: linear-gradient(to bottom, #0066ff, #6e00ff);
          border: none;
          border-radius: 5px;
          outline: none;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }
        button:disabled {
          background: #333;
          color: #888;
        }
        .dropzone {
          padding: 5px;
          background-color: #222;
          border-radius: 5px;
          text-align: center;
          color: #888;
          cursor: pointer;
          margin-top: 20px;
        }
        .film {
          padding: 10px 15px;
          background-color: #222;
          border-radius: 5px;
          margin-bottom: 10px;
          cursor: pointer;
          color: #444;
        }
        .film.active {
          color: #fff;
          background-color: #555;
        }
        .section-title {
          font-size: 10px;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .preview {
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .films {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Upload;
