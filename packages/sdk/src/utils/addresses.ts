import Ganache from '@internetcamera/contracts/dist/addresses/50.json';
import Mumbai from '@internetcamera/contracts/dist/addresses/80001.json';

interface Addresses {
  [key: string]: {
    camera: string;
    filmFactory: string;
  };
}

const InternetCameraAddresses: Addresses = {
  50: Ganache,
  80001: Mumbai
};

export default InternetCameraAddresses;
