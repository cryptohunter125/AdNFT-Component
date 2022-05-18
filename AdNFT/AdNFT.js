import React, { useState, useEffect } from "react"
import ReactPlayer from 'react-player'
import Web3 from "web3"
import "./AdNFT.css"
import config from "./config"
import AdNFTABI from "./AdNFTABI.json"


function AdNFT(props) {

    const [videoPlaying, setVideoPlaying] = useState(false);
    const [hideAdDialog, setHideAdDialog] = useState(true);
    const [currentAddress, setCurrentAddress] = useState([]);
    const [AdNFT, setAdNFT] = useState([]);
    const [showConnectDialog, setShowConnectDialog] = useState(false)
    const [tokenId, setTokenId] = useState([])


    useEffect(async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
            var showConnectButton = false
            if (chainIdHex == config[0].Network.chainId) {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts[0] != null) {
                    setCurrentAddress(accounts[0])
                } else {
                    showConnectButton = true;
                }
                //load token URI
                getTokenURI(props.tokenId);
                setTokenId(props.tokenId);

            } else {
                showConnectButton = true;
            }
            setShowConnectDialog(showConnectButton)

            window.ethereum.on("accountsChanged", async () => {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                setCurrentAddress(accounts[0]);
            });
        }
    }, [])

    var videoProgress = async(e) => {

        var currentLoad = parseInt(e.playedSeconds);
        if (currentLoad == AdNFT.attributes[0].value) {


            setHideAdDialog(false)
            setVideoPlaying(false)






        }
    }

    var closeAdDialog = () => {
        setHideAdDialog(true)
    }

    var handleConnect = async () => {

        try {

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: config[0].Network.chainId }],

            });

        } catch (switchError) {

            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: config[0].Network,
                    });
                } catch (addError) {

                }
            }
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if (accounts[0] != null) {
            setCurrentAddress(accounts[0])
            setShowConnectDialog(false)
        }
    }

    var getTokenURI = async (tokenId) => {
        var web3 = new Web3(window.ethereum);
        var contract = new web3.eth.Contract(
            AdNFTABI["abi"],
            config[0].AdNFTContract
        );
        var tokenURI = await contract.methods.tokenURI(tokenId).call();


        let tokenURIResponse = await fetch(tokenURI);
        const tokenURIResponseJSON = await tokenURIResponse.json();

        setAdNFT(tokenURIResponseJSON);
    }








    return (

        <div className="adNFT">



            {AdNFT.length != 0 ? (
                <div>
                    {showConnectDialog ? (
                        <div className="connectDialog">
                            <div className="connectDialogWindow">
                                <div className="connectDialogButton" onClick={handleConnect.bind(this)}>
                                    Please connect wallet and connect network to {config[0].Network.chainName}.
                                </div>
                            </div>
                            <div className="connectDialogBackgroud"></div>
                        </div>) : (null)}


                    <div className="adDialog" hidden={hideAdDialog}>
                        <div className="adDialogContainer">
                            <div className="adDialogWindow">
                                <div className="adDialogWindowHeader">
                                    <div className="adDialogTitle"></div>
                                    <div className="adDialogClose" onClick={closeAdDialog.bind(this)}>Close</div>
                                </div>
                                <img src={AdNFT.attributes[1].value} width="100%"></img>
                                <p className="adDialogWindowContent">{AdNFT.attributes[2].value}</p>
                                <a href={AdNFT.attributes[3].value} target="_blank">
                                    <div className="adDialogWindowButton">
                                        Learn More
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="adDialogBackgroud"></div>
                    </div>

                    <ReactPlayer width="100%" height="100%" url={AdNFT.video} playing={videoPlaying} controls={true} onProgress={videoProgress.bind(this)} />
                </div>
            ) : (null)}
        </div>


    )

}
export default AdNFT;