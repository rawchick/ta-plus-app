import iModel from "./iModel";

class mSearchScreen implements iModel {
    public ClassName = 'mSearchScreen'
    public loading = false
    public isRefreshing = false
    public listData = []
    public errorMessage = null
    public offset = 0
    public limit = 5
}

export default new mSearchScreen