const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', () => {
  let counter;

  beforeEach(async () => {
    const Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy('My Counter', 1);
  });

  it('sets the initial count', async () => {
    const count = await counter.count();
    expect(count).to.equal(1);
  });

  it('sets the initial name', async () => {
    const name = await counter.name();
    expect(name).to.equal('My Counter');
  });
});

describe('Counting', () => {
  let counter;

  beforeEach(async () => {
    const Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy('My Counter', 1);
  });

  it('reads the count from the "count" public variable', async() => {
    expect(await counter.count()).to.equal(1)
  })

  it('increments the count', async () => {
    let transaction = await counter.increment();
    await transaction.wait();

    expect(await counter.count()).to.equal(2);
  });
  it('decrements the count', async () => {
    let transaction = await counter.decrement();
    await transaction.wait();

    expect(await counter.count()).to.equal(0);

   // cannot decrement below 0
   await expect(counter.decrement()).to.be.reverted
  });

});
