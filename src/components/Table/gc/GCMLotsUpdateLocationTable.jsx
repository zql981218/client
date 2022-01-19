import { Button, Select, Input, Tag, Upload } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';
import IconUtils from '../../../api/utils/IconUtils';

const { Option} = Select;

export default class GCMLotsUpdateLocationTable extends EntityScanViewTable {

    static displayName = 'GCMLotsUpdateLocationTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportSearchButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createUpdateButton());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createLocationSelecct());
        tagList.push(this.createTotalQty());
        return tagList;
    }

    componentWillMount = () => {
        let self = this;
        let requestLocationListObject = {
            referenceName: "GCBondedPropertyList",
            success: function(responseBody) {
              self.setState({
                  locationList: responseBody.referenceList
              });
            }
          }
        MaterialLotUpdateRequest.sendGetReferenceListRequest(requestLocationListObject);
    }

    createLocationSelecct = () => {
        const {locationList} = this.state;
        if(locationList || locationList != undefined){
            const options = locationList.map(d => <Option key={d.key}>{d.value}</Option>);
            return <span style={{display: 'flex'}}>
                <span style={{marginLeft:"10px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.Location)}:</span>
                <span style={{marginLeft:"10px"}}>
                    <Select
                    showSearch
                    allowClear
                    value={this.state.value}
                    style={{ width: 200}}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    onBlur={this.props.onBlur}
                    placeholder="保税属性">
                    {options} 
                    </Select>
                </span>

                <span style={{marginLeft:"30px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.remarks)}:</span>
                <span style = {{marginLeft:"10px"}}>
                <Input ref={(input) => { this.input = input }} style={{ width: 300}} key="remarks" placeholder="备注" />
                </span>
            </span>
        }
    }

    handleChange = (currentValue) => {
        if (this.state.value === currentValue) {
            return;
        }
        this.setState({ 
            value: currentValue
        });
    }

    UpdateLocation =() => {
        const {data,table} = this.state;
        let self = this;
        let location = this.state.value;
        let remarks = this.input.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(remarks == "" || remarks == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.RemarksCannotEmpty));
            return;
        }
        if(location == "" || location == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseLocation));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            location: location,
            remarks: remarks,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendUpdateLocationRequest(requestObject);
    }
    
    importSearch = (option) => {
        const self = this;
        const {table} = this.state;
        let tableData = this.state.data;
        if(tableData.length > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.TableDataMustBeEmpty));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let object = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        MaterialLotUpdateRequest.sendImportSearchRequest(object, option.file);
    }

    createImportSearchButton = () => {
        return (<Upload key="importSearch" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.importSearch(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnImportSearch)}</Button>
                </Upload>);
    }

    createUpdateButton = () => {
        return <Button key="update" type="primary" style={styles.tableButton} loading={this.state.loading} onClick={this.UpdateLocation}>
                        {IconUtils.buildIcon("edit")}{I18NUtils.getClientMessage(i18NCode.BtnUpdate)}
                    </Button>
    }

    createTotalQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};