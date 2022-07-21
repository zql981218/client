import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCPackageMLotShipHisTable from "../../../components/Table/gc/GCPackageMLotShipHisTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GCPackageMLotShipHisProperties extends EntityScanProperties {

    static displayName = 'GCPackageMLotShipHisProperties';
    
    constructor(props) {
      super(props);
      this.state = {...this.state};
    }

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
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
            queryDatas.forEach(data => {
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            });
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          } else {
            self.showDataNotFound();
          }
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GCPackageMLotShipHisTable pagination={false} 
                                          rowKey={this.state.rowKey} 
                                          table={this.state.table} 
                                          data={this.state.tableData} 
                                          loading={this.state.loading} 
                                          resetData={this.resetData.bind(this)}/>
    }

}