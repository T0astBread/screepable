const { SPAWN_NAME } = require("const")
const { getClosestEnergyDeposit } = require("utils")

module.exports = {
    /**
     * @param {Creep} creep
     **/
    run: creep => {
        creep.say("Refueling")
        const spawn = Game.spawns[SPAWN_NAME]
        
        if(creep.carry.energy > 0) {
            const towers = spawn.room.find(FIND_MY_STRUCTURES, {
                filter: struct => struct instanceof StructureTower
            })
            const minEnergy = _.min(_.map(towers, tower => tower.energy))
            const targetTower = _.find(towers, tower => tower.energy === minEnergy)
            if(creep.transfer(targetTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetTower)
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
