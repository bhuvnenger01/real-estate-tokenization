import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/types";
dotenv.config();

const config: HardhatUserConfig = {
    networks: {
        goerli: {
            url: process.env.GOERLI_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
        mainnet:{
            url: process.env.MAINNET_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        }
    },
};
