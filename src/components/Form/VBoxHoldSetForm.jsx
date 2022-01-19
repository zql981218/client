import EntityForm from './EntityForm';
import VboxHoldSetManagerRequest from '../../api/gc/vbox-hold-manager/VboxHoldSetManagerRequest';
import { Notification } from '../notice/Notice';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';

export default class VBoxHoldSetForm extends EntityForm {
    static displayName = 'VBoxHoldSetForm';

    handleSave = () => {
        var self = this;
        let workorderRelation = this.props.object;
        let workorderId = workorderRelation.workOrderId;
        let grade = workorderRelation.grade;
        let boxId = workorderRelation.boxId;
        if((workorderId == null || workorderId == "" || workorderId == undefined) && (grade == "" || grade == null || grade == undefined)
         && (boxId == "" || boxId == null || boxId == undefined)){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.WorkorderIdAndGradeCanEmpty));
            return;
        } else if (!(grade == "" || grade == null || grade == undefined) && (workorderId == null || workorderId == "" || workorderId == undefined)
         && (boxId == "" || boxId == null || boxId == undefined)){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.GradeMustMatchWorkedorderId));
            return;
        }
        let object = {
            workorderRelation: workorderRelation,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.workorderRelation);
                }
            }
        };
        VboxHoldSetManagerRequest.sendMergeRequest(object);
    }
}


