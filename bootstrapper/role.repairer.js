const { SPAWN_NAME } = require("const")
const { getClosestEnergyDeposit } = require("utils")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        creep.say("Repairing")
        const spawn = Game.spawns[SPAWN_NAME]
        
        if(creep.carry.energy > 0) {
            const structs = spawn.room.find(FIND_STRUCTURES, {
                filter: struct => struct.hits < struct.hitsMax
            })
            const minHits = _.min(_.map(structs, struct => struct.hits))
            const targetStruct = _.find(structs, struct => struct.hits === minHits)
            //const targetStruct = structs[0]
            if(creep.repair(targetStruct) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStruct)
            }
        }
        else {
            const targetDeposit = getClosestEnergyDeposit(creep)
            if(targetDeposit != null && creep.withdraw(targetDeposit, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetDeposit)
            }
        }
    }
}