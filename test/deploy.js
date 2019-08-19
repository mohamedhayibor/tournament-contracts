const contracts = require('./helpers/contracts');
const constants = require('./helpers/constants');

const utils = require('ethers').utils;

describe('Setup Accounts And Deploy Contracts', async () => {
    it('should deploy mockNMR', async () => {
        const contract = await contracts.getMockNMR();
        const balance = await contract.balanceOf('0x0000000000000000000000000000000000000001');
        assert.strictEqual(balance.toString(), utils.parseEther("100").toString(), 'Initial balance is wrong');
    });

    it('should deploy Relay', async () => {
        const relay = await contracts.getRelay();
        const _owner = await relay.owner();
        assert.strictEqual(_owner, constants.tournamenContractAddress, 'Initial contract owner does not match');
    });

    it('should deploy TournamentV2', async () => {
        const contract = await contracts.getTournament();
        const _owner = await contract.owner();
        assert.strictEqual(_owner, constants.multiSigWallet, 'Initial contract owner does not match');
    });

    it('should deploy agreement', async () => {
        const contract = await contracts.deployAgreement(constants.multiSigWallet, constants.tournamenContractAddress);
        const isStaker = await contract.isStaker(constants.multiSigWallet);
        assert.strictEqual(isStaker, true, 'Agreement staker is wrong');
    });
});
