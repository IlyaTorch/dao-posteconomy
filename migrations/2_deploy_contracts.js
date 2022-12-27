const PosteconomyDAO = artifacts.require('PosteconomyDAO')

module.exports = async function (deployer) {
  await deployer.deploy(PosteconomyDAO)
}
