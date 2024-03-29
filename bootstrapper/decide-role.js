const {
    SPAWN_NAME,
    
    ROLE_HARVESTER,
    ROLE_BUILDER,
    ROLE_UPGRADER,
    ROLE_SELF_REPAIR,
    ROLE_REFUELER,
    ROLE_REPAIRER
} = require("const")

/**
 * @param {Creep} creep
 **/
module.exports = creep => {
    if(creep.spawning) return
    
    
    const SELF_RENEW_THRESHOLD = 300
    
    const spawn = Game.spawns[SPAWN_NAME]
    const allCreeps = spawn.room.find(FIND_MY_CREEPS)
    
    const findCreepsWithRole = role => spawn.room.find(FIND_MY_CREEPS, {
        filter: c => c.memory.role === role && c.id !== creep.id && !c.spawning
    })
    
    const assignRole = (role, reason, silent = false) => {
        creep.memory.role = role
        if(!silent)
            console.log("Assigned role " + role + " to " + creep.name + "; Reason: " + reason)
    }
    
    
    if(creep.ticksToLive < SELF_RENEW_THRESHOLD) {
        assignRole(ROLE_SELF_REPAIR, "Creep TTL < " + SELF_RENEW_THRESHOLD)
        return
    }
    
    
    if(spawn.energy === 0) {
        const harvesterCount = findCreepsWithRole(ROLE_HARVESTER).length
        
        if(harvesterCount === 0) {
            assignRole(ROLE_HARVESTER, "No energy and no other harvesters")
            return
        }
    }
    
    
    const towersWithLowEnergy = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: struct => struct instanceof StructureTower && struct.energy < struct.energyCapacity / 2
    })
    if(towersWithLowEnergy.length > 0) {
        const refuelerCount = findCreepsWithRole(ROLE_REFUELER)
        if(refuelerCount < towersWithLowEnergy.length) {
            assignRole(ROLE_REFUELER, "There are towers with low energy")
            return
        }
    }
    
    
    const structsWithLowHits = spawn.room.find(FIND_STRUCTURES, {
        filter: struct => struct.hits < Math.min(struct.hitsMax / 2, 1000)
    })
    if(structsWithLowHits.length > 0) {
        const repairerCount = findCreepsWithRole(ROLE_REPAIRER)
        if(repairerCount < structsWithLowHits.length) {
            assignRole(ROLE_REPAIRER, "There are structures with low hit points")
            return
        }
    }
    
    
    const shouldUpgrade = Memory.roleBalancing.controllerUpgradeIsWanted || spawn.room.controller.ticksToDowngrade < 200
    const upgraderCount = findCreepsWithRole(ROLE_UPGRADER).length
    if(shouldUpgrade) {
        if(upgraderCount === 0) {
            assignRole(ROLE_UPGRADER, "Controller downgrade eminent or upgrade wanted")
            return
        }
    }
    
    
    const constructionSiteCount = Object.keys(Game.constructionSites).length
    if(constructionSiteCount > 0) {
        const builderCount = findCreepsWithRole(ROLE_BUILDER).length
        if(builderCount < constructionSiteCount * 2 && builderCount < allCreeps.length / 2) {
            assignRole(ROLE_BUILDER, "Construction sites but not enough builders")
            return
        }
    }
    
    
    if(shouldUpgrade && upgraderCount < findCreepsWithRole(ROLE_HARVESTER).length - 1) {
        assignRole(ROLE_UPGRADER, "No other role assigned and could use more upgraders")
        return
    }
    
    assignRole(ROLE_HARVESTER, "No other role assigned", true)
}


const initMemory = () => {
    if(Memory.roleBalancing != null && Memory.roleBalancing.reInitDB === false) return
    
    Memory.roleBalancing = {
        reInitDB: false,
        controllerUpgradeIsWanted: false
    }
}

initMemory()
