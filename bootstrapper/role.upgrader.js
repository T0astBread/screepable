const { SPAWN_NAME } = require("const")
const { getClosestEnergyDeposit } = require("utils")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        creep.say("Upgrading")
        
        if(creep.carry.energy > 0) {
            const controller = creep.room.controller
            if(creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller)
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
