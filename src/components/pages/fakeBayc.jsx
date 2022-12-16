import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import contract from "../contracts/ContractFakeBAYC.json";
import { useEffect, useState } from "react";
import Web3 from "web3";

function FakeBayc() {
  const web3 = new Web3(Web3.givenProvider);
  const contractAdress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
  const contractInstance = new web3.eth.Contract(contract, contractAdress);
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  async function getMetadata() {
    const supply = await contractInstance.methods
      .totalSupply()
      .call()
      .catch(function (error) {
        console.log(error);
      });
    if (tokenId > supply) {
      setErrorMessage("Token does not exist");
      return;
    }
    const uri = await contractInstance.methods
      .tokenURI(tokenId)
      .call()
      .catch(function (error) {
        console.log(error);
      });
    const _metadata = await fetch(uri).then((response) => response.json());
    _metadata.image = _metadata.image.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
    setMetadata(_metadata);
  }

  useEffect(() => {
    if (tokenId) getMetadata();
  }, []);

  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [supply, setSupply] = useState("");
  const [tokenIdState, setTokenIdState] = useState("");

  async function InfoForBAYC() {
    const name = await contractInstance.methods
      .name()
      .call()
      .catch(function (error) {
        console.log(error);
      });
    setName(name);

    const supply = await contractInstance.methods
      .totalSupply()
      .call()
      .catch(function (error) {
        console.log(error);
      });
    setSupply(supply);
  }

  async function ClaimBAYC() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const chainID = await window.ethereum.request({ method: "eth_chainId" });
    const claim = await contractInstance.methods
      .claimAToken()
      .send({ from: account });
    await InfoForBAYC();
    navigate({
      pathname: "/fakeBayc/" + claim.events.Transfer.returnValues.tokenId,
      replace: true,
    });
    window.location.reload();
    console.log(claim);
  }

  return (
    <div>
      <h1>Fake BAYC</h1>
      <button onClick={InfoForBAYC}>Info for BAYC</button>
      {name !== "" && supply !== "" ? (
        <div>
          <p>Name: {name}</p>
          <p>Supply: {supply}</p>
        </div>
      ) : null}

      <button onClick={ClaimBAYC}>Claim BAYC</button>
      <form action={`/FakeBayc/${tokenIdState}`}>
        <input
          type="text"
          value={tokenIdState}
          onChange={(e) => setTokenIdState(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      {errorMessage ? <p>{errorMessage}</p> : null}

      {metadata.image ? (
        <div>
          <img src={metadata.image} alt="NFT" />
        </div>
      ) : null}
    </div>
  );
}

export default FakeBayc;
