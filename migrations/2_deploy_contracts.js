const ManagerDAOs = artifacts.require('ManagerDAOs');


module.exports = async function (deployer) {
  await deployer.deploy(ManagerDAOs);
}
