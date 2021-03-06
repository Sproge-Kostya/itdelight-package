import {Router} from 'express';
import {apiStatus} from '../../../lib/util';
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config }) => {
  let api = Router();
  api.get('/package/config', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    let url = '/package/config'

    client.addMethods('getPackageConfig', (restClient) => {
      let module = {};
      module.getBlock = function () {
        return restClient.get(url);
      }
      return module;
    })
    client.getPackageConfig.getBlock().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    });
  });
  return api;
};
