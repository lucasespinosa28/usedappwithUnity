import React from 'react';
import logo from './logo.svg';
import './App.css';
import Unity, { UnityContext } from "react-unity-webgl";
import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core';
import { formatEther,formatUnits} from '@ethersproject/units'
const unityContext = new UnityContext({
  loaderUrl: "unity/Build/unity.loader.js",
  dataUrl: "unity/Build/unity.data",
  frameworkUrl: "unity/Build/unity.framework.js",
  codeUrl: "unity/Build/unity.wasm",
});

function EtherBalanceToUnity(amount : string) {
  unityContext.send("/Canvas/BalanceText", "EtherBalanceToUnity", amount);
  console.log(amount);
}

const App = () => {
  const { activateBrowserWallet, account } = useEthers()
  const { sendTransaction } = useSendTransaction()

  const etherBalance = useEtherBalance(account)
  unityContext.on("SendTranscationFromUnity",( address, amount) => {
    sendTransaction({ to: address, value: amount })
  });
  return <div>
    <div>
      <button onClick={() => { 
            activateBrowserWallet(); 
          }}>Connect</button>
          {account && <p>Account: {account}</p>}
          {etherBalance && EtherBalanceToUnity(formatEther(etherBalance))}
    </div>
    <div>
      <Unity unityContext={unityContext} />
    </div>
  </div>
    
}

export default App;
