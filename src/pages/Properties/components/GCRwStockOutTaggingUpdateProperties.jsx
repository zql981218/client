import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCRwStockOutTaggingUpdateTable from "../../../components/Table/gc/GCRwStockOutTaggingUpdateTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GCRwStockOutTaggingUpdateProperties extends EntityScanProperties{

    static displayName = 'GCRwStockOutTaggingUpdateProperties';

    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
      this.form.resetFormFileds();
    }
    
    queryData = (whereClause) => {
      const self = this;
      let tableData = [];
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          tableData = responseBody.dataList;
          self.resetComBoxData(tableData);
          if(tableData && tableData.length > 0){
            self.getWareHouseId(tableData);
          }
          self.setState({
            tableData: tableData,
            loading: false,
            resetFlag: true,
            whereClause: whereClause
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    
    /**
     * 重新赋值下拉框
     */
     resetComBoxData = (data) =>{
       let queryFields = this.form.state.queryFields;
       if (queryFields && Array.isArray(queryFields)) {
        let gradeIndex = -1;
        let subCodeIndex = -1;
        queryFields.map((queryField, index) => {
            if (queryField.name == "grade") {
                gradeIndex = index;
            } else if(queryField.name == "reserved1"){
              subCodeIndex = index;
            }
        });

        let gradeField = this.form.state.queryFields[gradeIndex]
        let gradeNode = gradeField.node;
        
        let secondLevelField = this.form.state.queryFields[subCodeIndex];
        let secondLevelNode = secondLevelField.node;

        if(!data || data.length == 0){
            gradeNode.queryData();
            secondLevelNode.queryData();
            return;
        }

        let gradeList = [];
        let gradeRefData = [];

        let secondLevelList = [];
        let secondLevelRefData = [];

        // 获取相关字段的值
        data.forEach((d,index) => {
            if(gradeList.indexOf(d[gradeField.name]) == -1){
                gradeList.push(d[gradeField.name]);
            }

            if(secondLevelList.indexOf(d[secondLevelField.name]) == -1){
              secondLevelList.push(d[secondLevelField.name]);
            }
        });

        // 组装数据
        gradeList.forEach((d,index) => {
            let gradeObject = {};
            // whereClause 得到的值是 key,显示的值是 value
            gradeObject.key = d;
            gradeObject.value = d;
            gradeRefData.push(gradeObject);
        })

        secondLevelList.forEach(d => {
            let secondLevelObject = {};
            secondLevelObject.key = d;
            secondLevelObject.value = d;
            secondLevelRefData.push(secondLevelObject);
        })

        gradeNode.setState({data:gradeRefData});
        secondLevelNode.setState({data:secondLevelRefData});   
      } 
  }

    buildTable = () => {
        return <GCRwStockOutTaggingUpdateTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    resetFlag={this.state.resetFlag} 
                                    data={this.state.tableData} 
                                    whereClause={this.state.whereClause}
                                    loading={this.state.loading} 
                                    onSearch={this.queryData}
                                    resetData={this.resetData.bind(this)}/>
    }

}