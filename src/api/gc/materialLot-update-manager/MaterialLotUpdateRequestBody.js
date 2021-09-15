const ActionType = {
    UpdateTreasuryNote: "UpdateTreasuryNote",
    Query: "Query",
    UpdateLocation: "UpdateLocation",
    HoldMaterialLot: "HoldMLot",
    ReleaseMaterialLot: "ReleaseMLot",
    QueryReferenceList: "QueryReferenceList",
    UpdateLotInfo: "UpdateLotInfo"
}

export default class MaterialLotUpdateRequestBody {

    treasuryeNote;
    materialLotList;
    materialLotId
    location;
    reason;
    remarks;
    referenceName;
    materialLot;

    constructor(actionType, treasuryeNote, materialLotList, materialLotId, location, reason, remarks, referenceName){
        this.actionType = actionType;
        this.treasuryeNote = treasuryeNote;
        this.materialLotList = materialLotList;
        this.materialLotId = materialLotId;
        this.location = location;
        this.reason = reason;
        this.remarks = remarks;
        this.referenceName = referenceName;
    }

    static buildUpdateInfo(treasuryeNote, materialLotList) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateTreasuryNote, treasuryeNote, materialLotList);
    }

    static buildQuery(materialLotId) {
        return new MaterialLotUpdateRequestBody(ActionType.Query, undefined, undefined, materialLotId);
    }

    static buildUpdateLocationInfo(location, materialLotList, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.UpdateLocation, undefined, materialLotList, undefined, location, undefined, remarks);
    }

    static buildHoldInfo(materialLotList, reason, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.HoldMaterialLot, undefined, materialLotList, undefined, undefined, reason, remarks);
    }
    
    static buildReleaseInfo(materialLotList, reason, remarks) {
        return new MaterialLotUpdateRequestBody(ActionType.ReleaseMaterialLot, undefined, materialLotList, undefined, undefined, reason, remarks);
    }

    static buildGetReferenceList(referenceName) {
        return new MaterialLotUpdateRequestBody(ActionType.QueryReferenceList, undefined, undefined, undefined, undefined, undefined, undefined, referenceName);
    }

    static buildUpdateMLotInfo(materialLot) {
        let body = new MaterialLotUpdateRequestBody(ActionType.UpdateLotInfo);
        body.materialLot = materialLot;
        return body;
    }

    static buildImportSearch(tableRrn) {
        let body = new MaterialLotUpdateRequestBody(ActionType.UpdateLotInfo);
        body.tableRrn = tableRrn;
        return body;
    }

}