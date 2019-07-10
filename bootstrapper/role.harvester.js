const { SPAWN_NAME } = require("const")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        // creep.say("Harvesting")  // Commented out because it was annoying to have almost every creep say "Harvesting"
        const spawn = Game.spawns[SPAWN_NAME]


        const chooseRandomSource = () => {
            const sources = creep.room.find(FIND_SOURCES)
            creep.memory.harvestSource = sources[Math.floor(Math.random() * sources.length)].id
        }

        if(creep.memory.harvestSource == null)
            chooseRandomSource()

        const targetSource = Game.getObjectById(creep.memory.harvestSource)
        if(targetSource == null)
            chooseRandomSource()

        if(targetSource.energy === 0)
            chooseRandomSource()

        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(targetSource) === ERR_NOT_IN_RANGE)
                if(creep.moveTo(targetSource) === ERR_NO_PATH)
                    chooseRandomSource()
        }
        else {
            var transferTargets = creep.room.find(FIND_STRUCTURES, {
                filter: struct =>
                    (struct.structureType == STRUCTURE_EXTENSION || struct.structureType == STRUCTURE_SPAWN) &&
                    struct.energy < struct.energyCapacity
            })
            if(transferTargets != null && transferTargets.length > 0) {
                const transferTarget = transferTargets[0]
                if(creep.transfer(transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(transferTarget)
                }
            }
        }
    }
}
