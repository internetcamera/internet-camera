import Ganache from '@internetcamera/contracts/dist/addresses/1337.json';
import Mumbai from '@internetcamera/contracts/dist/addresses/80001.json';

interface Addresses {
  [key: string]: {
    camera: string;
    filmFactory: string;
    filmFactoryToken: string;
    forwarder: string;
  };
}

const InternetCameraAddresses: Addresses = {
  1337: Ganache,
  80001: Mumbai
};

export default InternetCameraAddresses;
