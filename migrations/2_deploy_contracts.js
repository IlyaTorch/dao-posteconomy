const ManagerDAOs = artifacts.require('ManagerDAOs');
const ManagerDefaultUsers = artifacts.require('ManagerDefaultUsers');


module.exports = async function (deployer) {
  await deployer.deploy(ManagerDAOs);
  await deployer.deploy(ManagerDefaultUsers);
}
