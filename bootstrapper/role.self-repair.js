const { SPAWN_NAME } = require("const")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        creep.say("Self-repairing")
        const spawn = Game.spawns[SPAWN_NAME]
        
        const errCode = spawn.renewCreep(creep)
        if(errCode === ERR_NOT_IN_RANGE || (errCode == ERR_BUSY && creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)) {
            creep.moveTo(spawn)
        }
        else if(errCode !== OK) {
            console.log("Self-repair failed; Err code: " + errCode + "; Preparing for death")
            creep.transfer(spawn, RESOURCE_ENERGY)
            creep.say("Error; Preparing for death")
        }
    }
}
