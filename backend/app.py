from flask import Flask, request, jsonify
from web3 import Web3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/178d2f8c99454b50a34d1274c60dfda4"))
PRIVATE_KEY="689dfa368d10ec7a576624c7ffe8a23710ef5783089970dbd197fe5a52c7820f"
@app.route("/mint", methods=["POST"])
def mint_nft():
    data = request.json
    contract_address = data["contract_address"]
    token_uri = data["token_uri"]
    to_address = data["to_address"]

    contract_abi = data["abi"]
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)
    nonce = w3.eth.getTransactionCount(w3.eth.default_account)
    tx = contract.functions.mintProperty(to_address, token_uri).buildTransaction({
        "nonce": nonce,
        "gas": 2000000,
        "gasPrice": w3.toWei("50", "gwei"),
    })
    signed_tx = w3.eth.account.signTransaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return jsonify({"tx_hash": tx_hash.hex()})

if __name__ == "__main__":
    app.run(debug=True)
