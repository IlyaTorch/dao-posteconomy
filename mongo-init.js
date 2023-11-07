const rootUser = 'mongo'
if (!rootUser) throw 'Empty root user'

const rootPassword = 'mongo'
if (!rootPassword) throw 'Empty root password'

db = db.getSiblingDB('admin')
db.auth(rootUser, rootPassword)
console.log('Init: authenticated as root')

const dbUser = 'dominion'
if (!dbUser) throw 'Empty database user'

const dbPassword = 'dominion'
if (!dbPassword) throw 'Empty database password'

const dbName = 'dominion'
if (!dbName) throw 'Empty database name'

db = db.getSiblingDB(dbName)
db.createUser({
    user: dbUser,
    pwd: dbPassword,
    roles: [
         {role: "readWrite", db: dbName}
    ]
})
console.log(`App database & user successfully created: ${dbName}:${dbUser}`)
