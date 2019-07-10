const { SPAWN_NAME } = require("const")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        creep.say("Harvesting")
        const spawn = Game.spawns[SPAWN_NAME]
        
        if(creep.carry.energy < creep.carryCapacity) {
            const sources = creep.room.find(FIND_SOURCES)
            if(sources.length === 0) return
            const firstSource = sources[0]
            
            if(creep.harvest(firstSource) === ERR_NOT_IN_RANGE)
                creep.moveTo(firstSource)
        }
        else if(creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn)
        }
    }
}