import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Selection, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Toolbar } from '@syncfusion/ej2-react-grids';

import { membersData, memberGrid } from '../data/dummy';
import { Header } from '../components';

const TeamMember = () => {

    const editing = { allowDeleting: true, allowEditing: true };
    const toolbarOptions = [`Edit`, `Delete`, `Cancel`, `Copy`, `PdfExport`,`ExcelExport`, `CsvExport`, 'Search'];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Team Members" />
      <GridComponent
        dataSource={membersData}
        width="auto"
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>    
          {memberGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />

      </GridComponent>
    </div>

    );
};

export default TeamMember