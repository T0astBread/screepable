const { SPAWN_NAME } = require("const")

module.exports = () => {
    const spawn = Game.spawns[SPAWN_NAME]
    
    const driveSingleTower = tower => {
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if(closestHostile) {
            tower.attack(closestHostile)
            return
        }
        
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        })
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure)
        }
    }
    
    
    const towers = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: struct => struct instanceof StructureTower
    })
    for(const tower of towers) {
        driveSingleTower(tower)
    }
}
