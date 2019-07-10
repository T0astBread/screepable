const {
    SPAWN_NAME,
    
    ROLE_HARVESTER,
    ROLE_BUILDER,
    ROLE_UPGRADER
} = require("const")

/**
 * @param {Creep} creep
 **/
module.exports = creep => {
    if(creep.spawning) return
    
    
    const spawn = Game.spawns[SPAWN_NAME]
    
    const findCreepsWithRole = role => spawn.room.find(FIND_MY_CREEPS, {
        filter: c => c.memory.role === role && c.id !== creep.id && !c.spawning
    })
    
    const assignRole = (role, reason) => {
        creep.memory.role = role
        console.log("Assigned role " + role + " to " + creep.name + "; Reason: " + reason)
    }
    
    
    if(spawn.energy === 0) {
        const harvesterCount = findCreepsWithRole(ROLE_HARVESTER).length
        
        if(harvesterCount === 0) {
            assignRole(ROLE_HARVESTER, "No energy and no other harvesters")
            return
        }
    }
    
    
    if(Memory.roleBalancing.controllerUpgradeIsWanted || spawn.room.controller.ticksToDowngrade < 200) {
        const upgraderCount = findCreepsWithRole(ROLE_UPGRADER).length
        if(upgraderCount === 0) {
            assignRole(ROLE_UPGRADER, "Controller downgrade eminent or upgrade wanted")
            return
        }
    }
    
    
    const constructionSiteCount = Object.keys(Game.constructionSites).length
    if(constructionSiteCount > 0) {
        const builderCount = findCreepsWithRole(ROLE_BUILDER).length
        if(builderCount < constructionSiteCount * 2) {
            assignRole(ROLE_BUILDER, "Construction sites but not enough builders")
            return
        }
    }
    
    
    assignRole(ROLE_HARVESTER, "No other role assigned")
}


const initMemory = () => {
    if(Memory.roleBalancing != null && Memory.roleBalancing.reInitDB === false) return
    
    Memory.roleBalancing = {
        reInitDB: false,
        controllerUpgradeIsWanted: false
    }
}

initMemory()
