const { SPAWN_NAME } = require("const")
const { getClosestEnergyDeposit } = require("utils")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        creep.say("Building")
        
        if(creep.carry.energy > 0) {
            const targetSite = creep.room.find(FIND_MY_CONSTRUCTION_SITES)[0]
            if(creep.build(targetSite) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSite)
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
