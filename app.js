const express = require("express");
const app = express();
const port = 3000;
const { Web3 } = require("web3");
const contractInfo = require("./constants.json");

const address = "0x9F74FCa6492F8ebe7173577C38eB18ebC01AeF3d";
const privateKey =
  "0x32a39a8994cc25428aa10152e0cb0d23c28ec27b2e17eed174d36c4cf7878ed1";
const rpc =
  "https://subnets.avacloud.io/cd5cd4d9-8ea9-46c4-b01d-fdc7480e3142";

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hola Bogotá!");
});

app.get("/contract-info", async (req, res) => {
  const lucasNet = new Web3(rpc);
  const balanceLucas = await lucasNet.eth.getBalance(address);
  console.log({ balanceLucas });
  res.send({
    message: "Hola Bogotá...!",
    balanceLucas: Number(balanceLucas) / 10 ** 18,
  });
});

const nftList = {
  vestido: "ipfs://QmUShUmHVavRFMhR2Sx1FXBaqKVHbeBcVYrgac3UeQwiG9",
  sombrero: "ipfs://QmTHRCerW1JB8vqofqAgGJW5cUnPQHgEPNVgwYMAdyua4r",
  rana: "ipfs://QmPb18sNG4Xcji7M2bLf12H3aVJkyuhb9FE3Z7CtcD7UXK",
  pantaloneta: "ipfs://QmTRWVmq338Qz72zuBVXUNFMG43drW7eQEd2sFHXcSyTgN",
  overoll: "ipfs://QmbbangzBNXpeNLp1mswsVjBQRZ6dzE2u3AcJLa2CW72C4",
  esqueleto: "ipfs://Qmba9ZBhg5T9n4qegLmz4P1oBu2yHGALr8ftAX6sVHW7Ff",
  Esmeralda: "ipfs://QmRm1B67bsgfaKLZ4sGwPAxVmspo3jry6MG13M2d2wuXrC",
  colombia: "ipfs://QmQcRf4XJ5yAxXpivauydisAAq3UNs1m1sMzYGNYLQvJtF",
  casco: "ipfs://QmQpEktCbbWQ2Gt19Wbf9G1AGoLdUWKaAoN1u32r25DkBh",
  buns: "ipfs://QmXwSh8pTWb5pjYexLo47wSwD9U9W6J4df3a4iHXMCUbkQ",
  botas: "ipfs://QmTQABWnrZSfz3yBj8CqVrPeG9hfWqugaKtsqcq9P2LR6s",
  bigote: "ipfs://QmPTkS6sKim9BqD2WvvuJR448CevHu6NU1vbXWoabgP3zV",
}

app.post("/mint", async (req, res)=> {
  const data = req.body;
  const lucasNet = new Web3(rpc);
  const account = lucasNet.eth.accounts.wallet.add(privateKey);
  let nftContract = new lucasNet.eth.Contract(
    contractInfo.abi,
    contractInfo.address
  );
  const transferDiamond = await nftContract.methods
    .safeMint(data.receiver, nftList[data.id])
    .send({
      from: account[0].address,
    });
  res.send({
    message: "Ok",
    statusCode: 200,
    txHashDiamond: transferDiamond.transactionHash,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});