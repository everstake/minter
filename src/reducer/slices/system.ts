import { Minter, SystemWithToolkit, SystemWithWallet } from '../../lib/system';
import { createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';
import {
  connectWallet,
  disconnectWallet,
  reconnectWallet
} from '../async/wallet';

const configFromLS = window.localStorage.getItem('networkConfig');

const initialState = Minter.connectToolkit(Minter.configure(
  configFromLS ? JSON.parse(configFromLS) : config
)) as
  | SystemWithToolkit
  | SystemWithWallet;

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(connectWallet.fulfilled, (_, { payload }) => payload);
    addCase(disconnectWallet.fulfilled, (_, { payload }) => payload);
    addCase(reconnectWallet.fulfilled, (_, { payload }) => payload);
  }
});

export default slice;
