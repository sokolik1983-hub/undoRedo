/**
 * @see https://webpack.js.org/configuration/dev-server/
 */

import {devServerProxyConfig} from './devServierProxy';

export const devServerConfig = {
    client: {
        overlay: false,
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    port: 3000,
    historyApiFallback: true,
    hot: true,
    proxy: devServerProxyConfig,
    static: {
        publicPath: '/',
    },
};
