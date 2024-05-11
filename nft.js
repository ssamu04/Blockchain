let NFTs = [];

function mintNFT(name, description, artist) {
    const NFT = {
        name: name,
        description: description,
        artist: artist
    };
    NFTs.push(NFT);
    return NFT;
}

function listNFTs() {
    for(let i=0; i<NFTs.length; i++){
        console.log("Name:", NFTs[i].name);
        console.log("Description:", NFTs[i].description);
        console.log("Artist:", NFTs[i].artist, "\n");
    }
}

function getTotalSupply() {
    return NFTs.length;
}

mintNFT("Don Quixote", "Art", "Picasso");
mintNFT("Starry Night", "Art", "van Gogh");
mintNFT("Bacchus", "Art", "Michelangelo");
mintNFT("Sunrise", "Art", "Monet");

listNFTs();
console.log("Total number of NFTs:", getTotalSupply());
