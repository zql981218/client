import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const ActionType = {
    GetMLot : "GetMLot",
    GetMLotAndUser : "GetMLotAndUser",
    Reserved : "Reserved",
    UnReserved: "UnReserved",
    GetPackedMLots: "GetPackedMLots"
}
export default class ReservedManagerRequestBody {

    actionType;
    docLineRrn;
    tableRrn;
    materialLotActions;
    stockNote;
    table;
    whereClause;

    constructor(actionType, docLineRrn, tableRrn, materialLotActions, stockNote,whereClause){
        this.actionType = actionType;
        this.docLineRrn = docLineRrn;
        this.tableRrn = tableRrn;
        this.materialLotActions = materialLotActions;
        this.stockNote = stockNote;
        this.whereClause = whereClause;
        this.table;
    }
    
    static buildGetMaterialLot(docLineRrn, tableRrn) {
        return new ReservedManagerRequestBody(ActionType.GetMLot, docLineRrn, tableRrn);
    }
    
    static buildGetMaterialLotAndUser(tableRrn,whereClause) {
        return new ReservedManagerRequestBody(ActionType.GetMLotAndUser, undefined, tableRrn, undefined, undefined, whereClause);
    }

    static buildReserved(docLineRrn, materialLots, stockNote) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new ReservedManagerRequestBody(ActionType.Reserved, docLineRrn, undefined, materialLotActions, stockNote);
    }

    static buildGetPackageDetails(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new ReservedManagerRequestBody(ActionType.GetPackedMLots, undefined, undefined, materialLotActions);
    }

    static buildUnReserved(materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new ReservedManagerRequestBody(ActionType.UnReserved, undefined, undefined, materialLotActions);
    }

}

export {ActionType};

