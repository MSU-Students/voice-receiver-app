class AreaProfileService {
    async addProfile(officeName, val) {
        let area = JSON.stringify(val);
        return await localStorage.setItem(officeName, area);
    }
    async getOfficeDetails() {
        const currentOffice = JSON.parse(localStorage.getItem('area'))
        return await currentOffice;
    }
}   
let areaProfileService = new AreaProfileService();

export default areaProfileService;