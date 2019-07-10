const { SPAWN_NAME } = require("const")

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
            const spawn = Game.spawns[SPAWN_NAME]
            if(creep.withdraw(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn)
            }
        }
    }
}
