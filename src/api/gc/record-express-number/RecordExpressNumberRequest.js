import RecordExpressNumberRequestHeader from './RecordExpressNumberRequestHeader';
import RecordExpressNumberRequestBody from './RecordExpressNumberRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import { object } from 'prop-types';

export default class RecordExpressNumberRequest {

    static sendOldRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildOldRecordExpress(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendAutoRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildAutoRecordExpress(object.datas, object.serviceMode, object.payMode, object.orderTime, object.customerType);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendManualRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildManualRecordExpress(object.expressNumber, object.datas, object.expressCompany);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendCancelRecordExpress = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildCancelRecordExpress(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
    
    static sendQueryPrintParameterRequest = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildPrintObliqueLabel(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendObliqueLabelPrintRequest = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildObliqueLabelPrint(object.datas);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendSamsungOuterBoxLabelPrintRequest = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildSamsungOuterBoxLabelPrint(object.documentLineList, object.printCount);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetWayBillNumberRequest = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildQueryWayBillNumber(object.wayBillNumber);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendBatchCancelExpressNumber = (object) => {
        let requestBody = RecordExpressNumberRequestBody.buildBatchCancelExpress(object.orderList);
        let requestHeader = new RecordExpressNumberRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCRecordExpressUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

}