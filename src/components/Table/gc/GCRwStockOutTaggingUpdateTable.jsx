import { Button, Col, Input, Row, Tag , Upload} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RwMLotManagerRequest from "../../../api/gc/rw-manager/RwMLotManagerRequest";
import EntityListCheckTable from '../EntityListCheckTable';
import FormItem from 'antd/lib/form/FormItem';
import EventUtils from '../../../api/utils/EventUtils';
import { Notification } from '../../notice/Notice';
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';
import RWStockOutTagUpdateMLotForm from './RWStockOutTagUpdateMLotForm';

export default class GCRwStockOutTaggingUpdateTable extends EntityListCheckTable {

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createImportSearchButton());
        buttons.push(this.createCancelShipOrderButton());
        buttons.push(this.createPreviewButton());
        buttons.push(this.createCancelStockOutButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createAddShipOrderInput());
        tags.push(this.createStatistic());
        tags.push(this.createWaferNumber());
        tags.push(this.createTotalNumber());
        return tags;
    }
    
    createAddShipOrderInput = () => {
        return  <FormItem>
                    <Row gutter={20}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.ShipOrderId)}:</span>
                        </Col>
                        <Col span={4}>
                            <Input ref={(shipOrderId) => { this.shipOrderId = shipOrderId }} key="shipOrderId" placeholder="发货单号" />
                        </Col>
                        <Col span={1}>
                            <Button key="addShipOrder" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.AddShipOrder}>
                                {I18NUtils.getClientMessage(i18NCode.BtnAddShipOrder)}
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.CustomerIdentificaion)}:</span>
                        </Col>
                        <Col span={4}>
                            <Input ref={(customerName) => { this.customerName = customerName }} key="customerName" placeholder="客户名称"/>
                        </Col>
                        <Col span={2} >
                            <span>ODM:</span>
                        </Col>
                        <Col span={4}>
                            <Input ref={(abbreviation) => { this.abbreviation = abbreviation }} key="abbreviation" placeholder="ODM"/>
                        </Col>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.remarks)}:</span>
                        </Col>
                        <Col span={4}>
                            <Input ref={(remarks) => { this.remarks = remarks }} key="remarks" placeholder="备注"/>
                        </Col>
                        <Col span={1}>
                            <Button key="updateTagInfo" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.TagUpdate}>
                                {I18NUtils.getClientMessage(i18NCode.BtnTagUpdate)}
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
    }

    TagUpdate = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }

        let customerName = this.customerName.state.value;
        let abbreviation = this.abbreviation.state.value;
        let remarks = this.remarks.state.value;

        if(customerName == "" || customerName == null ||  customerName == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.CustomerIdentificaionCannotEmpty));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            customerName: customerName,
            abbreviation: abbreviation,
            remarks: remarks,
            success: function(responseBody) {
                self.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
                self.customerName.setState({
                    value: "",
                });
                self.abbreviation.setState({
                    value: "",
                });
                self.remarks.setState({
                    value: "",
                });
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
            }
        }
        RwMLotManagerRequest.sendStockOutTagUpdateRequest(requestObject);
    }

    UnstockOutTag = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            success: function(responseBody) {
                self.refreshDelete(materialLotList);
            }
        }
        RwMLotManagerRequest.sendUnStockOutTagRequest(requestObject);
    }

    AddShipOrder = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }
        
        let shipOrderId = this.shipOrderId.state.value;
        if(shipOrderId == "" || shipOrderId == null || shipOrderId == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.EnterTheShipOrdderIdPlease));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            shipOrderId: shipOrderId,
            success: function(responseBody) {
                self.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
                self.shipOrderId.setState({
                    value: "",
                });
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
            }
        }
        RwMLotManagerRequest.sendAddShipOrderIdRequest(requestObject);
    }

    Preview = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }
        let requestObject = {
            materialLotList : materialLots,
            success: function(responseBody) {
                let materialLotInfo = responseBody.materialLotList;
                self.setState({
                    formVisible : true,
                    materialLotInfo: materialLotInfo,
                }); 
            }
        }
        RwMLotManagerRequest.sendPreViewMLotRequest(requestObject);
    }

    createForm = () => {
        return  <RWStockOutTagUpdateMLotForm visible={this.state.formVisible} 
                                     materialLotInfo={this.state.materialLotInfo}
                                     width={1440}
                                     onOk={this.handleCancel} 
                                     onCancel={this.handleCancel}/>
    }

    handleCancel = (e) => {
        this.setState({
            formVisible: false,
        })
    }

    CancelShipOrder = () => {
        let self = this;
        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            materialLotList : materialLotList,
            success: function(responseBody) {
                self.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
            }
        }
        RwMLotManagerRequest.sendCancelShipOrderIdRequest(requestObject);
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

    exportData = () => {
        const {table} = this.state;
        let tableData = this.state.data;
        if(tableData.length == 0){
            return;
        }
        let object = {
            tableName: "GCCobStockOutTagUpdateUnitExport",
            fileName: table.labelZh + ".xls",
            materialLotList: tableData
        }
        MaterialLotUpdateRequest.sendExportRequest(object);
    }

    createStatistic = () => {
        return <Button type="primary" style={styles.tableButton}>{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Button>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Button type="primary" style={styles.tableButton}>{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Button>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Button type="primary" style={styles.tableButton}>{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Button>
    }

    buildOperationColumn = () => {

    }

    createAddShipOrderButton = () => {
        return <Button key="addShipOrder" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.AddShipOrder}>
                        {I18NUtils.getClientMessage(i18NCode.BtnAddShipOrder)}
                    </Button>
    }

    createImportSearchButton = () => {
        return (<Upload key="importSearch" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.importSearch(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnImportSearch)}</Button>
                </Upload>);
    }

    createCancelShipOrderButton = () => {
        return <Button key="cancelShipOrder" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.CancelShipOrder}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCancelShipOrder)}
                    </Button>
    }

    createPreviewButton = () => {
        return <Button key="preview" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.Preview}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPreview)}
                    </Button>
    }

    createCancelStockOutButton = () => {
        return <Button key="unStockOutTag" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.UnstockOutTag}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnTagging)}
                    </Button>
    }

}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
