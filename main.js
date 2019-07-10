const {
    SPAWN_NAME,
    MAX_CREEP_COUNT,
    GENERAL_PURPOSE_CREEP_CAPABILITIES
} = require("const")
const roles = {
    harvester: require("role.harvester"),
    builder: require("role.builder"),
    upgrader: require("role.upgrader"),
}
const decideRole = require("decide-role")


module.exports.loop = () => {
    const spawn = Game.spawns[SPAWN_NAME]
    
    const creepCount = Object.keys(Game.creeps).length
    if(creepCount < MAX_CREEP_COUNT) {
        if(spawn.spawnCreep(GENERAL_PURPOSE_CREEP_CAPABILITIES, "GP_" + creepCount) !== ERR_NOT_ENOUGH_ENERGY)
            console.log("Spawning new general purpose creep")
    }
    
    for(const creepName in Game.creeps) {
        const creep = Game.creeps[creepName]
        decideRole(creep)
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
