import Ganache from '@internetcamera/contracts/dist/addresses/1337.json';

interface Addresses {
  [key: string]: {
    camera: string;
    filmFactory: string;
    forwarder: string;
  };
}

const InternetCameraAddresses: Addresses = {
  1337: Ganache
};

export default InternetCameraAddresses;
