import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import FtRetestOrderTable from "../../../components/Table/gc/FtRetestOrderTable";
import GcFtReTestMLotProperties from "./GcFtReTestMLotProperties";

export default class GcFtReTestOrderProperties extends EntityProperties{

    static displayName = 'GcFtReTestOrderProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    getTableData = () => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
              tableData: responseBody.dataList,
              table: responseBody.table,
              loading: false
            }); 
            self.form.handleSearch();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <FtRetestOrderTable scrollY={200} 
                                  ref={(orderTable) => { this.orderTable = orderTable }} 
                                  pagination={false} 
                                  asyncType={ActionType.AsyncWaferIssueOrder} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcFtReTestMLotProperties 
                    orderTable={this.orderTable} 
                    tableRrn={this.state.parameters.parameter1}
                    waitRetestTableRrn={this.state.parameters.parameter2}
                    resetFlag={this.state.resetFlag} 
                    onSearch={this.getTableData.bind(this)}/>
    }
    
}