
const ActionType = {
    MergeDoc: "MergeDoc",
    HNWarehouseMergeDoc: "HNWarehouseMergeDoc",
    BSWMergeDoc: "BSWMergeDoc",
    UnMergeDoc: "UnMergeDoc",
}

export default class ErpDocLineMergeManagerRequestBody {
    
    actionType;
    documentLines;

    constructor(actionType, documentLines){
        this.actionType = actionType;
        this.documentLines = documentLines;
    }

    /**
     * ERP单据合并
     * @param documentLines 待合并的单据信息
     */
    static buildMergeDocLine(documentLines) {
        return new ErpDocLineMergeManagerRequestBody(ActionType.MergeDoc, documentLines);
    }

    static buildUnMergeDocLine(documentLines) {
        return new ErpDocLineMergeManagerRequestBody(ActionType.UnMergeDoc, documentLines);
    }

    static buildHNWarehouseMergeDocLine(documentLines) {
        return new ErpDocLineMergeManagerRequestBody(ActionType.HNWarehouseMergeDoc, documentLines);
    }

    static buildBSWMergeDocLine(documentLines) {
        return new ErpDocLineMergeManagerRequestBody(ActionType.BSWMergeDoc, documentLines);
    }

}

