import iModel from "./iModel";

class mHomeScreen implements iModel {
    public ClassName = 'mHomeScreen'
    public loading = false
    public isRefreshing = false
    public tabSelected = 1
    public tripData = []
    public offset = 0
    public limit = 5
}

export default new mHomeScreen