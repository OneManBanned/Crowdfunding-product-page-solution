const campaign = {
    donations: 89914,
    backerPackages: { 25: 101, 75: 64, 200: 0 },
    backers: 5007,
    goal: 100000,
    progressPercentage() { return this.donations / this.goal * 100 },
    addDonation(amount) { this.donations += amount },
    addBacker() { this.backers += 1 },
    packageClaimed(claimed) { this.backerPackages[claimed] -= 1 },
}

export default campaign