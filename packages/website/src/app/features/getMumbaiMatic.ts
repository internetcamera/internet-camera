export const getMumbaiMatic = async (address: string) => {
  return await fetch('https://api.faucet.matic.network/transferTokens', {
    headers: {
      'content-type': 'application/json'
    },
    body: `{"network":"mumbai","address":"${address}","token":"maticToken"}`,
    method: 'POST'
  }).then(res => res.json());
};

export const getFaucetValue = () => {
  return fetch('https://api.faucet.matic.network/mumbai/maticToken').then(res =>
    res.json()
  );
};

export default getMumbaiMatic;
