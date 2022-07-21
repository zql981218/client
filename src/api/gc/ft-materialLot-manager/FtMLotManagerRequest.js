import FtMLotManagerRequestHeader from './FtMLotManagerRequestHeader';
import FtMLotManagerRequestBody from './FtMLotManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';

export default class FtMLotManagerRequest {

    static sendReceiveUnitRequest = (object) => {
        let {materialLotUnitList} = object;
        let requestBody = FtMLotManagerRequestBody.buildReceive(materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendQueryRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildQueryStockInMLot(object.unitId, object.tableRrn);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendFTStockInRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildStockInFTMLot(object.materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetIssueUnitByTableRrnRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildQueryWaitIssueUnit(object.tableRrn);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUnitIssueRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildUnitIssue(object.documentLines, object.materialLotUnitList, object.issueWithDoc);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendOutOrderUnitIssueRequest = (object) => {
        let requestBody = FtMLotManagerRequestBody.buildUnitOutOrderIssue(object.materialLotUnitList);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendFTStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = FtMLotManagerRequestBody.buildFTStockOut(documentLines, materialLots);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendFTSaleStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = FtMLotManagerRequestBody.buildFTSaleShip(documentLines, materialLots);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendBSWFTStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = FtMLotManagerRequestBody.buildBSWFTStockOut(documentLines, materialLots);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendBSWFTSaleStockOutRequest = (object) => {
        let {documentLines, materialLots} = object;
        let requestBody = FtMLotManagerRequestBody.buildBSWFTSaleShip(documentLines, materialLots);
        let requestHeader = new FtMLotManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCftMaterialLotManagerUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

