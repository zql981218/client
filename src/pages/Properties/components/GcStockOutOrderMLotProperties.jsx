import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcStockOutMLotTable from "../../../components/Table/gc/GcStockOutMLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import StockOutManagerRequest from "../../../api/gc/stock-out/StockOutManagerRequest";
import MaterialLot from "../../../api/dto/mms/MaterialLot";

export default class GcStockOutOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcStockOutOrderMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    /**
     * 20190921 gc要求重置的时候，2个表格数据都要清空
     */
    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
          this.form.handleReset();
      }
    }

    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              let materialLot = queryDatas[0];
              let errorData = [];
              let trueData = [];
              tableData.forEach(data => {
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
              });
              if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                trueData.unshift(materialLot);
              }
              tableData = [];
              errorData.forEach(data => {
                tableData.push(data);
              });
              trueData.forEach(data => {
                tableData.push(data);
              });

              self.setState({ 
                tableData: tableData,
                loading: false
              });
              self.form.resetFormFileds();
            } else {
              let data = new MaterialLot();
              let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = materialLotId;
              data.setMaterialLotId(materialLotId);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            }
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();  
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    validationMaterialLot = (materialLot, materialLots) => {
      let self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        queryMaterialLot : materialLot,
        materialLots: materialLots,
        success: function(responseBody) {
            if(responseBody.falg){
              let errorData = [];
              let trueData = [];
              tableData.forEach(data => {
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
            });
            if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
              trueData.unshift(materialLot);
            }
            tableData = [];
            errorData.forEach(data => {
              tableData.push(data);
            });
            trueData.forEach(data => {
              tableData.push(data);
            });
          } else {
            if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
              materialLot.errorFlag = true;
              tableData.unshift(materialLot);
            }
          }
          
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          self.form.resetFormFileds();
        }
      }
      StockOutManagerRequest.sendValidationRequest(requestObject);
    }

    buildTable = () => {
        return <GcStockOutMLotTable 
                            orderTable={this.props.orderTable} 
                            pagination={false} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            onSearch={this.props.onSearch}
                            />
    }

}