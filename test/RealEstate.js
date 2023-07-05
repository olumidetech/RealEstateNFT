const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('RealEstate', () => {
    let realEstate, escrow
    let deployer, seller
    let nftID = 1

   
    beforeEach(async () => {
     // Setup Accounts
     accounts = await ethers.getSigners()
     deployer = accounts[0]
     seller = deployer
     buyer = accounts[1]
     inpector = accounts[2]
     lender = accounts[3]

          // load contract
        const RealEstate = await ethers.getContractFactory('RealEstate')
        const Escrow = await ethers.getContractFactory('Escrow')

        // Deploy contracts
        realEstate = await RealEstate.deploy()
        escrow = await Escrow.deploy( realEstate.address, 
            nftID,
            seller.address,
            buyer.address,
            inspector.address,
            lender.address
            )

            // seller Approve NFT
            transaction = await realEstate.connect(seller).approve(escrow.address, nftID)
            await transaction.wait()
    })

    describe('Deployment', async() => {
        it('sends an NFT to the seller/deployer', async() => {

          expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
          
        })
    })

        describe('Selling real estate', async() => {
            it('execute a successful transaction', async() => {
               // Expects seller to be NFT owner before the sale
              expect(await realEstate.ownerOf(nftID)).to.equal(seller.address) 
              
              transaction = await escrow.connect(buyer).finalizeSale()
              await transaction.wait()
              console.log("buyer finalize sales")

                        // Expects buyer  to be NFT owner after the sale
                        expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address) 


           
    })
})
})