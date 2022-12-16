import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import contract from "../contracts/ContractFakeNefturians.json";
import "../../style.css";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const contractAdress = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED"; // contract address
const contractInstance = new web3.eth.Contract(contract, contractAdress);

function fakeNefturians() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [givenAddress, setGivenAddress] = useState("");
  const [addressTokens, setAddressTokens] = useState([]);

  const flexStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const buyFakeNefturian = async () => {
    const tx = await contractInstance.methods
      .buyAToken()
      .send({ from: account, value: +minimumPrice + 10000000000 });
    console.log(tx);
  };

  const goToAccount = async () => {
    navigate(`/fakeNefturians/${givenAddress}`);
  };

  const getOwnersTokens = async () => {
    const balance = await contractInstance.methods.balanceOf(address).call();
    setBalance(balance);
    const allMetaDatas = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await contractInstance.methods
        .tokenOfOwnerByIndex(address, i)
        .call();
      const tokenURI = await contractInstance.methods.tokenURI(tokenId).call();
      const _metadata = fetch(tokenURI).then((res) => res.json());
      allMetaDatas.push(_metadata);
    }
    const _addressTokens = await Promise.all(allMetaDatas);
    console.log(_addressTokens);

    setAddressTokens(_addressTokens);
  };

  let { address } = useParams();
  console.log(address);
  useEffect(() => {
    const Init = async () => {
      if (!address)
        address = await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => accounts[0])
          .catch((err) => {
            console.log(err);
          });
      else await getOwnersTokens();

      setGivenAddress(address);
      setAccount(address);

      const price = await contractInstance.methods.tokenPrice().call();
      setMinimumPrice(price);
    };
    Init();
  }, []);

  return (
    <div style={flexStyle}>
      <h1> Fake Nefturians </h1>
      <p> Minimum price: {minimumPrice} </p>
      <p> Your account: {account} </p>
      <button onClick={buyFakeNefturian}> Buy </button>
      <form onSubmit={goToAccount} style={flexStyle}>
        <input
          value={givenAddress}
          onChange={(e) => setGivenAddress(e.target.value)}
          style={{ width: "50%", alignContent: "center", textAlign: "center" }}
        />
        <button type="submit"> Get my tokens </button>
      </form>
      <div className="NefturiansTokens">
        {addressTokens.map((token, index) => (
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
export default fakeNefturians;
