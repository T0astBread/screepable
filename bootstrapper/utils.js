module.exports = {
    /**
     * @param {Creep} creep
     */
    getClosestEnergyDeposit: creep => {
        const deposits = creep.room.find(FIND_MY_STRUCTURES, {
            filter: struct =>
                (struct.structureType == STRUCTURE_EXTENSION || struct.structureType == STRUCTURE_SPAWN) &&
                struct.energy > creep.carryCapacity * .2
        })
        return deposits != null && deposits.length > 0 ? deposits[0] : null
    }
}
