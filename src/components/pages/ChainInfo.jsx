import { BrowserRouter as Router,useNavigate } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import Web3 from 'web3';





function ChainInfo() {

    const [account, setAccount] = useState('');
    const [chainID, setChainID] = useState('');
    const [lastBlock, setLastBlock] = useState('');

    const navigate=useNavigate();

    async function ConnectToSepolia() {

        const metamask = window.ethereum;
        if (metamask !== undefined) {
            const accounts = await metamask.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const chainID = await metamask.request({ method: 'eth_chainId' });
            const web3 = new Web3(metamask);
            const lastBlock = await web3.eth.getBlockNumber();
    
            if(chainID!== '0xaa36a7')
            {
                console.log("Wrong chain",chainID);
                navigate("/WrongNetwork");
            }
    
            setAccount(account);
            setChainID(chainID);
            setLastBlock(lastBlock);
        
        
        }
        else 
            console.log("Metamask not found");
    
    
    
}

  return (
    <div>
      <h1>Chain Info</h1>
        <button onClick={ConnectToSepolia}>Connect to Sepolia</button>
            {account !== '' && chainID !== '' && lastBlock!= ''?
            <div>
                <p>Account: {account}</p>
                <p>Chain ID: {chainID}</p>
                <p>Last Block: {lastBlock}</p>
                </div> 
            : null            
            }   

    </div>
  )
}

export default ChainInfo;