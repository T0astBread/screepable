const {
    SPAWN_NAME
} = require("const")
const roles = {
    harvester: require("role.harvester"),
    builder: require("role.builder"),
    upgrader: require("role.upgrader"),
    "self-repair": require("role.self-repair")
}
const decideRole = require("decide-role")
const restock = require("restock")


module.exports.loop = () => {
    const spawn = Game.spawns[SPAWN_NAME]
    
    restock()
    
    for(const creepName in Game.creeps) {
        const creep = Game.creeps[creepName]
        decideRole(creep)
    }
    
    for(const creepName in Game.creeps) {
        const creep = Game.creeps[creepName]
        executeCreepRole(creep)
    }
}


const executeCreepRole = creep => {
    if(creep.memory == null)
        return
        
    const role = creep.memory.role
    const roleModule = roles[role]
    if(roleModule != null) {
        roleModule.run(creep)
    }
}
