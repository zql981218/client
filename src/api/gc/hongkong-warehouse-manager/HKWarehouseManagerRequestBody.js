import MaterialLotAction from "../../dto/mms/MaterialLotAction";

const actionType = {
    HKStockOut: "HKStockOut",
    ValidateHKMlot: "ValidateHKMlot",
    GetHKWarehouseMLot: "GetHKWarehouseMLot",
    HKByOrderStockOut: "HKByOrderStockOut"
}

export default class HKWarehouseManagerRequestBody {

    actionType;
    documentLines;
    materialLotActions;
    queryMaterialLot;
    stockTagNote;
    tableRrn;
    queryLotId;

    constructor(actionType, documentLines, materialLotActions, queryMaterialLot, stockTagNote){
        this.actionType = actionType;
        this.documentLines = documentLines;
        this.materialLotActions = materialLotActions;
        this.queryMaterialLot = queryMaterialLot;
        this.stockTagNote = stockTagNote;
    }

    setTableRrn(tableRrn){
        this.tableRrn = tableRrn;
    }

    setQueryLotId(queryLotId){
        this.queryLotId = queryLotId;
    }
    
    static buildHKWarehouseStockOut(documentLines, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });

        return new HKWarehouseManagerRequestBody(actionType.HKStockOut, documentLines, materialLotActions);
    }

    static buildHKByOrderStockOut(documentLines, materialLots) {
        let body = new HKWarehouseManagerRequestBody(actionType.HKByOrderStockOut);
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        body.documentLines = documentLines;
        body.materialLotActions = materialLotActions;
        return body;
    }

    static buildValidateMLot(queryMaterialLot, materialLots) {
        let materialLotActions = [];
        materialLots.forEach(materialLot => {
            let materialLotAction = new MaterialLotAction();
            materialLotAction.setMaterialLotId(materialLot.materialLotId);
            materialLotActions.push(materialLotAction)
        });
        return new HKWarehouseManagerRequestBody(actionType.ValidateHKMlot, undefined, materialLotActions, queryMaterialLot);
    }

    static buildGetMaterialLot(tableRrn, queryLotId) {
        let requestBody = new HKWarehouseManagerRequestBody(actionType.GetHKWarehouseMLot);
        requestBody.setTableRrn(tableRrn);
        requestBody.setQueryLotId(queryLotId);
        return requestBody;
    }

}


