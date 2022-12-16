import { useState, useEffect } from "react";
import Web3 from "web3";
import tokenContract from "../contracts/FakeMeebits.json";
import tokenClaimerContract from "../contracts/FakeMeebitsClaimer.json";
import signatures from "../contracts/FakeMeebitsSignatures.json";

const web3 = new Web3(Web3.givenProvider);
const tokenAddress = "0xD1d148Be044AEB4948B48A03BeA2874871a26003";
const tokenClaimerAdress = "0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55";
const tokenInstance = new web3.eth.Contract(tokenContract, tokenAddress);
const tokenClaimerInstance = new web3.eth.Contract(
  tokenClaimerContract,
  tokenClaimerAdress
);

function fakeMeebits() {
  const [account, setAccount] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const [error, setError] = useState("");
  const [ownersTokens, setOwnersTokens] = useState([]);

  const Init = async () => {
    const address = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => accounts[0])
      .catch((err) => {
        console.log(err);
      });

    setAccount(address);
  };

  const mint = async () => {
    const signature = signatures[tokenId].signature;
    setError("");
    const isMinted = await tokenClaimerInstance.methods
      .tokensThatWereClaimed(tokenId)
      .call();
    if (isMinted) {
      setError("Token already minted");
      return;
    }
    const mintTx = await tokenClaimerInstance.methods
      .claimAToken(tokenId, signature)
      .send({ from: account })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
    console.log(mintTx);
  };

  const getOwnersTokens = async () => {
    const events = await tokenClaimerInstance.getPastEvents(
      "aTokenWasClaimed",
      {
        fromBlock: 0,
      }
    );
    const _ownersTokensIds = events
      .filter(
        (e) =>
          e.returnValues._tokenClaimer.toLowerCase() == account.toLowerCase()
      )
      .map((e) => e.returnValues._tokenNumber);
    console.log(events);
    console.log(_ownersTokensIds);
    const _ownersTokens = _ownersTokensIds.map(async (id) => {
      const uri = await tokenInstance.methods.tokenURI(id).call();
      console.log(uri);
      const token = fetch(
        "https://ipfs-proxy.vercel.app/api/" + uri.replaceAll("/", ",")
      ).then((res) => res.json());
      return token;
    });

    setOwnersTokens(await Promise.all(_ownersTokens));
  };

  useEffect(() => {
    Init();
  }, []);

  return (
    <div>
      <h1>Fake Meebits</h1>
      <p>Account: {account}</p>
      <input
        type="text"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={mint}>Mint</button>
      <button onClick={getOwnersTokens}>Get my tokens</button>
      {error ? <p>{error}</p> : null}
      <div className="NefturiansTokens">
        {ownersTokens.map((token, index) => (
          <div className="NefturiansImg" key={index}>
            <h2> {token.name} </h2>
            <img src={token.image} style={{ width: "100%" }} />
            <p> {token.description} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default fakeMeebits;
