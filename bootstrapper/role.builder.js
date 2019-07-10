const { SPAWN_NAME } = require("const")

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
            const spawn = Game.spawns[SPAWN_NAME]
            if(creep.withdraw(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn)
            }
        }
    }
}
