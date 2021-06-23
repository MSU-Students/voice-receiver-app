class AreaProfileService {
    async isItemExist(itemName) {
        if (localStorage.getItem(itemName) !== null) {
            console.log(`area exists`);
        } else {
            console.log(`area not found`);
            let area = JSON.stringify("");
            this.addProfile("area", area);
        }
    }
    async addProfile(officeName, val) {
        let area = JSON.stringify(val);
        return await localStorage.setItem(officeName, area);
    }
    async getOfficeDetails() {
        let currentOffice = JSON.parse(localStorage.getItem('area'));
        return await currentOffice;
    }
}   
let areaProfileService = new AreaProfileService();

export default areaProfileService;