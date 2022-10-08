const eventsBody = [
    {
        "name": "",
        "anonymous": false,
        "inputs": null,
        "raw": {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x0000000000000000000000004d1892f15b03db24b55e73f9801826a56d6f0755",
                "0x000000000000000000000000eeb2f6f7a3953b8d9abb8755872f106cebadd620"
            ],
            "data": "0x000000000000000000000000000000000000000000000000000086c48b1f2e9e"
        }
    },
    {
        "name": "",
        "anonymous": false,
        "inputs": null,
        "raw": {
            "address": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
            "topics": [
                "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
                "0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45"
            ],
            "data": "0x00000000000000000000000000000000000000000000000000005af3107a4000"
        }
    },
    {
        "name": "",
        "anonymous": false,
        "inputs": null,
        "raw": {
            "address": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45",
                "0x0000000000000000000000004d1892f15b03db24b55e73f9801826a56d6f0755"
            ],
            "data": "0x00000000000000000000000000000000000000000000000000005af3107a4000"
        }
    },
    {
        "name": "",
        "anonymous": false,
        "inputs": null,
        "raw": {
            "address": "0x4d1892f15b03db24b55e73f9801826a56d6f0755",
            "topics": [
                "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
                "0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45",
                "0x000000000000000000000000eeb2f6f7a3953b8d9abb8755872f106cebadd620"
            ],
            "data": "0xffffffffffffffffffffffffffffffffffffffffffffffffffff793b74e0d16200000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000d1fcf4d32d895ea3028fbaef000000000000000000000000000000000000000000000017b1e742a6e4ffa4a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff085"
        }
    }
  ];
const main = ()=>{
    for (const events of eventsBody) {
        //const criticalEvents = ["Transfer", "Approval", "ApprovalForAll"];
        //w3.sha3(text='Transfer(address,address,uint256)').hex() == 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
        const transferEventsHash = ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"];

        if (transferEventsHash.includes(events["raw"]["topics"][0])) {
            console.log("Has transfer event!")
        }
    
    }
}
main()