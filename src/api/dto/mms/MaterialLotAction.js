export default class MaterialLotAction {
    
    materialLotId;
    transQty;
    fromWarehouseRrn;
    fromWarehouseId;
    reserved4;

    fromStorageRrn;
    fromStorageId;

    targetWarehouseRrn;
    targetWarehouseId;

    targetStorageRrn;
    targetStorageId;
    
    actionCode;
    actionReason;
    actionComment;
   
    setMaterialLotId(materialLotId) {
        this.materialLotId = materialLotId;
    }

    setTransQty(transQty) {
        this.transQty = transQty;
    }
    
    setTargetStorageRrn(targetStorageRrn) {
        this.targetStorageRrn = targetStorageRrn;
    }

    setFromWarehouseRrn(fromWarehouseRrn) {
        this.fromWarehouseRrn = fromWarehouseRrn;
    }

    setFromStorageRrn(fromStorageRrn) {
        this.fromStorageRrn = fromStorageRrn;
    }

    setTargetWarehouseRrn(targetWarehouseRrn) {
        this.targetWarehouseRrn = targetWarehouseRrn;
    }
 
    setActionCode(actionCode) {
        this.actionCode = actionCode;
    }

    setActionReason(actionReason) {
        this.actionReason = actionReason;
    }

    setActionComment(actionComment) {
        this.actionComment = actionComment;
    }

    setReserved4(reserved4){
        this.reserved4 = reserved4;
    }
}