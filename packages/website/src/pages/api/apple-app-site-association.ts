import { NextApiHandler } from 'next';

const api: NextApiHandler = async (req, res) => {
  return res.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: 'camera.internet.cam',
          paths: ['/film/create']
        }
      ]
    }
  });
};

export default api;
