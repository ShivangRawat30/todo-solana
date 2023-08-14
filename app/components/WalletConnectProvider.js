import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter} from '@solana/wallet-adapter-wallets'; 
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

export const WalletConnectProvider = ({children}) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet

     // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => {
        if(network === WalletAdapterNetwork.Devnet) {
            return 'https://snowy-twilight-lambo.solana-devnet.discover.quiknode.pro/06ccd13a7862a02057c149363873a4696be5444b/';
        }
        return clusterApiUrl(network)
    }, [network])


    const wallets = useMemo(() => [new PhantomWalletAdapter(), new GlowWalletAdapter()], [network])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}