var config=[
  {
    AdNFTContract:"0x579b3b98e2Bb895d8338E1f3759095E0BAcCeED6",
    Network:{
        "chainId": "0x13881",
        "chainName": "Polygon-Mumbai",
        "rpcUrls": ["https://rpc-mumbai.matic.today"],
        "nativeCurrency": {
          "name": "MATIC",
          "symbol": "MATIC",
          "decimals": 18
        },
        "blockExplorerUrls": ["https://mumbai.polygonscan.com/"]
    }
},
  {
      AdNFTContract:"0x512E283b246bBA797b5f17D7DEf9E5eCF59e521D",
      Network:{
          "chainId": "0x539",
          "chainName": "Localhost",
          "rpcUrls": ["http://127.0.0.1:7545"],
          "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18
          },
          "blockExplorerUrls": [""]
      }
  },
  
]
export default config;