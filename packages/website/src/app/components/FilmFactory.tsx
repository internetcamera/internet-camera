import React, { useState } from 'react';
import { useWallet } from '@gimmixfactory/use-wallet';
import dayjs from 'dayjs';
import Dialog from '@app/components/Dialog';
import { InternetCameraFilmFactory } from '@internetcamera/sdk';
import { parseUnits } from 'ethers/lib/utils';
import Router from 'next/router';
import { ContractTransaction, providers } from 'ethers';
import useSettings from '@app/features/useSettings';

const FilmFactory = () => {
  const gasless = useSettings(state => state.gasless);

  const [factoryModel, setFactoryModel] = useState<'personal' | 'claimable'>(
    'personal'
  );
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(100);
  const [starts, _setStarts] = useState(new Date());
  const [expires, _setExpires] = useState(
    dayjs()
      .add(1000, 'years')
      .toDate()
  );
  const [amountClaimablePerUser, setAmountClaimablePerUser] = useState(1);
  const [maxClaimsPerUser, setMaxClaimsPerUser] = useState(1);
  const { account, provider, connect } = useWallet();
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const deploy = async () => {
    if (!provider || !account) return;
    const factory = new InternetCameraFilmFactory({
      provider,
      jsonRpcProvider: new providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      ),
      forwarderURL: process.env.NEXT_PUBLIC_TX_URL,
      chainID: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
      ipfsURL: process.env.NEXT_PUBLIC_IPFS_NODE_URL
    });
    let tx: ContractTransaction | null = null;
    if (factoryModel == 'personal') {
      if (!gasless) {
        tx = await factory.deployPersonalFilm(
          name,
          symbol,
          parseUnits(`${totalSupply}`, 18),
          Math.floor(starts.getTime() / 1000),
          Math.floor(expires.getTime() / 1000)
        );
      } else {
        tx = await factory.deployPersonalFilmGasless(
          name,
          symbol,
          parseUnits(`${totalSupply}`, 18),
          Math.floor(starts.getTime() / 1000),
          Math.floor(expires.getTime() / 1000),
          account
        );
      }
    } else if (factoryModel == 'claimable') {
      if (!gasless) {
        tx = await factory.deployClaimableFilm(
          name,
          symbol,
          parseUnits(`${totalSupply}`, 18),
          Math.floor(starts.getTime() / 1000),
          Math.floor(expires.getTime() / 1000),
          parseUnits(`${amountClaimablePerUser}`, 18),
          maxClaimsPerUser
        );
      } else {
        tx = await factory.deployClaimableFilmGasless(
          name,
          symbol,
          parseUnits(`${totalSupply}`, 18),
          Math.floor(starts.getTime() / 1000),
          Math.floor(expires.getTime() / 1000),
          parseUnits(`${amountClaimablePerUser}`, 18),
          maxClaimsPerUser,
          account
        );
      }
    }
    if (!tx) throw new Error('Unhandled case.');
    const receipt = await tx.wait(1);
    const filmAddress = receipt.logs[0].address;
    setTimeout(() => Router.push(`/explorer/film/${filmAddress}`), 1500);
  };

  const disabled = !name || !symbol || totalSupply < 1 || totalSupply > 1000;

  return (
    <div className="film-factory">
      <Dialog
        title="Create your own film"
        subtitle="You can design and launch your own film to the Internet Camera test network in under a minute. Film costs no money to create on the test network, but temporarily requires $FILMFACTORY tokens to create while beta testing. Film creation will be very affordable on the mainnet release."
      >
        <div className="form-item">
          <label>Film Model</label>
          <div className="sublabel">Select a base model for your film.</div>
          <div className="film-options">
            <div
              className={`film-option ${
                factoryModel == 'personal' ? 'film-option-selected' : ''
              }`}
              onClick={() => setFactoryModel('personal')}
            >
              <div className="film-option-title micro">Personal</div>
              <div className="film-option-subtitle micro">
                You get 100% of the film.
              </div>
            </div>
            <div
              className={`film-option ${
                factoryModel == 'claimable' ? 'film-option-selected' : ''
              }`}
              onClick={() => setFactoryModel('claimable')}
            >
              <div className="film-option-title micro">Claimable</div>
              <div className="film-option-subtitle micro">
                Let others claim free film.
              </div>
            </div>
          </div>
        </div>
        <div className="form-item">
          <label>Name</label>
          <div className="sublabel">1 - 32 characters including spaces.</div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="form-item">
          <label>Symbol</label>
          <div className="sublabel">
            1 - 10 uppercase alphanumeric characters. Must be unique.
          </div>
          <input
            type="text"
            value={symbol}
            onChange={e => setSymbol(e.target.value.toUpperCase())}
            placeholder="Symbol"
            minLength={1}
            maxLength={10}
          />
        </div>
        <div className="form-item">
          <label># of photos</label>
          <div className="sublabel">Limited to 1 - 1000.</div>
          <input
            type="number"
            value={totalSupply}
            onChange={e => setTotalSupply(Number(e.target.value))}
            placeholder="100"
            min={1}
            max={1000}
          />
        </div>
        {factoryModel == 'claimable' && (
          <>
            <div className="form-item">
              <label># of film claimable at a time</label>
              <div className="sublabel">
                Limited to 1 - 1000. Any wallet holding less than 1 of your film
                will be able to claim this amount.
              </div>

              <input
                type="number"
                value={amountClaimablePerUser}
                onChange={e =>
                  setAmountClaimablePerUser(Number(e.target.value))
                }
                placeholder="1"
                min={1}
                max={1000}
              />
            </div>
            <div className="form-item">
              <label>Max # of claims per wallet</label>
              <div className="sublabel">
                Limited to 1 - 1000. Wallets will only be able to claim film
                this number of times.
              </div>

              <input
                type="number"
                value={maxClaimsPerUser}
                onChange={e => setMaxClaimsPerUser(Number(e.target.value))}
                placeholder="1"
                min={1}
                max={1000}
              />
            </div>
          </>
        )}
        <div className="advanced-options">
          {!showAdvancedOptions ? (
            <div
              className="advanced-options-title"
              onClick={() => setShowAdvancedOptions(true)}
            >
              ▶ Show advanced options
            </div>
          ) : (
            <>
              <div
                className="advanced-options-title"
                onClick={() => setShowAdvancedOptions(false)}
              >
                ▼ Show advanced options
              </div>
              <div className="form-item">
                <label>Description</label>
                <div className="sublabel">
                  Write an optional description for your film roll.
                </div>
                <textarea />
              </div>
              <div className="form-item">
                <label>Rules / Terms of Use</label>
                <div className="sublabel">
                  Set guidelines for anyone posting photos to this roll.
                </div>
                <textarea />
              </div>
              <div className="form-item">
                <label>Start Time</label>
                <div className="sublabel">
                  Photos cannot be posted to this roll before this time.
                </div>
                <input type="text" value={starts.toLocaleString()} />
              </div>
              <div className="form-item">
                <label>Expire Time</label>
                <div className="sublabel">
                  Photos cannot be posted to this roll after this time.
                </div>
                <input type="text" value={expires.toLocaleString()} />
              </div>
              <div className="form-item">
                <label>Public or Unlisted</label>
                <div className="sublabel">
                  If Unlisted, this film's photos won't appear in the Explorer
                  or any apps using our SDK. Note: All photos can still be found
                  in open catalogs like OpenSea.
                </div>
                <input type="radio" name="publicunlisted" checked /> Public{' '}
                <input type="radio" name="publicunlisted" /> Unlisted
              </div>
              <div className="form-item">
                <label>Aspect Ratio</label>
                <div className="sublabel">
                  Optionally restrict photos to a specific aspect ratio. Format
                  examples: 4:3 or 16:9.
                </div>
                <input type="text" placeholder="" />
              </div>
            </>
          )}
        </div>
        <div className="buttons">
          {!account ? (
            <button onClick={() => connect({})}>
              Connect wallet to deploy
            </button>
          ) : (
            <>
              <button onClick={deploy} disabled={true}>
                You need {totalSupply} $FILMFACTORY to deploy
              </button>
            </>
          )}
        </div>
      </Dialog>
      <style jsx>{`
        .form-item {
          padding: 10px 0;
        }
        label {
          padding: 5px;
          font-weight: bold;
        }
        .sublabel {
          padding: 5px;
          padding-top: 0;
          font-size: 14px;
          color: #aaa;
        }
        input[type='text'],
        input[type='number'],
        textarea {
          width: 100%;
          display: block;
          padding: 5px 10px;
          border: none;
          outline: none;
          color: white;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          font-size: 16px;
          resize: none;
        }
        .buttons {
          margin-top: 10px;
          border-top: 1px dotted #333;
          padding-top: 20px;
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
        .film-options {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          gap: 10px;
          margin-top: 10px;
          border-bottom: 1px dotted #333;
          padding-bottom: 30px;
        }
        .film-option {
          width: 50%;
          background: #000;
          border-radius: 5px;
          padding: 10px 15px;
          cursor: pointer;
        }
        .film-option-title {
          font-size: 12px;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 2px;
        }
        .film-option-subtitle {
          font-size: 10px;
          color: #aaa;
        }
        .film-option-selected {
          box-shadow: 0px 0px 10px 2px purple, 2px 2px 10px -2px blue;
        }
        .film-option-selected .film-option-title {
          color: #fff;
        }
        .advanced-options-title {
          padding: 5px;
          cursor: pointer;
          border-top: 1px dotted #333;
          padding-top: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default FilmFactory;
