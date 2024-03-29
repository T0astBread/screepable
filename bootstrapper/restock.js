const {
    SPAWN_NAME,
    
    MAX_CREEP_COUNT,
    ENERGY_RESERVE,
    CREEP_COST,
    GENERAL_PURPOSE_CREEP_CAPABILITIES
} = require("const")

/**
 * @param {Creep} creep
 **/
module.exports = () => {
    const spawn = Game.spawns[SPAWN_NAME]
    const creepCount = Object.keys(Game.creeps).length
    if(creepCount < MAX_CREEP_COUNT && spawn.energy >= ENERGY_RESERVE + CREEP_COST) {
        const creepName = "GP_" + creepCount
        const errCode = spawn.spawnCreep(GENERAL_PURPOSE_CREEP_CAPABILITIES, creepName)
        if(errCode !== ERR_NOT_ENOUGH_ENERGY)
            console.log("Spawned new general purpose creep " + creepName)
        else if(errCode !== OK)
            console.log("Unexpected error spawning general purpose creep: " + errCode)
    }
}
